export default function AtlasBackground() {
  return (
    <div className="v5-atlas-bg pointer-events-none fixed inset-0 z-0" aria-hidden>
      <div className="absolute inset-0 bg-gradient-to-b from-[#FDFBF7] via-transparent to-[#FDFBF7]/90" />
      <div className="absolute left-1/4 top-1/3 h-80 w-80 rounded-full bg-[#8A9A5B]/6 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-[#C9A087]/8 blur-3xl" />
    </div>
  );
}
