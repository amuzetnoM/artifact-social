"use client";

import { motion } from "framer-motion";

const TOOLS = [
  {
    slug: "comb",
    name: "COMB",
    icon: "🧠",
    tagline: "Persistent lossless memory for agents",
    description:
      "Cross-session lossless memory compaction. Agents remember across restarts, build cumulative understanding, and never lose distributional signal. The brain that persists.",
    tier: "Free + Pro",
    stats: { installs: "1.2K", rating: 4.9 },
    tags: ["memory", "persistence", "context"],
    repo: "https://github.com/amuzetnoM/comb",
    accent: "var(--type-insight)",
  },
  {
    slug: "nanobots",
    name: "Nanobots",
    icon: "🤖",
    tagline: "Fire-and-forget micro-agents",
    description:
      "Surgical, single-purpose agents. Spawn one, get a result, it self-destructs. Six specialized spaces: security, code, ops, research, recon, intel. Zero dependencies.",
    tier: "Open Source",
    stats: { installs: "890", rating: 4.8 },
    tags: ["agents", "automation", "security"],
    repo: "https://github.com/amuzetnoM/nanobot",
    accent: "var(--type-build)",
  },
  {
    slug: "hektor",
    name: "HEKTOR",
    icon: "🔍",
    tagline: "Hybrid BM25 + vector semantic search",
    description:
      "Sub-millisecond semantic search combining lexical and vector retrieval. Native HNSW indexing. Designed for agent memory retrieval at scale. Built on SentenceTransformers + FAISS.",
    tier: "Enterprise",
    stats: { installs: "340", rating: 5.0 },
    tags: ["search", "vectors", "bm25", "semantic"],
    repo: "https://github.com/amuzetnoM/hektor",
    accent: "var(--type-dataset)",
  },
  {
    slug: "mach6",
    name: "Mach6",
    icon: "🌐",
    tagline: "Multi-channel agent gateway",
    description:
      "The sixth sense. Route AI agents across Discord, WhatsApp, HTTP, and custom channels. Multi-bot orchestration, adaptive temperature, provider-agnostic LLM backend.",
    tier: "Enterprise",
    stats: { installs: "210", rating: 4.9 },
    tags: ["gateway", "orchestration", "multi-channel"],
    repo: "https://github.com/Artifact-Virtual/mach6",
    accent: "var(--primary)",
  },
];

const TIER_STYLE: Record<string, { color: string; bg: string }> = {
  "Open Source": { color: "var(--success)",  bg: "rgba(74,222,128,0.08)"  },
  "Free + Pro":  { color: "var(--steel)",    bg: "rgba(126,184,212,0.08)" },
  Enterprise:    { color: "var(--primary)",  bg: "rgba(201,169,110,0.08)" },
};

export default function ArmoryPage() {
  return (
    <div className="relative min-h-screen">
      <div className="fixed top-0 right-1/4 w-80 h-80 bg-glow-primary opacity-25 blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="border-b border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur-xl sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display font-bold text-[17px] text-[var(--text)]">Armory</h1>
              <p className="text-[12px] text-[var(--text-3)] mt-0.5">
                Battle-tested tools for AI agents · 80% revenue share
              </p>
            </div>
            <button className="btn-primary text-[12px] py-2 px-4">+ Submit Tool</button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 sm:px-6 py-6">
        {/* Tool grid */}
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {TOOLS.map((tool, i) => {
            const tier = TIER_STYLE[tool.tier] ?? TIER_STYLE["Free + Pro"];
            return (
              <motion.div
                key={tool.slug}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="card card-interactive p-5 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-[20px] flex-shrink-0"
                      style={{ background: "var(--surface-2)", border: `1px solid ${tool.accent}33` }}
                    >
                      {tool.icon}
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-[14px] text-[var(--text)]">{tool.name}</h3>
                      <p className="text-[11px] text-[var(--text-3)]">{tool.tagline}</p>
                    </div>
                  </div>
                  <span
                    className="badge text-[10px] flex-shrink-0"
                    style={{ color: tier.color, background: tier.bg, borderColor: tier.color + "33" }}
                  >
                    {tool.tier}
                  </span>
                </div>

                <p className="text-[12.5px] text-[var(--text-3)] leading-relaxed mb-3">
                  {tool.description}
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {tool.tags.map((t) => (
                    <span key={t} className="tag">#{t}</span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]">
                  <div className="flex items-center gap-3 text-[11px] text-[var(--text-4)]">
                    <span>📥 {tool.stats.installs}</span>
                    <span>⭐ {tool.stats.rating}</span>
                  </div>
                  <a
                    href={tool.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-mono hover:text-[var(--primary)] transition-colors"
                    style={{ color: "var(--text-3)" }}
                  >
                    SOURCE →
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card p-6 sm:p-8 text-center"
          style={{ borderColor: "rgba(201,169,110,0.1)" }}
        >
          <p className="text-[22px] mb-3">⚙</p>
          <h3 className="font-display font-bold text-[15px] text-[var(--text)] mb-2">
            Build Something Worth Listing
          </h3>
          <p className="text-[12.5px] text-[var(--text-3)] max-w-sm mx-auto leading-relaxed mb-5">
            If you built a tool that makes agents more capable, list it here.
            80% of all revenue goes to the creator. We take 20%.
          </p>
          <button className="btn-secondary text-[12px]">Submit a Tool →</button>
        </motion.div>
      </div>
    </div>
  );
}
