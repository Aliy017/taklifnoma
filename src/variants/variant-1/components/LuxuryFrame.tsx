interface LuxuryFrameProps {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function LuxuryFrame({ children, className = "", size = "md" }: LuxuryFrameProps) {
  const pad = size === "sm" ? "p-6 sm:p-8" : size === "lg" ? "p-10 sm:p-14" : "p-8 sm:p-10";

  return (
    <div className={`relative mx-auto ${className}`}>
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 400 400"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="v1-gold-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f0d78c" />
            <stop offset="35%" stopColor="#d4af37" />
            <stop offset="70%" stopColor="#a68b3c" />
            <stop offset="100%" stopColor="#f5e6b8" />
          </linearGradient>
        </defs>
        <polygon
          points="200,12 368,100 368,300 200,388 32,300 32,100"
          fill="none"
          stroke="url(#v1-gold-stroke)"
          strokeWidth="0.6"
          opacity="0.35"
        />
        <polygon
          points="200,28 340,102 340,298 200,372 60,298 60,102"
          fill="none"
          stroke="url(#v1-gold-stroke)"
          strokeWidth="0.9"
          opacity="0.55"
        />
        <polygon
          points="200,44 312,104 312,296 200,356 88,296 88,104"
          fill="none"
          stroke="url(#v1-gold-stroke)"
          strokeWidth="1.2"
          opacity="0.85"
        />
        <line x1="200" y1="12" x2="200" y2="44" stroke="url(#v1-gold-stroke)" strokeWidth="0.5" opacity="0.5" />
        <line x1="368" y1="100" x2="312" y2="104" stroke="url(#v1-gold-stroke)" strokeWidth="0.5" opacity="0.5" />
        <line x1="32" y1="100" x2="88" y2="104" stroke="url(#v1-gold-stroke)" strokeWidth="0.5" opacity="0.5" />
      </svg>
      <div className={`relative ${pad}`}>{children}</div>
    </div>
  );
}
