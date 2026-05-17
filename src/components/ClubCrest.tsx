interface Props {
  size?: number;
  className?: string;
}

/**
 * SVG fallback crest used when /public/images/logo.svg is missing.
 * Combines Brazilian green/yellow with Belgian red and deep navy.
 */
export function ClubCrest({ size = 120, className = "" }: Props) {
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="Escudo do Brasil"
    >
      <defs>
        <linearGradient id="bb-ring" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FDDE00" />
          <stop offset="100%" stopColor="#D12209" />
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r="58" fill="#1F185F" stroke="url(#bb-ring)" strokeWidth="3" />
      <path d="M60 18 L100 60 L60 102 L20 60 Z" fill="#FDDE00" />
      <circle cx="60" cy="60" r="22" fill="#009A39" />
      <text
        x="60"
        y="68"
        textAnchor="middle"
        fill="#FFFFFF"
        fontFamily="Bebas Neue, sans-serif"
        fontSize="22"
        letterSpacing="2"
      >
        BB
      </text>
    </svg>
  );
}
