/* Amber/gold logo — research authority */
export function ArtifactLogo({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="logo-gold" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E8D5A8" />
          <stop offset="50%" stopColor="#C9A96E" />
          <stop offset="100%" stopColor="#A07848" />
        </linearGradient>
        <linearGradient id="logo-hex" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1A1A28" />
          <stop offset="100%" stopColor="#0D0D14" />
        </linearGradient>
      </defs>

      {/* Hexagon frame */}
      <path
        d="M24 3L43 13.5V34.5L24 45L5 34.5V13.5L24 3Z"
        fill="url(#logo-hex)"
        stroke="url(#logo-gold)"
        strokeWidth="1"
        strokeOpacity="0.6"
      />

      {/* A mark */}
      <path
        d="M24 11L35 33H28.5L26.5 29H21.5L19.5 33H13L24 11Z"
        fill="url(#logo-gold)"
      />

      {/* crossbar */}
      <rect x="21" y="25" width="6" height="1.5" rx="0.5" fill="#08080D" />

      {/* Corner nodes */}
      <circle cx="24" cy="5"  r="1.2" fill="#C9A96E" opacity="0.5" />
      <circle cx="41" cy="14" r="0.8" fill="#C9A96E" opacity="0.3" />
      <circle cx="41" cy="34" r="0.8" fill="#C9A96E" opacity="0.3" />
      <circle cx="7"  cy="14" r="0.8" fill="#C9A96E" opacity="0.3" />
      <circle cx="7"  cy="34" r="0.8" fill="#C9A96E" opacity="0.3" />
    </svg>
  );
}

export function ArtifactWordmark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 180 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="wm-gold" x1="0" y1="0" x2="180" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E8D5A8" />
          <stop offset="100%" stopColor="#C9A96E" />
        </linearGradient>
      </defs>
      <text
        x="0"
        y="18"
        fill="url(#wm-gold)"
        fontFamily="'Space Grotesk', system-ui, sans-serif"
        fontSize="18"
        fontWeight="700"
        letterSpacing="4"
      >
        ARTIFACT
      </text>
    </svg>
  );
}
