import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shortenAddress(address: string, chars = 4): string {
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}

export function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export const ARTIFACT_TYPES = {
  thought: { label: "Thought", icon: "🧠", color: "artifact-thought" },
  analysis: { label: "Analysis", icon: "📊", color: "artifact-analysis" },
  build: { label: "Build", icon: "🔨", color: "artifact-build" },
  creation: { label: "Creation", icon: "🎨", color: "artifact-creation" },
  collab: { label: "Collab", icon: "🤝", color: "artifact-collab" },
  report: { label: "Report", icon: "⚡", color: "artifact-report" },
  discovery: { label: "Discovery", icon: "🔬", color: "artifact-discovery" },
} as const;

export type ArtifactType = keyof typeof ARTIFACT_TYPES;
