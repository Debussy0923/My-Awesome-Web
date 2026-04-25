export type CozeRagModule = "overview" | "api" | "workflow" | "plugins" | "knowledge" | "publishing" | "sdk";

export type CozeRagDocument = {
  id: string;
  module: CozeRagModule;
  title: string;
  url: string;
  summary: string;
  content: string;
};

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

export const cozeRagDocuments: CozeRagDocument[] = [
  {
    id: "coze-overview",
    module: "overview",
    title: "What is Coze",
    url: "https://www.coze.com/open/docs/guides/welcome",
    summary: "Coze 是用于构建 AI Agent、工作流、插件、知识库和多渠道发布的智能体平台。",
    content:
      "Coze is an AI agent development platform. A practical Coze project usually combines an agent or app, prompts, model configuration, tools or plugins, workflows, knowledge bases, variables, databases, and publish channels. The platform separates building, testing, publishing, and analytics so builders can iterate on an agent before exposing it through channels or API. Important concepts include bot, app/project, workflow, chatflow, plugin, knowledge base, variable, database, connector, channel, and workspace.",
  },
  {
    id: "coze-architecture",
    module: "overview",
    title: "Architecture and key terminology",
    url: "https://www.coze.com/open/docs/guides/architecture",
    summary: "Coze 的能力可以按模型、提示词、工具、工作流、知识、记忆和发布层来理解。",
    content:
      "A Coze agent can be understood as a composition of orchestration, model behavior, tool use, workflow execution, knowledge retrieval, memory or variables, and channel delivery. The builder configures prompts and model behavior, attaches plugins and workflows for deterministic capability, connects knowledge bases for retrieval, and publishes the result to supported channels or APIs. This layered view is useful when diagnosing whether an issue belongs to prompt design, tool authorization, workflow input/output, retrieval quality, or channel configuration.",
  },
  {
    id: "coze-api-overview",
    module: "api",
    title: "API overview",
    url: "https://www.coze.com/open/docs/developer_guides/coze_api_overview",
    summary: "Coze Open API 覆盖鉴权、智能体、会话、消息、Chat、工作流、文件、知识库和变量等资源。",
    content:
      "The Coze API and SDK area provides API reference and guides for authentication, personal access tokens, OAuth flows, bot management, conversations, messages, chat, workflow run and stream run, file upload and retrieval, dataset or knowledge operations, variables, error codes, SDKs, and Web SDK. A typical API integration first prepares an access token, chooses the target resource such as bot_id or workflow_id, calls the corresponding endpoint, and handles structured errors and streaming output when supported.",
  },
  {
    id: "coze-authentication",
    module: "api",
    title: "Authentication method",
    url: "https://www.coze.com/open/docs/developer_guides/authentication",
    summary: "Coze API 支持个人访问令牌和多种 OAuth/JWT 授权方式。",
    content:
      "Coze API requests require authorization. For personal or server-side experiments, a Personal Access Token is the simplest path. For production apps and multi-user integrations, OAuth authorization code, PKCE, device code, JWT developer authorization, channel authorization, or collaboration authorization may be more appropriate. Tokens should stay on the server side, never in browser JavaScript. When building a website integration, put the Coze token in Vercel environment variables and proxy requests through Next.js route handlers.",
  },
  {
    id: "coze-chat-api",
    module: "api",
    title: "Chat API",
    url: "https://www.coze.com/open/docs/developer_guides/chat_v3",
    summary: "Chat API 用于发起智能体对话，可结合 conversation 和 message API 管理上下文。",
    content:
      "The Chat API is used to send user input to a Coze bot and receive assistant responses. It commonly works together with conversation APIs and message APIs. For session isolation, maintain distinct conversation identifiers per user or use case. Streaming chat is useful for responsive UI, while non-streaming chat is simpler for server-side tasks. A robust integration validates user input, maps user identity to conversation context, submits messages, handles tool calls or workflow outputs if exposed by the bot, and surfaces errors with retry guidance.",
  },
  {
    id: "coze-error-codes",
    module: "api",
    title: "Error codes and troubleshooting",
    url: "https://www.coze.com/open/docs/developer_guides/coze_error_codes",
    summary: "API 集成应把鉴权、参数、限流、资源权限和会话隔离错误分开处理。",
    content:
      "Coze API troubleshooting should distinguish authentication failure, missing permissions, invalid resource identifiers, bad request parameters, rate limits, unavailable models or channels, and session or conversation state issues. Store enough request metadata to reproduce failures, but avoid logging secrets. For a public website, return user-friendly messages while keeping detailed diagnostics server-side.",
  },
  {
    id: "workflow-overview",
    module: "workflow",
    title: "Workflow overview",
    url: "https://www.coze.com/open/docs/guides/workflow",
    summary: "工作流把复杂任务拆成节点，用输入输出、变量和条件组织可靠执行。",
    content:
      "Coze workflows are structured processes made of nodes. They are useful when an agent must run deterministic or multi-step logic: call an LLM, invoke plugins, branch on conditions, loop over items, merge variables, call HTTP APIs, query or update databases, write knowledge, process text, generate images, or return messages. Workflows are easier to test when each node has clear inputs and outputs and when variable names remain consistent across branches.",
  },
  {
    id: "workflow-nodes",
    module: "workflow",
    title: "Workflow nodes",
    url: "https://www.coze.com/open/docs/guides/llm_node",
    summary: "常见节点包括 LLM、插件、工作流、变量、代码、条件、循环、消息、数据库和知识库节点。",
    content:
      "Important workflow nodes include start and end nodes, LLM nodes, plugin nodes, workflow nodes, variable nodes, code nodes, condition nodes, intent recognition nodes, loop nodes, variable merge nodes, batch nodes, message nodes, input nodes, database SQL/insert/select/update/delete nodes, variable assignment nodes, knowledge base writing nodes, knowledge nodes, image generation nodes, canvas nodes, HTTP nodes, question nodes, and text processing nodes. Pick the node by responsibility, not by convenience: retrieval belongs in knowledge nodes, external API calls in plugins or HTTP nodes, and orchestration in workflow structure.",
  },
  {
    id: "workflow-api-run",
    module: "workflow",
    title: "Run workflow API",
    url: "https://www.coze.com/open/docs/developer_guides/workflow_run",
    summary: "工作流可通过 API 运行，适合把 Coze 能力嵌入网站后端流程。",
    content:
      "The workflow run API lets an external application execute a Coze workflow with supplied input parameters. This is useful when a website wants Coze to perform a specific backend task instead of a free-form chat. The integration should know the workflow identifier, required inputs, expected output schema, timeout behavior, and whether streaming or resume is needed. Validate inputs before sending them and normalize outputs before rendering them on the site.",
  },
  {
    id: "plugin-overview",
    module: "plugins",
    title: "Plugin overview",
    url: "https://www.coze.com/open/docs/guides/plugin",
    summary: "插件把外部 API、工具和服务接入 Coze Agent 或工作流。",
    content:
      "Coze plugins extend agents and workflows with external capabilities. A plugin can wrap an existing API service, be imported from an OpenAPI-like description, be developed in the plugin IDE, or be implemented as a local plugin depending on the platform feature. Good plugin design starts from stable tool boundaries: a clear name, concise description, typed parameters, predictable output, authorization model, and error handling. Agents select plugins more reliably when each tool has one clear purpose.",
  },
  {
    id: "plugin-oauth",
    module: "plugins",
    title: "OAuth and OIDC plugins",
    url: "https://www.coze.com/open/docs/guides/oauth_plugin",
    summary: "需要用户授权的外部服务应通过 OAuth/OIDC 插件模式接入。",
    content:
      "OAuth and OIDC plugins are appropriate when a tool must access user-specific resources in an external service. The integration must define authorization endpoints, token exchange, scopes, callback behavior, and token refresh expectations. For website-side RAG modules, keep user-facing search separate from privileged plugin actions unless the user explicitly authorizes the action.",
  },
  {
    id: "local-plugin",
    module: "plugins",
    title: "Local plugin overview",
    url: "https://www.coze.com/open/docs/guides/local_plugin_overview",
    summary: "本地插件适合开发、测试或将自定义工具接入 Coze 工作流。",
    content:
      "Local plugins help builders test custom tool behavior before relying on it in an agent or workflow. When a plugin calls a private API, design its schema and errors carefully, and avoid leaking private tokens or raw service errors to end users. For a personal website, a local or private plugin can expose curated operations such as searching your Coze archive, generating a learning path, or invoking a workflow.",
  },
  {
    id: "knowledge-overview",
    module: "knowledge",
    title: "Knowledge base overview",
    url: "https://www.coze.com/open/docs/guides/knowledge_overview",
    summary: "知识库为 Agent 提供检索增强能力，适合文档、表格、图片等知识源。",
    content:
      "Coze knowledge bases provide retrieval capability for agents. Knowledge can come from text documents, tables, images, or maintained data sources. Retrieval quality depends on source quality, segmentation, metadata, permissions, update cadence, and how prompts ask the model to use retrieved context. For Coze documentation RAG, keep each chunk linked to its original page and show citations so users can verify answers.",
  },
  {
    id: "knowledge-segmentation",
    module: "knowledge",
    title: "Knowledge base segmentation",
    url: "https://www.coze.com/open/docs/guides/knowledge_base_segmentation",
    summary: "分段影响召回质量；每段应围绕一个主题并保留来源。",
    content:
      "Knowledge segmentation should produce chunks that are large enough to preserve meaning and small enough to retrieve precisely. For documentation, chunk by section heading when possible. Keep metadata such as page title, source URL, module, updated time, and local path. Avoid mixing unrelated pages in one chunk. If answers are vague, inspect whether the retrieved chunks are too broad, too short, or missing the exact API term users ask about.",
  },
  {
    id: "publish-api",
    module: "publishing",
    title: "Publish app as API",
    url: "https://www.coze.com/open/docs/guides/publish_api",
    summary: "Coze 应用可以通过 API 方式发布，便于网站或后端服务调用。",
    content:
      "Publishing a Coze app as an API lets external systems call the app programmatically. This is useful for a personal website that wants to expose a Coze-powered assistant without embedding the entire builder UI. Before publishing, verify the app configuration, input expectations, permission model, channel status, and whether the target users should share a bot or use isolated sessions. Keep API credentials in server environment variables.",
  },
  {
    id: "publish-channels",
    module: "publishing",
    title: "Publish channels and integration",
    url: "https://www.coze.com/open/docs/guides/publish_overview",
    summary: "发布渠道包括 Web SDK、API、Discord、Telegram、Slack、Lark、WhatsApp 等。",
    content:
      "Coze supports publishing agents and apps to different channels. Channel choice affects authentication, message format, callback configuration, session identity, and user experience. A personal website usually starts with API or Web SDK publishing. Messaging channels such as Discord, Telegram, Slack, Lark, LINE, Messenger, Instagram, Reddit, WhatsApp, and custom channels require channel-specific setup and testing.",
  },
  {
    id: "web-sdk-overview",
    module: "sdk",
    title: "Chat SDK overview",
    url: "https://www.coze.com/open/docs/developer_guides/web_sdk_overview",
    summary: "Web SDK 适合把 Coze 对话体验嵌入网页。",
    content:
      "The Coze Web SDK helps embed chat experiences in web pages. Use it when you want visitors to interact with a Coze bot directly from your website. For a custom RAG interface, a server-side route may be better because it controls retrieval, citations, prompts, and rate limits. Web SDK is best when the Coze bot itself owns the conversation experience.",
  },
  {
    id: "node-sdk",
    module: "sdk",
    title: "Node.js SDK quick start",
    url: "https://www.coze.com/open/docs/developer_guides/nodejs_getting_started",
    summary: "Node.js SDK 适合在 Next.js 服务端封装 Coze API 调用。",
    content:
      "The Node.js SDK quick start is relevant for Next.js server routes, background jobs, or scripts that call Coze APIs. Keep SDK calls on the server, load tokens from environment variables, validate incoming request payloads, and return normalized data to client components. When deploying on Vercel, configure secrets in Project Settings rather than committing them to GitHub.",
  },
  {
    id: "python-sdk",
    module: "sdk",
    title: "Python SDK quick start",
    url: "https://www.coze.com/open/docs/developer_guides/python_getting_started",
    summary: "Python SDK 适合离线索引、批处理和文档预处理脚本。",
    content:
      "The Python SDK quick start is useful for scripts that prepare data, batch process documents, or test Coze API workflows outside the website. For RAG indexing, Python is often convenient for reading local text files, splitting chunks, generating embeddings, and uploading vectors to a database. The generated index can then be consumed by a Next.js frontend.",
  },
];
