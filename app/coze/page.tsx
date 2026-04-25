"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";

import { cozeRagModules, type CozeRagModule } from "@/lib/coze-rag-index";

type ModuleFilter = CozeRagModule | "all";

type Source = {
  id: string;
  module: CozeRagModule;
  title: string;
  url: string;
  summary: string;
  excerpt: string;
  score: number;
};

type RagResponse = {
  answer?: string;
  error?: string;
  detail?: string;
  mode?: "rag" | "retrieval-only";
  sources?: Source[];
};

const moduleOptions: Array<{ id: ModuleFilter; label: string; description: string }> = [
  { id: "all", label: "全部", description: "跨 Coze 文档检索。" },
  ...cozeRagModules,
];

const sampleQuestions = [
  "我想把 Coze Agent 接入个人网站，应该选 API 还是 Web SDK？",
  "Coze 工作流适合处理哪些任务？",
  "个人网站里调用 Coze API 时，鉴权应该怎么放？",
  "插件、工作流和知识库分别解决什么问题？",
];

export default function CozeRagPage() {
  const [module, setModule] = useState<ModuleFilter>("all");
  const [question, setQuestion] = useState(sampleQuestions[0]);
  const [answer, setAnswer] = useState("");
  const [sources, setSources] = useState<Source[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");

  const activeModule = useMemo(() => moduleOptions.find((item) => item.id === module), [module]);

  async function askCoze(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    const trimmed = question.trim();
    if (!trimmed) return;

    setStatus("loading");
    setError("");
    setAnswer("");

    try {
      const response = await fetch("/api/coze-rag", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: trimmed, module }),
      });
      const data = (await response.json()) as RagResponse;

      if (!response.ok || data.error) {
        throw new Error(data.error || "请求失败");
      }

      setAnswer(data.answer || "没有生成答案。可以换一种问法试试。稍微拧一下问题，机器就知道往哪看了。");
      setSources(data.sources ?? []);
      setStatus("idle");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "请求失败");
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f4ee] text-[#181714]">
      <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 py-6 sm:px-8 lg:px-10">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#ded7cc] pb-5">
          <div>
            <Link href="/" className="text-sm font-medium text-[#746b5f] transition hover:text-[#181714]">
              返回首页
            </Link>
            <h1 className="mt-3 text-3xl font-semibold tracking-normal text-[#181714] sm:text-4xl">
              Coze RAG 工作台
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6f675f]">
              面向 Coze 文档的检索问答模块。先选择专题，再提问；答案会带上可追溯的官方文档来源。
            </p>
          </div>
          <div className="rounded-md border border-[#d8d0c3] bg-white/70 px-4 py-3 text-sm text-[#5f574e] shadow-sm">
            <div className="font-semibold text-[#181714]">当前模块</div>
            <div>{activeModule?.label}</div>
          </div>
        </header>

        <div className="grid flex-1 gap-6 py-6 lg:grid-cols-[18rem_minmax(0,1fr)]">
          <aside className="space-y-3">
            {moduleOptions.map((item) => {
              const selected = item.id === module;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setModule(item.id)}
                  className={`w-full rounded-md border px-4 py-3 text-left transition ${
                    selected
                      ? "border-[#181714] bg-[#181714] text-white shadow-md"
                      : "border-[#d8d0c3] bg-white/70 text-[#342f29] hover:border-[#9f9486] hover:bg-white"
                  }`}
                >
                  <span className="block text-sm font-semibold">{item.label}</span>
                  <span className={`mt-1 block text-xs leading-5 ${selected ? "text-white/72" : "text-[#746b5f]"}`}>
                    {item.description}
                  </span>
                </button>
              );
            })}
          </aside>

          <section className="grid gap-5 lg:grid-rows-[auto_1fr]">
            <form onSubmit={askCoze} className="rounded-md border border-[#d8d0c3] bg-white p-4 shadow-sm">
              <label htmlFor="coze-question" className="text-sm font-semibold text-[#181714]">
                问一个关于 Coze 的问题
              </label>
              <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                <textarea
                  id="coze-question"
                  value={question}
                  onChange={(event) => setQuestion(event.target.value)}
                  rows={3}
                  className="min-h-24 flex-1 resize-none rounded-md border border-[#d8d0c3] bg-[#fffdf9] px-3 py-3 text-sm leading-6 outline-none transition focus:border-[#181714]"
                />
                <button
                  type="submit"
                  disabled={status === "loading" || !question.trim()}
                  className="rounded-md bg-[#181714] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#3c352e] disabled:cursor-not-allowed disabled:bg-[#b8afa4] sm:w-32"
                >
                  {status === "loading" ? "检索中" : "提问"}
                </button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {sampleQuestions.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setQuestion(item)}
                    className="rounded-md border border-[#ded7cc] bg-[#f7f4ee] px-3 py-2 text-xs text-[#5f574e] transition hover:border-[#9f9486] hover:text-[#181714]"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </form>

            <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_20rem]">
              <article className="min-h-[28rem] rounded-md border border-[#d8d0c3] bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center justify-between gap-3 border-b border-[#ebe5dc] pb-3">
                  <h2 className="text-base font-semibold">回答</h2>
                  <span className="text-xs text-[#746b5f]">RAG + Coze docs</span>
                </div>
                {status === "error" ? <p className="text-sm text-red-700">{error}</p> : null}
                {answer ? (
                  <div className="whitespace-pre-wrap text-sm leading-7 text-[#2f2a24]">{answer}</div>
                ) : (
                  <div className="flex h-64 items-center justify-center text-center text-sm leading-6 text-[#746b5f]">
                    选择模块并提问后，这里会显示答案和引用。
                  </div>
                )}
              </article>

              <aside className="rounded-md border border-[#d8d0c3] bg-white p-5 shadow-sm">
                <h2 className="text-base font-semibold">引用来源</h2>
                <div className="mt-4 space-y-3">
                  {sources.length ? (
                    sources.map((source, index) => (
                      <a
                        key={`${source.id}-${index}`}
                        href={source.url}
                        target="_blank"
                        rel="noreferrer"
                        className="block rounded-md border border-[#ebe5dc] bg-[#fffdf9] p-3 transition hover:border-[#9f9486]"
                      >
                        <span className="text-xs font-semibold text-[#8a5a24]">[{index + 1}] {source.module}</span>
                        <span className="mt-1 block text-sm font-semibold text-[#181714]">{source.title}</span>
                        <span className="mt-1 block text-xs leading-5 text-[#746b5f]">{source.summary}</span>
                      </a>
                    ))
                  ) : (
                    <p className="text-sm leading-6 text-[#746b5f]">还没有引用。提交问题后会在这里列出命中的 Coze 文档。</p>
                  )}
                </div>
              </aside>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
