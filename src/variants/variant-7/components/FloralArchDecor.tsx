"use client";

const FLOWERS = [
  { id: 0, char: "✿", left: "5%", top: "8%", delay: 0, size: "text-2xl", color: "text-[#F8BBD0]" },
  { id: 1, char: "❀", left: "88%", top: "12%", delay: 0.5, size: "text-xl", color: "text-[#E8CFC0]" },
  { id: 2, char: "✾", left: "2%", top: "35%", delay: 1, size: "text-lg", color: "text-[#C9A087]/70" },
  { id: 3, char: "✿", left: "92%", top: "30%", delay: 1.2, size: "text-2xl", color: "text-[#F8BBD0]" },
  { id: 4, char: "❁", left: "12%", top: "5%", delay: 0.8, size: "text-sm", color: "text-[#E8CFC0]" },
  { id: 5, char: "✿", left: "78%", top: "6%", delay: 0.3, size: "text-lg", color: "text-[#F8BBD0]" },
];

export default function FloralArchDecor() {
  return (
    <>
      {FLOWERS.map((f) => (
        <span
          key={f.id}
          className={`v7-petal v7-petal-float ${f.size} ${f.color}`}
          style={{
            left: f.left,
            top: f.top,
            animationDelay: `${f.delay}s`,
          }}
          aria-hidden
        >
          {f.char}
        </span>
      ))}
    </>
  );
}
