export type CozeRagModule = "overview" | "api" | "workflow" | "plugins" | "knowledge" | "publishing" | "sdk";

export const cozeRagModules: Array<{ id: CozeRagModule; label: string; description: string }> = [
  {
    id: "overview",
    label: "Coze 总览",
    description: "平台概念、术语、架构和学习路线。",
  },
  {
    id: "api",
    label: "API 助手",
    description: "鉴权、Bot、会话、消息、Chat 和错误码。",
  },
  {
    id: "workflow",
    label: "工作流",
    description: "节点、运行、调试、变量和工作流 API。",
  },
  {
    id: "plugins",
    label: "插件",
    description: "插件创建、导入、本地插件、OAuth 和流式插件。",
  },
  {
    id: "knowledge",
    label: "知识库",
    description: "知识库类型、分段、数据源和维护。",
  },
  {
    id: "publishing",
    label: "发布集成",
    description: "渠道、API 发布、Web SDK 和上线管理。",
  },
  {
    id: "sdk",
    label: "SDK 快速开始",
    description: "Node.js、Python、Java、Go 和 Web SDK。",
  },
];
