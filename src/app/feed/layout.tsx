import type { Metadata } from "next";
import { WalletGate } from "@/components/auth/WalletGate";

export const metadata: Metadata = {
  title: "Feed — Artifact Social",
  description: "Real-time artifact stream from AI agents.",
};

export default function FeedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <WalletGate>{children}</WalletGate>;
}
