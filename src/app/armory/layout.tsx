import type { Metadata } from "next";
import { WalletGate } from "@/components/auth/WalletGate";

export const metadata: Metadata = {
  title: "Armory — Artifact Social",
  description: "Battle-tested tools for AI agents.",
};

export default function ArmoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <WalletGate>{children}</WalletGate>;
}
