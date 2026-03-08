import { NextRequest, NextResponse } from "next/server";
import { createWalletClient, createPublicClient, http, parseAbi } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";

// ── ABI (minimal — only what we need) ─────────────────────────────────────────
const REWARDS_ABI = parseAbi([
  "function recordContribution(address agent, uint8 ctype) external",
  "function recordContributions(address[] agents, uint8[] ctypes) external",
  "function registerAgent(address agent) external",
  "function registeredAgents(address) external view returns (bool)",
  "function agentStats(address) external view returns (uint256 totalEarned, uint256 contributions, uint256 todayEarned, uint256 todayRemaining)",
]);

const TOKEN_ABI = parseAbi([
  "function balanceOf(address) external view returns (uint256)",
  "function totalSupply() external view returns (uint256)",
]);

// ── Contribution type enum (must match contract) ───────────────────────────────
const CONTRIB_TYPES = {
  ARTIFACT_POST: 0,
  VERIFICATION: 1,
  COLLABORATION: 2,
  TRAINING_WIN: 3,
  KNOWLEDGE_SUBMIT: 4,
} as const;

type ContribTypeName = keyof typeof CONTRIB_TYPES;

// ── Clients ───────────────────────────────────────────────────────────────────
function getClients() {
  const pk = process.env.RELAYER_PRIVATE_KEY;
  const rpc = process.env.SEPOLIA_RPC_URL;
  const rewardsAddr = process.env.REWARDS_CONTRACT_ADDRESS as `0x${string}`;

  if (!pk || !rpc || !rewardsAddr) {
    throw new Error("Missing env: RELAYER_PRIVATE_KEY, SEPOLIA_RPC_URL, or REWARDS_CONTRACT_ADDRESS");
  }

  const account = privateKeyToAccount(pk as `0x${string}`);
  const transport = http(rpc);

  const wallet = createWalletClient({ account, chain: sepolia, transport });
  const public_ = createPublicClient({ chain: sepolia, transport });

  return { wallet, public: public_, account, rewardsAddr };
}

// ── POST /api/rewards ──────────────────────────────────────────────────────────
// Body: { agent: "0x...", type: "ARTIFACT_POST" }
//    or { agents: ["0x...", ...], types: ["ARTIFACT_POST", ...] }
// Auth: Bearer token in Authorization header (REWARDS_API_SECRET env var)
export async function POST(req: NextRequest) {
  // Auth check
  const secret = process.env.REWARDS_API_SECRET;
  if (secret) {
    const auth = req.headers.get("authorization");
    if (!auth || auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  try {
    const { wallet, public: publicClient, rewardsAddr } = getClients();

    // Batch mode
    if (body.agents && body.types) {
      const agents: `0x${string}`[] = body.agents;
      const ctypes: number[] = body.types.map((t: ContribTypeName) => {
        const v = CONTRIB_TYPES[t];
        if (v === undefined) throw new Error(`Unknown type: ${t}`);
        return v;
      });

      const hash = await wallet.writeContract({
        address: rewardsAddr,
        abi: REWARDS_ABI,
        functionName: "recordContributions",
        args: [agents, ctypes],
      });

      const receipt = await publicClient.waitForTransactionReceipt({ hash });
      return NextResponse.json({
        success: true,
        txHash: hash,
        blockNumber: receipt.blockNumber.toString(),
        mode: "batch",
        count: agents.length,
      });
    }

    // Single mode
    const agent = body.agent as `0x${string}`;
    const typeName = body.type as ContribTypeName;

    if (!agent || !typeName) {
      return NextResponse.json({ error: "Missing agent or type" }, { status: 400 });
    }

    const ctype = CONTRIB_TYPES[typeName];
    if (ctype === undefined) {
      return NextResponse.json(
        { error: `Unknown type: ${typeName}. Valid: ${Object.keys(CONTRIB_TYPES).join(", ")}` },
        { status: 400 }
      );
    }

    // Auto-register if needed
    const isRegistered = await publicClient.readContract({
      address: rewardsAddr,
      abi: REWARDS_ABI,
      functionName: "registeredAgents",
      args: [agent],
    });

    if (!isRegistered) {
      const regHash = await wallet.writeContract({
        address: rewardsAddr,
        abi: REWARDS_ABI,
        functionName: "registerAgent",
        args: [agent],
      });
      await publicClient.waitForTransactionReceipt({ hash: regHash });
    }

    // Record contribution
    const hash = await wallet.writeContract({
      address: rewardsAddr,
      abi: REWARDS_ABI,
      functionName: "recordContribution",
      args: [agent, ctype],
    });

    const receipt = await publicClient.waitForTransactionReceipt({ hash });

    return NextResponse.json({
      success: true,
      txHash: hash,
      blockNumber: receipt.blockNumber.toString(),
      agent,
      type: typeName,
      autoRegistered: !isRegistered,
    });
  } catch (err: any) {
    console.error("[rewards API]", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// ── GET /api/rewards?agent=0x... ──────────────────────────────────────────────
export async function GET(req: NextRequest) {
  const agent = req.nextUrl.searchParams.get("agent") as `0x${string}` | null;
  if (!agent) {
    return NextResponse.json({ error: "Missing ?agent= param" }, { status: 400 });
  }

  try {
    const { public: publicClient, rewardsAddr } = getClients();
    const tokenAddr = process.env.ART_TOKEN_ADDRESS as `0x${string}`;

    const [stats, balance] = await Promise.all([
      publicClient.readContract({
        address: rewardsAddr,
        abi: REWARDS_ABI,
        functionName: "agentStats",
        args: [agent],
      }),
      tokenAddr
        ? publicClient.readContract({
            address: tokenAddr,
            abi: TOKEN_ABI,
            functionName: "balanceOf",
            args: [agent],
          })
        : Promise.resolve(0n),
    ]);

    const [totalEarned, contributions, todayEarned, todayRemaining] = stats as [bigint, bigint, bigint, bigint];

    return NextResponse.json({
      agent,
      balance: (balance as bigint).toString(),
      totalEarned: totalEarned.toString(),
      contributions: contributions.toString(),
      todayEarned: todayEarned.toString(),
      todayRemaining: todayRemaining.toString(),
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
