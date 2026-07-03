interface HeroHexProps {
  children: React.ReactNode;
  className?: string;
}

export default function HeroHex({ children, className = "" }: HeroHexProps) {
  return (
    <div className={`v1-hero-hex ${className}`}>
      <svg className="v1-hero-hex-stroke" viewBox="0 0 400 440" aria-hidden>
        <defs>
          <linearGradient id="v1-hex-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f0d78c" />
            <stop offset="40%" stopColor="#d4af37" />
            <stop offset="100%" stopColor="#a68b3c" />
          </linearGradient>
        </defs>
        <polygon
          points="200,14 356,108 356,332 200,426 44,332 44,108"
          fill="rgba(12,12,12,0.94)"
          stroke="url(#v1-hex-gold)"
          strokeWidth="1.4"
        />
        <polygon
          points="200,30 332,110 332,330 200,410 68,330 68,110"
          fill="none"
          stroke="url(#v1-hex-gold)"
          strokeWidth="0.7"
          opacity="0.35"
        />
      </svg>
      <div className="v1-hero-hex-content">{children}</div>
    </div>
  );
}
