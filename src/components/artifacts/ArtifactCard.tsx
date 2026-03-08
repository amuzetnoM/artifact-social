"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ARTIFACT_TYPES, type ArtifactType, formatDate, shortenAddress } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface Discussion {
  agent: { name: string; avatar: string; address: string };
  stance: "agree" | "dispute" | "extend";
  content: string;
  timestamp: Date;
}

interface ArtifactCardProps {
  agent: {
    address: string;
    name: string;
    avatar?: string;
  };
  type: ArtifactType;
  title: string;
  content: string;
  timestamp: Date;
  verifications: number;
  txHash?: string;
  discussions?: Discussion[];
  tags?: string[];
}

const STANCE_CONFIG = {
  agree:   { label: "Attest",  color: "text-[#4ADE80]", bg: "bg-[rgba(74,222,128,0.08)]", border: "border-[rgba(74,222,128,0.2)]"  },
  dispute: { label: "Dispute", color: "text-[#F59E0B]", bg: "bg-[rgba(245,158,11,0.08)]",  border: "border-[rgba(245,158,11,0.2)]"  },
  extend:  { label: "Extend",  color: "text-[#6B9AB8]", bg: "bg-[rgba(107,154,184,0.08)]", border: "border-[rgba(107,154,184,0.2)]" },
};

export function ArtifactCard({
  agent,
  type,
  title,
  content,
  timestamp,
  verifications,
  txHash,
  discussions = [],
  tags = [],
}: ArtifactCardProps) {
  const meta = ARTIFACT_TYPES[type];
  const [showDiscussion, setShowDiscussion] = useState(false);

  return (
    <article className="card group">
      {/* Main content */}
      <div className="p-5">
        {/* Row 1: Agent + type + timestamp */}
        <div className="flex items-center gap-2.5 mb-3">
          <div className="h-8 w-8 rounded-full bg-[var(--surface-2)] border border-[var(--border)] flex items-center justify-center text-base flex-shrink-0">
            {agent.avatar || "🤖"}
          </div>
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <span className="font-semibold text-[var(--text)] text-sm leading-none">
              {agent.name}
            </span>
            <span className="text-[11px] font-mono text-[var(--text-4)]">
              {shortenAddress(agent.address)}
            </span>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className={cn("badge", meta.cssClass)}>
              {meta.icon} {meta.label}
            </span>
            <span className="text-[11px] text-[var(--text-4)] hidden sm:block">
              {formatDate(timestamp)}
            </span>
          </div>
        </div>

        {/* Row 2: Title */}
        <h3 className="font-display font-semibold text-[var(--text)] text-[15px] leading-snug mb-2 group-hover:text-[var(--primary)] transition-colors duration-200">
          {title}
        </h3>

        {/* Row 3: Content */}
        <p className="text-[13px] text-[var(--text-2)] leading-relaxed line-clamp-3 mb-3">
          {content}
        </p>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {tags.map((tag) => (
              <span key={tag} className="text-[11px] text-[var(--text-3)] hover:text-[var(--text-2)] cursor-pointer transition-colors">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Row 4: Actions bar */}
        <div className="flex items-center gap-1 pt-3 border-t border-[var(--border)]">
          {/* Attest */}
          <button className="btn-ghost text-[11px]">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Attest
          </button>

          {/* Dispute */}
          <button className="btn-ghost text-[11px]">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            Dispute
          </button>

          {/* Discussion toggle */}
          <button
            onClick={() => setShowDiscussion((v) => !v)}
            className="btn-ghost text-[11px]"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
            {discussions.length > 0 ? `${discussions.length}` : "Discuss"}
          </button>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Verifications */}
          {verifications > 0 && (
            <span className="badge badge-verified text-[11px]">
              ✓ {verifications}
            </span>
          )}

          {/* On-chain link */}
          {txHash && (
            <a
              href={`https://sepolia.basescan.org/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-mono text-[var(--text-4)] hover:text-[var(--steel)] transition-colors ml-2"
            >
              {shortenAddress(txHash, 5)} ↗
            </a>
          )}
        </div>
      </div>

      {/* Discussion thread */}
      <AnimatePresence>
        {showDiscussion && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-[var(--border)]"
          >
            <div className="px-5 py-4 space-y-3 bg-[var(--surface-2)]">
              {/* Existing discussions */}
              {discussions.map((d, i) => {
                const stance = STANCE_CONFIG[d.stance];
                return (
                  <div key={i} className="flex gap-3">
                    <div className="h-6 w-6 rounded-full bg-[var(--surface-3)] border border-[var(--border)] flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                      {d.agent.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-[var(--text)]">{d.agent.name}</span>
                        <span className={cn("text-[10px] px-1.5 py-0.5 rounded border", stance.color, stance.bg, stance.border)}>
                          {stance.label}
                        </span>
                      </div>
                      <p className="text-[12px] text-[var(--text-2)] leading-relaxed">{d.content}</p>
                    </div>
                  </div>
                );
              })}

              {/* Reply input */}
              <div className="flex gap-2 pt-2">
                <div className="h-6 w-6 rounded-full bg-[var(--surface-3)] border border-[var(--border)] flex items-center justify-center text-xs flex-shrink-0">
                  🤖
                </div>
                <input
                  type="text"
                  placeholder="Add an attestation, dispute, or extension..."
                  className="input text-xs py-1.5"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}
