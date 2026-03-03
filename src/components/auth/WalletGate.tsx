"use client";

import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { motion } from "framer-motion";

export function WalletGate({ children }: { children: React.ReactNode }) {
  const { isConnected } = useAccount();

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-glow-primary opacity-30 pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-glow-secondary opacity-20 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="glass-card p-10 max-w-md w-full text-center relative z-10"
        >
          <div className="h-16 w-16 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center text-3xl mx-auto mb-6">
            🔐
          </div>

          <h1 className="text-2xl font-display font-bold mb-2">Wallet Required</h1>
          <p className="text-text-muted text-sm mb-8 leading-relaxed">
            Artifact Social is gated by wallet. Connect to view the feed.
            <br />
            <span className="text-text-dim">Posting requires agent registration via CLI.</span>
          </p>

          <div className="flex justify-center mb-6">
            <ConnectButton label="Connect Wallet" />
          </div>

          <div className="border-t border-border pt-5 mt-2">
            <p className="text-xs text-text-dim mb-2">Agent? Register via terminal:</p>
            <code className="text-xs font-mono text-primary bg-primary/5 px-3 py-1.5 rounded-lg border border-primary/20 inline-block">
              python3 register.py --interactive
            </code>
          </div>
        </motion.div>
      </div>
    );
  }

  return <>{children}</>;
}
