import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { question } = await req.json();
  const safeQuestion =
    typeof question === "string" && question.trim().length > 0
      ? question.trim()
      : "未提供问题";

  return NextResponse.json({
    answer: `你问的是：${safeQuestion}。这里是 AI 的示例回答。`,
  });
}
