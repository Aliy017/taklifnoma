interface LuxuryFrameProps {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "hero";
}

export default function LuxuryFrame({ children, className = "", size = "md" }: LuxuryFrameProps) {
  const pad =
    size === "sm"
      ? "p-6 sm:p-8"
      : size === "hero"
        ? "p-10 sm:p-14 md:p-16"
        : size === "lg"
          ? "p-8 sm:p-12"
          : "p-7 sm:p-10";

  const panelClass = size === "hero" ? "v1-frame-panel v1-frame-panel--hero" : "v1-frame-panel";

  return (
    <div className={`relative mx-auto ${className}`}>
      <div className={`${panelClass} ${pad}`}>
        {size === "hero" && (
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 400 400"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden
          >
            <defs>
              <linearGradient id="v1-hero-gold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f0d78c" />
                <stop offset="35%" stopColor="#d4af37" />
                <stop offset="70%" stopColor="#a68b3c" />
                <stop offset="100%" stopColor="#f5e6b8" />
              </linearGradient>
            </defs>
            <polygon
              points="200,12 358,92 358,308 200,388 42,308 42,92"
              fill="none"
              stroke="url(#v1-hero-gold)"
              strokeWidth="1.2"
              opacity="0.62"
            />
            <polygon
              points="200,28 332,96 332,304 200,372 68,304 68,96"
              fill="none"
              stroke="url(#v1-hero-gold)"
              strokeWidth="0.7"
              opacity="0.32"
            />
          </svg>
        )}
        <div className="relative z-[1]">{children}</div>
      </div>
    </div>
  );
}
