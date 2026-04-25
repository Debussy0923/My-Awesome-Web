import Link from "next/link";

import HeroAiAsk from "../components/HeroAiAsk";

function TurnSign({ direction }: { direction: "left" | "right" }) {
  const turn =
    direction === "left" ? (
      <>
        <path
          d="M32 39 V22 H19"
          fill="none"
          stroke="#ffffff"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M24 16 L18 22 L24 28"
          fill="none"
          stroke="#ffffff"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ) : (
      <>
        <path
          d="M24 39 V22 H37"
          fill="none"
          stroke="#ffffff"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M32 16 L38 22 L32 28"
          fill="none"
          stroke="#ffffff"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    );

  return (
    <span
      className="turn-sign-shell shrink-0 transition duration-300 group-hover:-translate-y-0.5 group-hover:scale-105"
      aria-hidden="true"
    >
      <svg viewBox="0 0 56 56" className="turn-sign-svg h-7 w-7">
        <circle
          cx="28"
          cy="28"
          r="24"
          fill="#5d7683"
          stroke="rgba(232,241,246,0.72)"
          strokeWidth="2"
        />
        {turn}
      </svg>
    </span>
  );
}

type RouteNavProps = {
  href: string;
  title: string;
  subtitle?: string;
  direction: "left" | "right";
  side: "left" | "right";
  className: string;
};

function RouteNav({
  href,
  title,
  subtitle,
  direction,
  side,
  className,
}: RouteNavProps) {
  const isLeft = side === "left";

  return (
    <div className={className}>
      <Link
        href={href}
        className={`route-nav route-nav-${side} group relative block h-[5.7rem] w-[11.9rem] rounded-[1.3rem] px-4 py-4 sm:h-[6rem] sm:w-[13.2rem]`}
      >
        <div className="route-nav-panel pointer-events-none absolute inset-0 rounded-[inherit]" />
        <div className="route-nav-reading-aid pointer-events-none absolute inset-x-3 bottom-2 h-14 rounded-[1rem]" />
        <div className="route-nav-line pointer-events-none absolute inset-x-4 top-3 h-px rounded-full" />

        <div
          className={`relative flex h-full items-center gap-3 ${
            isLeft ? "" : "flex-row-reverse"
          }`}
        >
          <TurnSign direction={direction} />

          <div
            className={`flex flex-col ${
              isLeft ? "items-start text-left" : "items-end text-right"
            }`}
          >
            <span className="route-nav-title route-nav-title-compact">{title}</span>
            {subtitle ? <span className="route-nav-subtitle">{subtitle}</span> : null}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function Home() {
  return (
    <main className="homepage-shell relative min-h-screen overflow-hidden bg-[#201b17] text-white">
      <div
        className="hero-scene absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-black/42" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,213,150,0.2),transparent_32%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_38%,rgba(0,0,0,0.18)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,_rgba(255,255,255,0.12),_rgba(0,0,0,0.22))]" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="sun-haze absolute inset-0 bg-[radial-gradient(circle_at_50%_2%,rgba(255,226,184,0.18),transparent_30%)]" />
        <div className="dust-layer absolute inset-[-8%]" />
        <div className="dust-layer-slow absolute inset-[-10%]" />
        <div className="dust-layer-near absolute inset-[-14%]" />
        <div className="wind-streaks absolute inset-[-8%]" />
      </div>

      <section className="relative flex min-h-screen flex-col px-6 py-10 sm:px-10 lg:px-16">
        <div className="flex w-fit flex-col items-start gap-4">
          <HeroAiAsk />
          <Link
            href="/coze"
            className="rounded-full border border-white/[0.14] bg-white/[0.07] px-4 py-2 text-xs font-semibold text-white/[0.82] shadow-[0_12px_34px_rgba(0,0,0,0.22)] backdrop-blur transition hover:border-white/[0.24] hover:bg-white/10 hover:text-white"
          >
            Coze RAG
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="flex flex-col items-center text-center">
            <div className="relative flex h-[22rem] w-[18rem] flex-col items-center justify-end sm:h-[28rem] sm:w-[24rem] lg:h-[32rem] lg:w-[30rem]">
              <RouteNav
                href="/profile"
                title="个人名片"
                subtitle="DEBUSSY"
                direction="left"
                side="left"
                className="route-nav-float-left absolute left-[0.15rem] top-[8.95rem] z-10 sm:left-[-0.85rem] sm:top-[10.65rem] lg:left-[-1.45rem] lg:top-[12.05rem]"
              />

              <RouteNav
                href="/notes"
                title="AI学习日记"
                direction="right"
                side="right"
                className="route-nav-float-right absolute right-[0.15rem] top-[12.35rem] z-10 sm:right-[-0.85rem] sm:top-[11.25rem] lg:right-[-1.45rem] lg:top-[12.55rem]"
              />

              <div className="road-focus-glow pointer-events-none absolute inset-x-[10%] top-[56%] h-28 rounded-full bg-[radial-gradient(circle,rgba(255,241,214,0.07),rgba(255,255,255,0.012)_46%,transparent_76%)] blur-3xl sm:inset-x-[16%] sm:top-[54%] sm:h-32 lg:inset-x-[20%] lg:top-[56%] lg:h-36" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
