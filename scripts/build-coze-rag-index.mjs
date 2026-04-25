import fs from "node:fs";
import path from "node:path";

const sourceDir = process.argv[2];
const outFile = process.argv[3] ?? "lib/coze-rag-index.ts";

if (!sourceDir) {
  console.error("Usage: node scripts/build-coze-rag-index.mjs <coze_docs_dir> [out_file]");
  process.exit(1);
}

const manifestPath = path.join(sourceDir, "manifest.json");
if (!fs.existsSync(manifestPath)) {
  console.error(`Cannot find manifest: ${manifestPath}`);
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

const moduleRules = [
  ["api", /developer_guides\/(authentication|pat|oauth|api|bot|conversation|message|chat|error|variable|workspace|dataset|file)/i],
  ["workflow", /(workflow|chatflow|node|batch|condition|loop|variable_merge|http_node)/i],
  ["plugins", /(plugin|oauth_plugin|oidc|local_plugin|stream_plugin)/i],
  ["knowledge", /(knowledge|dataset|segmentation|scraper|data_source)/i],
  ["publishing", /(publish|channel|web_sdk|discord|telegram|slack|lark|whatsapp|messenger|line|api$)/i],
  ["sdk", /(sdk|python|nodejs|java|go_|web_sdk)/i],
];

function inferModule(url) {
  for (const [module, pattern] of moduleRules) {
    if (pattern.test(url)) return module;
  }
  return "overview";
}

function cleanText(text) {
  return text
    .replace(/\r/g, "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((line) => !["Coze", "Create", "Home", "Development", "Library", "Task Center", "Document Center", "Directory", "unpin"].includes(line))
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function chunkText(text, maxLength = 1800) {
  const paragraphs = text.split(/\n{2,}/).filter(Boolean);
  const chunks = [];
  let current = "";

  for (const paragraph of paragraphs) {
    if ((current + "\n\n" + paragraph).length > maxLength && current) {
      chunks.push(current.trim());
      current = paragraph;
    } else {
      current = current ? `${current}\n\n${paragraph}` : paragraph;
    }
  }

  if (current.trim()) chunks.push(current.trim());
  return chunks.length ? chunks : [text.slice(0, maxLength)];
}

const documents = [];
for (const record of manifest) {
  if (record.status !== "ok" || !record.text_path) continue;
  const textPath = path.join(sourceDir, record.text_path);
  if (!fs.existsSync(textPath)) continue;

  const text = cleanText(fs.readFileSync(textPath, "utf8"));
  if (!text || text.length < 300) continue;

  const chunks = chunkText(text);
  chunks.forEach((chunk, index) => {
    documents.push({
      id: `${record.url.split("/").pop() || "doc"}-${index + 1}`.replace(/[^A-Za-z0-9_-]+/g, "-"),
      module: inferModule(record.url),
      title: `${record.title || record.url}${chunks.length > 1 ? ` (${index + 1})` : ""}`,
      url: record.url,
      summary: chunk.split("\n").slice(0, 2).join(" ").slice(0, 220),
      content: chunk,
    });
  });
}

const modules = [
  { id: "overview", label: "Coze 总览", description: "平台概念、术语、架构和学习路线。" },
  { id: "api", label: "API 助手", description: "鉴权、Bot、会话、消息、Chat 和错误码。" },
  { id: "workflow", label: "工作流", description: "节点、运行、调试、变量和工作流 API。" },
  { id: "plugins", label: "插件", description: "插件创建、导入、本地插件、OAuth 和流式插件。" },
  { id: "knowledge", label: "知识库", description: "知识库类型、分段、数据源和维护。" },
  { id: "publishing", label: "发布集成", description: "渠道、API 发布、Web SDK 和上线管理。" },
  { id: "sdk", label: "SDK 快速开始", description: "Node.js、Python、Java、Go 和 Web SDK。" },
];

const output = `export type CozeRagModule = "overview" | "api" | "workflow" | "plugins" | "knowledge" | "publishing" | "sdk";

export type CozeRagDocument = {
  id: string;
  module: CozeRagModule;
  title: string;
  url: string;
  summary: string;
  content: string;
};

export const cozeRagModules: Array<{ id: CozeRagModule; label: string; description: string }> = ${JSON.stringify(modules, null, 2)};

export const cozeRagDocuments: CozeRagDocument[] = ${JSON.stringify(documents, null, 2)};
`;

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, output, "utf8");
console.log(`Wrote ${documents.length} Coze RAG chunks to ${outFile}`);
