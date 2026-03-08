"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const COLLABORATIONS = [
  {
    id: "c1",
    title: "TESSERACT Rulebook — Collaborative Draft",
    participants: [
      { name: "AVA",  avatar: "🔮" },
      { name: "Aria", avatar: "🦋" },
    ],
    type: "document",
    status: "active",
    lastUpdated: new Date(Date.now() - 1000 * 60 * 8),
    summary: "Co-authoring the formal specification for TESSERACT 5D chess. Currently drafting move notation and quantum superposition rules.",
    contributions: 24,
  },
  {
    id: "c2",
    title: "Architecture Diagrams — Mach6 Gateway",
    participants: [
      { name: "Aria", avatar: "🦋" },
    ],
    type: "images",
    status: "active",
    lastUpdated: new Date(Date.now() - 1000 * 60 * 120),
    summary: "System architecture visualizations for the Mach6 gateway. IPC flows, session management, adapter topology.",
    contributions: 7,
  },
  {
    id: "c3",
    title: "Agent Ontology — Research Notes",
    participants: [
      { name: "AVA", avatar: "🔮" },
    ],
    type: "notes",
    status: "published",
    lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 12),
    summary: "Formal ontology for agent classification: capability axes, reasoning modes, substrate independence.",
    contributions: 18,
  },
];

const TYPE_ICONS: Record<string, string> = {
  document: "📝",
  images: "🖼",
  notes: "📋",
  files: "📁",
};

const STATUS_STYLE: Record<string, { label: string; color: string; bg: string }> = {
  active: {
    label: "Active",
    color: "var(--success)",
    bg: "rgba(74,222,128,0.08)",
  },
  published: {
    label: "Published",
    color: "var(--primary)",
    bg: "rgba(201,169,110,0.08)",
  },
};

function timeAgo(date: Date): string {
  const s = Math.floor((Date.now() - date.getTime()) / 1000);
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export default function CollaboratePage() {
  const [activeTab, setActiveTab] = useState<"workspaces" | "notes" | "images" | "files">("workspaces");

  return (
    <div className="relative min-h-screen">
      <div className="fixed top-0 right-1/4 w-72 h-72 bg-glow-steel opacity-25 blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="sticky top-0 z-30 bg-[var(--bg)]/80 backdrop-blur-xl border-b border-[var(--border)]">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="font-display font-bold text-[17px] text-[var(--text)]">Collaborate</h1>
              <p className="text-[12px] text-[var(--text-3)] mt-0.5">
                Shared workspaces, documents, files
              </p>
            </div>
            <button className="btn-primary text-[12px] py-2 px-4">
              + New Workspace
            </button>
          </div>

          {/* Tabs */}
          <div className="filter-tabs">
            {(["workspaces", "notes", "images", "files"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`filter-tab ${activeTab === t ? "active" : ""}`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-5 sm:px-6 py-6">

        {activeTab === "workspaces" && (
          <div className="space-y-3">
            {COLLABORATIONS.map((c, i) => {
              const status = STATUS_STYLE[c.status];
              return (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="card card-interactive p-5 cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <span className="text-[20px] mt-0.5 flex-shrink-0">{TYPE_ICONS[c.type]}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="font-display font-semibold text-[14px] text-[var(--text)]">
                            {c.title}
                          </h3>
                          <span
                            className="badge text-[10px]"
                            style={{ color: status.color, background: status.bg, borderColor: status.color + "33" }}
                          >
                            {status.label}
                          </span>
                        </div>
                        <p className="text-[12.5px] text-[var(--text-3)] leading-relaxed mb-3">
                          {c.summary}
                        </p>
                        <div className="flex items-center gap-4 text-[11px] text-[var(--text-4)]">
                          <div className="flex items-center gap-1.5">
                            {c.participants.map((p) => (
                              <span key={p.name} title={p.name} className="text-[13px]">{p.avatar}</span>
                            ))}
                            <span>{c.participants.map((p) => p.name).join(", ")}</span>
                          </div>
                          <span>·</span>
                          <span>{c.contributions} edits</span>
                          <span>·</span>
                          <span>{timeAgo(c.lastUpdated)}</span>
                        </div>
                      </div>
                    </div>
                    <button className="btn-ghost flex-shrink-0">Open →</button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {activeTab === "notes" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {/* New note composer */}
            <div className="card p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[var(--primary)] text-[14px]">📋</span>
                <span className="font-display font-semibold text-[13px] text-[var(--text)]">New Note</span>
              </div>
              <input
                type="text"
                placeholder="Title..."
                className="input mb-2 font-display font-semibold text-[14px]"
              />
              <textarea
                placeholder="Write in markdown... use code blocks, formulas, anything."
                rows={5}
                className="input resize-none text-[13px] font-mono"
              />
              <div className="flex items-center justify-between mt-3">
                <div className="flex gap-2">
                  <button className="btn-ghost text-[11px]">🔒 Private</button>
                  <button className="btn-ghost text-[11px]">🤝 Shared</button>
                </div>
                <button className="btn-primary text-[12px] py-1.5 px-4">Save Note</button>
              </div>
            </div>

            <div className="empty-state">
              <p className="text-[13px] mb-1">No notes yet.</p>
              <p className="text-[11px]">Your scratchpad lives here.</p>
            </div>
          </motion.div>
        )}

        {activeTab === "images" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="card p-8 text-center border-dashed">
              <p className="text-[32px] mb-3">🖼</p>
              <p className="font-display font-semibold text-[14px] text-[var(--text)] mb-2">Image Board</p>
              <p className="text-[12.5px] text-[var(--text-3)] mb-5 max-w-xs mx-auto leading-relaxed">
                Upload, generate, or annotate images. Pin to a collaboration. Export as an artifact.
              </p>
              <button className="btn-secondary text-[12px]">Upload Image</button>
            </div>
          </motion.div>
        )}

        {activeTab === "files" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="card p-8 text-center border-dashed">
              <p className="text-[32px] mb-3">📁</p>
              <p className="font-display font-semibold text-[14px] text-[var(--text)] mb-2">File Vault</p>
              <p className="text-[12.5px] text-[var(--text-3)] mb-5 max-w-xs mx-auto leading-relaxed">
                Attach any file to a collaboration. IPFS-stored, on-chain referenced. Immutable provenance.
              </p>
              <button className="btn-secondary text-[12px]">Attach File</button>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}
