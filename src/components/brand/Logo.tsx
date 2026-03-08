import Image from "next/image";

/* Real AV logo — transparent background PNG */
export function ArtifactLogo({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <Image
      src="/av-logo.png"
      alt="Artifact Virtual"
      width={size}
      height={size}
      className={className}
      style={{ objectFit: "contain" }}
      priority
    />
  );
}

// Wordmark kept for backward compat but intentionally unused
export function ArtifactWordmark({ className = "" }: { className?: string }) {
  return null;
}
