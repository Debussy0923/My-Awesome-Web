import { cozeRagDocuments, type CozeRagDocument, type CozeRagModule } from "./coze-rag-index";

export type CozeRagSource = Pick<CozeRagDocument, "id" | "module" | "title" | "url" | "summary"> & {
  score: number;
  excerpt: string;
};

const STOP_WORDS = new Set([
  "the",
  "and",
  "for",
  "with",
  "that",
  "this",
  "from",
  "what",
  "how",
  "are",
  "can",
  "you",
  "我",
  "你",
  "的",
  "了",
  "和",
  "是",
  "在",
  "怎么",
  "如何",
  "一个",
  "一下",
]);

function tokenize(value: string) {
  const normalized = value.toLowerCase();
  const english = normalized.match(/[a-z0-9_/-]{2,}/g) ?? [];
  const chinese = normalized.match(/[\u4e00-\u9fa5]{2,}/g) ?? [];
  return [...english, ...chinese].filter((token) => !STOP_WORDS.has(token));
}

function countMatches(haystack: string, token: string) {
  if (!token) return 0;
  let count = 0;
  let index = haystack.indexOf(token);
  while (index !== -1) {
    count += 1;
    index = haystack.indexOf(token, index + token.length);
  }
  return count;
}

function scoreDocument(document: CozeRagDocument, tokens: string[]) {
  const title = document.title.toLowerCase();
  const summary = document.summary.toLowerCase();
  const content = document.content.toLowerCase();

  return tokens.reduce((score, token) => {
    return (
      score +
      countMatches(title, token) * 8 +
      countMatches(summary, token) * 5 +
      countMatches(content, token) * 2
    );
  }, 0);
}

function excerptFor(document: CozeRagDocument, tokens: string[]) {
  const content = document.content;
  const lower = content.toLowerCase();
  const firstHit = tokens
    .map((token) => lower.indexOf(token))
    .filter((index) => index >= 0)
    .sort((a, b) => a - b)[0];

  const start = Math.max(0, (firstHit ?? 0) - 120);
  const excerpt = content.slice(start, start + 520).trim();
  return `${start > 0 ? "..." : ""}${excerpt}${start + 520 < content.length ? "..." : ""}`;
}

export function retrieveCozeSources(question: string, module: CozeRagModule | "all" = "all", limit = 6) {
  const tokens = tokenize(question);
  const scopedDocuments = module === "all" ? cozeRagDocuments : cozeRagDocuments.filter((item) => item.module === module);
  const scored = scopedDocuments
    .map((document) => ({ document, score: scoreDocument(document, tokens) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  const fallback = scopedDocuments.slice(0, Math.min(limit, scopedDocuments.length)).map((document) => ({
    document,
    score: 1,
  }));

  return (scored.length ? scored : fallback).map(({ document, score }) => ({
    id: document.id,
    module: document.module,
    title: document.title,
    url: document.url,
    summary: document.summary,
    score,
    excerpt: excerptFor(document, tokens),
  }));
}

export function buildCozeContext(sources: CozeRagSource[]) {
  return sources
    .map(
      (source, index) =>
        `[${index + 1}] ${source.title}\nModule: ${source.module}\nURL: ${source.url}\nSummary: ${source.summary}\nExcerpt: ${source.excerpt}`,
    )
    .join("\n\n");
}

export type { CozeRagModule };
