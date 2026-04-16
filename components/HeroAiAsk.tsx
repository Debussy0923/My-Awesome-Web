"use client";

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";

export default function HeroAiAsk() {
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const requestIdRef = useRef(0);
  const [expanded, setExpanded] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const hasQuestion = Boolean(question.trim());

  const clearFeedback = () => {
    requestIdRef.current += 1;
    setAnswer("");
    setLoading(false);
  };

  const expandInput = () => {
    setExpanded(true);
  };

  const collapseInput = () => {
    setExpanded(false);
    inputRef.current?.blur();
  };

  const handleQuestionChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextQuestion = event.target.value;
    setQuestion(nextQuestion);

    if (!nextQuestion.trim()) {
      clearFeedback();
    }
  };

  useEffect(() => {
    if (!expanded) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      inputRef.current?.focus();
    });

    return () => window.cancelAnimationFrame(frame);
  }, [expanded]);

  useEffect(() => {
    if (!expanded) {
      return;
    }

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (!rootRef.current) {
        return;
      }

      const target = event.target;
      if (target instanceof Node && !rootRef.current.contains(target)) {
        collapseInput();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        collapseInput();
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [expanded]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const safeQuestion = question.trim();
    if (!safeQuestion) {
      expandInput();
      inputRef.current?.focus();
      return;
    }

    collapseInput();
    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;
    setLoading(true);
    setAnswer("");

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: safeQuestion }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const data = (await response.json()) as { answer?: string };
      if (requestIdRef.current === requestId) {
        setAnswer(data.answer || "AI 暂时没有返回内容。");
      }
    } catch {
      if (requestIdRef.current === requestId) {
        setAnswer("AI 服务暂时不可用，请稍后再试。");
      }
    } finally {
      if (requestIdRef.current === requestId) {
        setLoading(false);
      }
    }
  }

  return (
    <div ref={rootRef} className="flex flex-col gap-2">
      <form
        onSubmit={handleSubmit}
        className={`hero-ask-shell ${expanded ? "hero-ask-shell-expanded" : ""}`}
      >
        <button
          type="button"
          onClick={expandInput}
          aria-expanded={expanded}
          aria-label="展开 AI 问答输入"
          className="hero-ask-trigger"
        >
          <span className="hero-ask-badge">AI</span>
          <span
            className={`hero-ask-hairline ${expanded ? "hero-ask-hairline-hidden" : ""}`}
          />
        </button>

        <div className={`hero-ask-entry ${expanded ? "hero-ask-entry-open" : ""}`}>
          <input
            ref={inputRef}
            type="text"
            value={question}
            onChange={handleQuestionChange}
            onFocus={expandInput}
            placeholder="点击这里，输入你的问题..."
            className="hero-ask-input"
          />
          <button type="submit" className="hero-ask-send" disabled={!hasQuestion}>
            {loading ? "思考中" : "发送"}
          </button>
        </div>
      </form>

      {hasQuestion && (loading || answer) && (
        <div className="max-w-[28rem] rounded-2xl border border-white/12 bg-black/20 px-4 py-3 shadow-[0_12px_30px_rgba(0,0,0,0.18)] backdrop-blur-md">
          <p className="text-[0.82rem] leading-6 text-white/78">
            {loading ? "AI 正在整理回答..." : answer}
          </p>
        </div>
      )}
    </div>
  );
}
