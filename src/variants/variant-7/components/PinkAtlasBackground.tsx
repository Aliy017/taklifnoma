export default function PinkAtlasBackground() {
  return (
    <div className="v7-atlas-bg pointer-events-none fixed inset-0 z-0" aria-hidden>
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFF5F7] via-transparent to-[#FFF5F7]/90" />
      <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-[#F8BBD0]/15 blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 h-80 w-80 rounded-full bg-[#C9A087]/10 blur-3xl" />
    </div>
  );
}
