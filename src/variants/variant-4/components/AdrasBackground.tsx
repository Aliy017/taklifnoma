export default function AdrasBackground() {
  return (
    <div className="v4-adras-bg pointer-events-none fixed inset-0 z-0" aria-hidden>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A192F] via-transparent to-[#0A192F]" />
      <div className="absolute left-1/2 top-1/4 h-96 w-96 -translate-x-1/2 rounded-full bg-[#D4AF37]/5 blur-3xl" />
      <div className="absolute bottom-1/4 right-0 h-72 w-72 rounded-full bg-[#D4AF37]/4 blur-3xl" />
    </div>
  );
}
