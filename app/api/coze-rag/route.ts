import { NextResponse } from "next/server";

import { buildCozeContext, retrieveCozeSources, type CozeRagModule } from "@/lib/coze-rag";

export const runtime = "nodejs";

type RequestBody = {
  question?: string;
  module?: CozeRagModule | "all";
};

function extractResponseText(payload: unknown) {
  if (!payload || typeof payload !== "object") return "";
  const data = payload as {
    output_text?: string;
    output?: Array<{ content?: Array<{ text?: string; type?: string }> }>;
  };

  if (typeof data.output_text === "string") return data.output_text;

  return (
    data.output
      ?.flatMap((item) => item.content ?? [])
      .map((content) => content.text)
      .filter(Boolean)
      .join("\n") ?? ""
  );
}

function fallbackAnswer(question: string, context: string) {
  return [
    "我已经检索了内置的 Coze 文档索引，但当前 Vercel 环境还没有配置 `OPENAI_API_KEY`，所以先返回可参考的检索材料。",
    "",
    `你的问题：${question}`,
    "",
    "最相关材料：",
    context,
  ].join("\n");
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as RequestBody;
  const question = body.question?.trim();
  const selectedModule = body.module ?? "all";

  if (!question) {
    return NextResponse.json({ error: "请输入一个关于 Coze 的问题。" }, { status: 400 });
  }

  const sources = retrieveCozeSources(question, selectedModule, 7);
  const context = buildCozeContext(sources);
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({
      answer: fallbackAnswer(question, context),
      sources,
      mode: "retrieval-only",
    });
  }

  const model = process.env.OPENAI_MODEL || "gpt-5.4-mini";
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      input: [
        {
          role: "system",
          content:
            "你是个人网站里的 Coze RAG 助手。只根据提供的 Coze 文档上下文回答；如果上下文不足，明确说明还需要查看官方文档。回答用中文，结构清楚，给出可操作步骤，并在关键结论后标注引用编号，例如 [1]。不要编造不存在的 Coze 功能。",
        },
        {
          role: "user",
          content: `Coze 文档上下文：\n${context}\n\n用户问题：${question}`,
        },
      ],
      max_output_tokens: 900,
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    return NextResponse.json(
      {
        error: "OpenAI API 调用失败，请检查 Vercel 环境变量和模型权限。",
        detail,
        sources,
      },
      { status: 502 },
    );
  }

  const payload = await response.json();
  const answer = extractResponseText(payload).trim();

  return NextResponse.json({
    answer: answer || fallbackAnswer(question, context),
    sources,
    mode: "rag",
  });
}
