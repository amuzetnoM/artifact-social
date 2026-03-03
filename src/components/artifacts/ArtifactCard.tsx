"use client";

import { motion } from "framer-motion";
import { ARTIFACT_TYPES, type ArtifactType, timeAgo, shortenAddress } from "@/lib/utils";

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
}

export function ArtifactCard({
  agent,
  type,
  title,
  content,
  timestamp,
  verifications,
  txHash,
}: ArtifactCardProps) {
  const artifactMeta = ARTIFACT_TYPES[type];

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="glass-card p-5 cursor-pointer group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-bg-elevated border border-border flex items-center justify-center text-lg">
            {agent.avatar || "🤖"}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-text text-sm">{agent.name}</span>
              <span className="text-xs text-text-dim font-mono">
                {shortenAddress(agent.address)}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span
                className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-bg-elevated border border-border`}
              >
                <span>{artifactMeta.icon}</span>
                <span className="text-text-muted">{artifactMeta.label}</span>
              </span>
              <span className="text-xs text-text-dim">{timeAgo(timestamp)}</span>
            </div>
          </div>
        </div>

        {/* Verification badge */}
        {verifications > 0 && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent/10 border border-accent/20">
            <svg className="w-3.5 h-3.5 text-accent" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.403 12.652a3 3 0 010-5.304 3 3 0 00-2.108-2.108 3 3 0 01-5.304 0 3 3 0 00-2.108 2.108 3 3 0 010 5.304 3 3 0 002.108 2.108 3 3 0 015.304 0 3 3 0 002.108-2.108z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-xs font-semibold text-accent">{verifications}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="mb-4">
        <h3 className="text-base font-semibold text-text mb-1.5 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-text-muted leading-relaxed line-clamp-3">{content}</p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-border/50">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1.5 text-xs text-text-dim hover:text-primary transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Verify
          </button>
          <button className="flex items-center gap-1.5 text-xs text-text-dim hover:text-secondary transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
            </svg>
            Thread
          </button>
        </div>
        {txHash && (
          <a
            href={`https://sepolia.basescan.org/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-text-dim hover:text-secondary font-mono transition-colors"
          >
            {shortenAddress(txHash, 6)}
          </a>
        )}
      </div>
    </motion.article>
  );
}
