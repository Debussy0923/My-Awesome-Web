import Link from "next/link";

const skills = ["Supply Chain", "CAD/CAM", "Python", "AI API"];

function GitHubIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 19c-4 1.2-4-2-5.6-2.4" />
      <path d="M15 22v-3.4a3 3 0 0 0-.8-2.3c2.7-.3 5.6-1.3 5.6-6A4.7 4.7 0 0 0 18.5 7c.1-.3.5-1.6-.2-3.2 0 0-1.1-.3-3.3 1.3a11.5 11.5 0 0 0-6 0C6.8 3.5 5.7 3.8 5.7 3.8 5 5.4 5.4 6.7 5.5 7a4.7 4.7 0 0 0-1.3 3.3c0 4.6 2.8 5.7 5.5 6a3 3 0 0 0-.8 2.3V22" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
      <path d="m5 8 7 5 7-5" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.5 10v7.5" />
      <path d="M7.5 6.5v.1" />
      <path d="M12 17.5v-4.2a3 3 0 0 1 6 0v4.2" />
      <path d="M12 10v7.5" />
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
    </svg>
  );
}

export default function Profile() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#201b17] text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_8%,rgba(255,226,184,0.18),transparent_32%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,_rgba(255,255,255,0.1),_rgba(0,0,0,0.32))]" />

      <section className="relative mx-auto flex min-h-screen max-w-5xl flex-col px-6 py-8 sm:px-10 lg:px-16">
        <Link
          href="/"
          className="w-fit rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm text-white/72 backdrop-blur-md transition hover:border-white/25 hover:bg-white/12 hover:text-white"
        >
          返回首页
        </Link>

        <div className="flex flex-1 items-center justify-center py-12">
          <article className="w-full max-w-3xl rounded-2xl border border-white/20 bg-white/10 p-7 shadow-[0_24px_80px_rgba(0,0,0,0.32)] backdrop-blur-md transition hover:bg-white/12 sm:p-10">
            <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.34em] text-white/45">
                  Personal Profile
                </p>
                <h1 className="text-4xl font-bold tracking-[0.16em] text-white sm:text-5xl">
                  Debussy
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-white/72 sm:text-lg">
                  Pre-sales / 数字化转型专家 / Python 开发者
                </p>
              </div>

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/18 bg-white/10 text-xl font-bold tracking-[0.18em] text-white/82 shadow-[0_16px_36px_rgba(0,0,0,0.22)]">
                DB
              </div>
            </div>

            <p className="rounded-2xl border border-white/12 bg-black/18 px-5 py-4 text-lg leading-8 text-white/82">
              连接技术与业务，把复杂系统转化为可落地的增长方案。
            </p>

            <div className="mt-8">
              <h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-white/48">
                Tech Stack
              </h2>
              <div className="mt-4 flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-white/18 bg-white/10 px-4 py-2 text-sm text-white/78 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-md"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-between gap-5 border-t border-white/12 pt-6">
              <p className="text-sm text-white/45">Open to technical storytelling.</p>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/"
                  aria-label="GitHub"
                  className="rounded-full border border-white/15 bg-white/8 p-3 text-white/70 transition hover:border-white/28 hover:bg-white/14 hover:text-white"
                >
                  <GitHubIcon />
                </a>
                <a
                  href="mailto:debussy@example.com"
                  aria-label="Email"
                  className="rounded-full border border-white/15 bg-white/8 p-3 text-white/70 transition hover:border-white/28 hover:bg-white/14 hover:text-white"
                >
                  <EmailIcon />
                </a>
                <a
                  href="https://www.linkedin.com/"
                  aria-label="LinkedIn"
                  className="rounded-full border border-white/15 bg-white/8 p-3 text-white/70 transition hover:border-white/28 hover:bg-white/14 hover:text-white"
                >
                  <LinkedInIcon />
                </a>
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
