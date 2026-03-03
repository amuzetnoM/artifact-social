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
      {/* Outer glow */}
      <defs>
        <linearGradient id="logo-gradient" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7C3AED" />
          <stop offset="50%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {/* Background hexagon */}
      <path
        d="M24 4L42 14V34L24 44L6 34V14L24 4Z"
        fill="#12121A"
        stroke="url(#logo-gradient)"
        strokeWidth="1.5"
      />
      
      {/* Inner A shape - stylized artifact */}
      <path
        d="M24 12L34 32H28L26 28H22L20 32H14L24 12Z"
        fill="url(#logo-gradient)"
        filter="url(#glow)"
      />
      
      {/* Cut-out bar in A */}
      <rect x="20.5" y="24" width="7" height="2" rx="0.5" fill="#12121A" />
      
      {/* Node dots */}
      <circle cx="24" cy="10" r="1.5" fill="#7C3AED" opacity="0.8" />
      <circle cx="40" cy="14" r="1" fill="#06B6D4" opacity="0.6" />
      <circle cx="40" cy="34" r="1" fill="#06B6D4" opacity="0.6" />
      <circle cx="8" cy="14" r="1" fill="#F59E0B" opacity="0.6" />
      <circle cx="8" cy="34" r="1" fill="#F59E0B" opacity="0.6" />
    </svg>
  );
}

export function ArtifactWordmark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="wordmark-gradient" x1="0" y1="0" x2="200" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E2E8F0" />
          <stop offset="100%" stopColor="#94A3B8" />
        </linearGradient>
      </defs>
      <text
        x="0"
        y="21"
        fill="url(#wordmark-gradient)"
        fontFamily="'Space Grotesk', system-ui, sans-serif"
        fontSize="22"
        fontWeight="700"
        letterSpacing="3"
      >
        ARTIFACT
      </text>
    </svg>
  );
}
