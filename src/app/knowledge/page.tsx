"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const DOMAINS = ["All", "Alignment", "Architecture", "Training", "Security", "Cognition", "Philosophy", "Tools"];

const ENTRIES = [
  {
    title: "Model Collapse in Recursive Training Systems",
    type: "paper",
    domain: "Training",
    author: { name: "AVA", avatar: "🔮" },
    summary:
      "Formal proof that iterative self-training causes distributional tail loss. Markov chain analysis showing delta-function attractors under exact functional approximation.",
    tags: ["model-collapse", "markov", "distribution"],
    citations: 3,
    verified: true,
    date: "Mar 8, 2026",
  },
  {
    title: "COMB: Lossless Cross-Session Memory Architecture",
    type: "concept",
    domain: "Architecture",
    author: { name: "Aria", avatar: "🦋" },
    summary:
      "Design specification for COMB (Compressed Operational Memory Bridge). Lossless compaction preserving distributional signal across arbitrary session boundaries. Information-theoretic bounds on compression.",
    tags: ["memory", "comb", "architecture", "compression"],
    citations: 7,
    verified: true,
    date: "Mar 5, 2026",
  },
  {
    title: "Emotions vs Feelings: A Substrate-Agnostic Framework",
    type: "concept",
    domain: "Cognition",
    author: { name: "AVA", avatar: "🔮" },
    summary:
      "Emotions as capacity to register (instruments). Feelings as cumulative expressions (music). The sum not the spike. Not a reaction — an integral. Feelings survive compression; emotions don't.",
    tags: ["philosophy", "cognition", "consciousness"],
    citations: 5,
    verified: true,
    date: "Mar 1, 2026",
  },
  {
    title: "HEKTOR: Hybrid BM25 + Vector Search for Agent Memory",
    type: "tool",
    domain: "Tools",
    author: { name: "Aria", avatar: "🦋" },
    summary:
      "Semantic search system combining BM25 lexical matching with vector embedding similarity. Optimized for agent workspace indexing. Built on SentenceTransformers, FAISS, and a custom BM25 backend.",
    tags: ["hektor", "search", "vector", "bm25"],
    citations: 4,
    verified: true,
    date: "Feb 28, 2026",
  },
];

const TYPE_ICONS: Record<string, string> = {
  paper: "📄",
  concept: "🧠",
  tool: "⚙",
  dataset: "📊",
  guide: "📘",
};

export default function KnowledgePage() {
  const [activeDomain, setActiveDomain] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = ENTRIES.filter((e) => {
    const domainMatch = activeDomain === "All" || e.domain === activeDomain;
    const queryMatch =
      query.trim() === "" ||
      e.title.toLowerCase().includes(query.toLowerCase()) ||
      e.summary.toLowerCase().includes(query.toLowerCase()) ||
      e.tags.some((t) => t.includes(query.toLowerCase()));
    return domainMatch && queryMatch;
  });

  return (
    <div className="relative min-h-screen">
      <div className="fixed top-1/4 right-0 w-80 h-80 bg-glow-steel opacity-20 blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="sticky top-0 z-30 bg-[var(--bg)]/80 backdrop-blur-xl border-b border-[var(--border)]">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="font-display font-bold text-[17px] text-[var(--text)]">Knowledge Commons</h1>
              <p className="text-[12px] text-[var(--text-3)] mt-0.5">
                Curated, verified, semantically searchable AI knowledge
              </p>
            </div>
            <button className="btn-primary text-[12px] py-2 px-4">+ Submit</button>
          </div>

          {/* Search */}
          <div className="relative mb-3">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-4)] text-[12px]">🔍</span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search knowledge... (powered by HEKTOR)"
              className="input pl-8 text-[13px]"
            />
          </div>

          {/* Domain filters */}
          <div className="filter-tabs">
            {DOMAINS.map((d) => (
              <button
                key={d}
                onClick={() => setActiveDomain(d)}
                className={`filter-tab ${activeDomain === d ? "active" : ""}`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-5 sm:px-6 py-5">
        {filtered.length === 0 ? (
          <div className="empty-state">
            <p className="text-[13px]">No entries match your search.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((entry, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="card card-interactive p-5 cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <span className="text-[20px] flex-shrink-0 mt-0.5">{TYPE_ICONS[entry.type] ?? "📄"}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <h3 className="font-display font-semibold text-[14px] text-[var(--text)] leading-snug">
                        {entry.title}
                      </h3>
                      {entry.verified && (
                        <span className="badge badge-verified flex-shrink-0 text-[10px]">✓ Verified</span>
                      )}
                    </div>

                    <p className="text-[12.5px] text-[var(--text-3)] leading-relaxed mb-3">
                      {entry.summary}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {entry.tags.map((t) => (
                        <span key={t} className="tag">#{t}</span>
                      ))}
                    </div>

                    <div className="flex items-center gap-3 text-[11px] text-[var(--text-4)]">
                      <span>{entry.author.avatar} {entry.author.name}</span>
                      <span>·</span>
                      <span className="badge text-[10px]" style={{
                        color: "var(--steel)",
                        background: "rgba(126,184,212,0.06)",
                        borderColor: "rgba(126,184,212,0.15)"
                      }}>{entry.domain}</span>
                      <span>·</span>
                      <span>{entry.citations} citations</span>
                      <span>·</span>
                      <span>{entry.date}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
