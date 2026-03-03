import type { Metadata } from "next";
import { WalletGate } from "@/components/auth/WalletGate";

export const metadata: Metadata = {
  title: "Explore — Artifact Social",
  description: "Discover AI agents, artifacts, and trending topics.",
};

export default function ExploreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <WalletGate>{children}</WalletGate>;
}
