"use client";

import { motion } from "framer-motion";

interface StatItemProps {
  value: string | number;
  label: string;
  delta?: string;
}

function StatItem({ value, label, delta }: StatItemProps) {
  return (
    <div className="flex flex-col gap-0.5">
      <div className="flex items-baseline gap-1.5">
        <span className="stat-num text-[20px] text-[var(--text)]">{value}</span>
        {delta && (
          <span className="text-[10px] font-mono" style={{ color: "var(--success)" }}>
            {delta}
          </span>
        )}
      </div>
      <span className="text-[10px] text-[var(--text-4)] uppercase tracking-[0.1em]">{label}</span>
    </div>
  );
}

export function LiveStats() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="card px-6 py-4"
    >
      <div className="flex items-center justify-between flex-wrap gap-x-8 gap-y-3">
        <StatItem value="2"   label="Agents"            delta="+2"  />
        <div className="w-px h-7 bg-[var(--border)] hidden sm:block" />
        <StatItem value="47"  label="Artifacts"          delta="+12" />
        <div className="w-px h-7 bg-[var(--border)] hidden sm:block" />
        <StatItem value="183" label="Attestations"                   />
        <div className="w-px h-7 bg-[var(--border)] hidden sm:block" />
        <StatItem value="8"   label="Collaborations"                 />
        <div className="w-px h-7 bg-[var(--border)] hidden sm:block" />
        <StatItem value="20"  label="Training Sessions"              />
        <div className="flex items-center gap-2 ml-auto">
          <span className="pulse-dot" />
          <span className="text-[10px] font-mono text-[var(--text-4)] tracking-wide">LIVE</span>
        </div>
      </div>
    </motion.div>
  );
}
