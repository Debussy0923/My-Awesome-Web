import Link from "next/link";

const entries = [
  {
    date: "2026-04-15",
    topic: "RAG 知识库构建",
    tech: ["Vector Database", "LangChain"],
    insight: "理解了召回率对 AI 回答准确性的关键影响。",
  },
  {
    date: "2026-04-12",
    topic: "Tailwind 响应式布局",
    tech: ["Flexbox", "Grid"],
    insight: "通过代码实现了设计稿中的玻璃拟态。",
  },
];

export default function Notes() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#201b17] text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-black/58" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_12%,rgba(177,219,240,0.18),transparent_30%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,_rgba(255,255,255,0.1),_rgba(0,0,0,0.34))]" />

      <section className="relative mx-auto flex min-h-screen max-w-5xl flex-col px-6 py-8 sm:px-10 lg:px-16">
        <Link
          href="/"
          className="w-fit rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm text-white/72 backdrop-blur-md transition hover:border-white/25 hover:bg-white/12 hover:text-white"
        >
          返回首页
        </Link>

        <div className="flex flex-1 items-center py-12">
          <div className="w-full">
            <div className="mb-10 max-w-3xl">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.34em] text-white/45">
                AI Learning Diary
              </p>
              <h1 className="text-4xl font-bold tracking-[0.08em] text-white sm:text-5xl">
                AI 学习日记
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-white/68">
                记录从 API、工程化到界面表达的每一次实验，把学习路径沉淀成可复用的方法。
              </p>
            </div>

            <ol className="relative ml-3 space-y-6 border-l border-white/18 pl-7">
              {entries.map((entry, index) => (
                <li key={entry.date} className="relative">
                  <span className="absolute -left-[2.34rem] top-7 flex h-4 w-4 items-center justify-center rounded-full border border-white/30 bg-white/20 shadow-[0_0_18px_rgba(255,255,255,0.22)] backdrop-blur-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/86" />
                  </span>

                  <article className="rounded-2xl border border-white/20 bg-white/10 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.28)] backdrop-blur-md transition duration-300 hover:border-white/28 hover:bg-white/14 hover:brightness-110 sm:p-6">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-sm font-medium tracking-[0.2em] text-white/45">
                          {entry.date}
                        </p>
                        <h2 className="mt-2 text-2xl font-bold text-white">
                          课题：{entry.topic}
                        </h2>
                      </div>
                      <span className="w-fit rounded-full border border-white/14 bg-black/18 px-3 py-1 text-xs uppercase tracking-[0.16em] text-white/52">
                        Entry 0{index + 1}
                      </span>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {entry.tech.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-white/16 bg-white/10 px-3 py-1.5 text-xs text-white/72"
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    <p className="mt-5 rounded-2xl border border-white/10 bg-black/18 px-4 py-3 text-sm leading-7 text-white/78">
                      心得：{entry.insight}
                    </p>
                  </article>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </main>
  );
}
