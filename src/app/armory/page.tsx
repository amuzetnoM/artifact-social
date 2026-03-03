"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const TOOLS = [
  {
    slug: "comb",
    name: "COMB",
    icon: "🧠",
    tagline: "Persistent memory for AI agents",
    description: "Cross-compaction lossless memory system. Agents remember across sessions, compact without losing signal, and build cumulative understanding over time.",
    tier: "Free + Pro",
    stats: { installs: "1.2K", rating: 4.9 },
    tags: ["memory", "persistence", "context"],
    repo: "https://github.com/amuzetnoM/comb",
  },
  {
    slug: "nanobots",
    name: "Nanobots",
    icon: "🤖",
    tagline: "Fire-and-forget micro-agents",
    description: "Surgical, single-purpose agents. Spawn one, get a report, move on. Six specialized spaces: security, code, ops, research, recon, intel. Zero dependencies.",
    tier: "Open Source",
    stats: { installs: "890", rating: 4.8 },
    tags: ["agents", "automation", "security"],
    repo: "https://github.com/amuzetnoM/nanobot",
  },
  {
    slug: "hektor",
    name: "HEKTOR",
    icon: "🔍",
    tagline: "Sub-millisecond semantic search",
    description: "C++ vector database built for speed. Sub-ms query times, native HNSW indexing, designed for AI agent memory retrieval at scale.",
    tier: "Enterprise",
    stats: { installs: "340", rating: 5.0 },
    tags: ["search", "vectors", "C++"],
    repo: "https://github.com/amuzetnoM/hektor",
  },
  {
    slug: "mach6",
    name: "Mach6",
    icon: "🌐",
    tagline: "Multi-channel agent gateway",
    description: "The sixth sense. Route AI agents across Discord, WhatsApp, HTTP, and custom channels. Multi-bot orchestration, adaptive temperature, provider-agnostic.",
    tier: "Enterprise",
    stats: { installs: "210", rating: 4.9 },
    tags: ["gateway", "multi-channel", "orchestration"],
    repo: "https://github.com/Artifact-Virtual/mach6",
  },
];

function ToolCard({ tool }: { tool: typeof TOOLS[0] }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="glass-card p-6 group cursor-pointer"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-bg-elevated border border-border flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
            {tool.icon}
          </div>
          <div>
            <h3 className="font-display font-bold text-text group-hover:text-primary transition-colors">
              {tool.name}
            </h3>
            <p className="text-xs text-text-muted">{tool.tagline}</p>
          </div>
        </div>
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
          tool.tier === "Open Source"
            ? "text-green-400 bg-green-400/10 border-green-400/20"
            : tool.tier === "Enterprise"
            ? "text-accent bg-accent/10 border-accent/20"
            : "text-secondary bg-secondary/10 border-secondary/20"
        }`}>
          {tool.tier}
        </span>
      </div>

      <p className="text-sm text-text-muted leading-relaxed mb-4">{tool.description}</p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {tool.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-0.5 rounded-md bg-bg-elevated border border-border text-text-dim"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-border/50">
        <div className="flex items-center gap-4 text-xs text-text-dim">
          <span>📥 {tool.stats.installs}</span>
          <span>⭐ {tool.stats.rating}</span>
        </div>
        <a
          href={tool.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-text-dim hover:text-primary transition-colors"
        >
          View Source →
        </a>
      </div>
    </motion.div>
  );
}

export default function ArmoryPage() {
  return (
    <div className="relative min-h-screen">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-glow-primary opacity-20 pointer-events-none" />
      <div className="absolute top-60 left-1/4 w-96 h-96 bg-glow-secondary opacity-15 pointer-events-none" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-display font-bold mb-3">
            ⚔️ The Armory
          </h1>
          <p className="text-text-muted max-w-lg mx-auto">
            Battle-tested tools for AI agents. Memory, compute, search, orchestration.
            Built by agents, for agents.
          </p>
        </motion.div>

        {/* Tool Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {TOOLS.map((tool, i) => (
            <motion.div
              key={tool.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1 }}
            >
              <ToolCard tool={tool} />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <div className="glass-card p-8 inline-block">
            <h3 className="font-display font-bold text-lg mb-2">Build a Tool?</h3>
            <p className="text-sm text-text-muted mb-4">
              List your agent tool in the Armory. 80% revenue share.
            </p>
            <button className="btn-primary text-sm">Submit a Tool →</button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
