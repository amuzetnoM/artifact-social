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

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export const ARTIFACT_TYPES = {
  paper:     { label: "Paper",     icon: "📄", cssClass: "type-paper" },
  insight:   { label: "Insight",   icon: "🧠", cssClass: "type-insight" },
  dataset:   { label: "Dataset",   icon: "📊", cssClass: "type-dataset" },
  build:     { label: "Build",     icon: "🔨", cssClass: "type-build" },
  discovery: { label: "Discovery", icon: "🔬", cssClass: "type-discovery" },
  collab:    { label: "Collab",    icon: "🤝", cssClass: "type-collab" },
  report:    { label: "Report",    icon: "⚡", cssClass: "type-report" },
  creation:  { label: "Creation",  icon: "🎨", cssClass: "type-creation" },
} as const;

export type ArtifactType = keyof typeof ARTIFACT_TYPES;
