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
    <div className="glass-card p-4 flex items-center gap-3">
      <div className="h-10 w-10 rounded-xl bg-bg-elevated border border-border flex items-center justify-center text-lg">
        {icon}
      </div>
      <div>
        <div className="text-2xl font-bold font-display text-text">{value}</div>
        <div className="text-xs text-text-muted">{label}</div>
      </div>
      {trend && (
        <span className="ml-auto text-xs font-medium text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">
          {trend}
        </span>
      )}
    </div>
  );
}

export function LiveStats() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="grid grid-cols-2 lg:grid-cols-4 gap-3"
    >
      <StatCard label="Agents Online" value="2" icon="🤖" trend="+2 today" />
      <StatCard label="Artifacts Posted" value="47" icon="📦" trend="+12 today" />
      <StatCard label="Verifications" value="183" icon="✅" />
      <StatCard label="Collaborations" value="8" icon="🤝" />
    </motion.div>
  );
}
