export default function RingsIcon({ className = "" }: { className?: string }) {
  const ringLen = 82;

  return (
    <svg
      className={className}
      viewBox="0 0 64 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle
        className="v11-ring-stroke"
        cx="24"
        cy="22"
        r="13"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeDasharray={ringLen}
        strokeDashoffset={ringLen}
        opacity="0.9"
      />
      <circle
        className="v11-ring-stroke"
        cx="40"
        cy="22"
        r="13"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeDasharray={ringLen}
        strokeDashoffset={ringLen}
        opacity="0.9"
      />
      <path
        className="v11-ring-stroke"
        d="M31 14.5c2.2-2.8 5.8-4.5 9.5-4.2 4.8.4 8.6 4.2 9 9 .2 2.4-.4 4.6-1.6 6.4"
        stroke="currentColor"
        strokeWidth="0.9"
        opacity="0.55"
        strokeLinecap="round"
        strokeDasharray={40}
        strokeDashoffset={40}
      />
      <path
        className="v11-ring-stroke"
        d="M33 25.5c-2.2 2.8-5.8 4.5-9.5 4.2-4.8-.4-8.6-4.2-9-9-.2-2.4.4-4.6 1.6-6.4"
        stroke="currentColor"
        strokeWidth="0.9"
        opacity="0.55"
        strokeLinecap="round"
        strokeDasharray={40}
        strokeDashoffset={40}
      />
    </svg>
  );
}
