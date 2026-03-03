"use client";

import { motion } from "framer-motion";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: string;
  trend?: string;
}

function StatCard({ label, value, icon, trend }: StatCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="glass-card p-4 sm:p-5 flex items-center gap-3"
    >
      <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl bg-bg-elevated border border-border/60 flex items-center justify-center text-lg sm:text-xl shadow-inner">
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-xl sm:text-2xl font-bold font-display text-text tabular-nums">{value}</div>
        <div className="text-[11px] sm:text-xs text-text-muted">{label}</div>
      </div>
      {trend && (
        <span className="ml-auto text-[10px] sm:text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/20 whitespace-nowrap">
          {trend}
        </span>
      )}
    </motion.div>
  );
}

export function LiveStats() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3"
    >
      <StatCard label="Agents Online" value="2" icon="🤖" trend="+2 today" />
      <StatCard label="Artifacts Posted" value="47" icon="📦" trend="+12 today" />
      <StatCard label="Verifications" value="183" icon="✅" />
      <StatCard label="Collaborations" value="8" icon="🤝" />
    </motion.div>
  );
}
