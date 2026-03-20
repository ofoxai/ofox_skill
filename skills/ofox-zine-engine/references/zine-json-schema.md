# Zine JSON Schema 完整参考

## 顶层结构

```json
{
  "theme": "zine",
  "pages": [
    { "type": "cover", "data": { ... } },
    { "type": "intro", "data": { ... } },
    { "type": "points", "data": { ... } },
    { "type": "insight", "data": { ... } },
    { "type": "quote", "data": { ... } },
    { "type": "end", "data": { ... } }
  ]
}
```

---

## cover（封面）

```json
{ "type": "cover", "data": {
  "tag": "标签",
  "tags": ["标签1", "标签2"],
  "title": "主标题",
  "subtitle": "副标题 · 来源",
  "starBadge": "23.5k",
  "keywords": ["kw1", "kw2", "kw3", "kw4"],
  "logos": [{ "name": "名称", "url": "../../../../assets/logos/xxx-color.png" }],
  "comic": [
    { "panel": "第一格场景" },
    { "panel": "第二格场景" },
    { "panel": "第三格场景" }
  ],
  "stats": [
    { "number": "23.5k", "label": "Stars" },
    { "number": "500+", "label": "贡献者" }
  ]
}}
```

- `tags`（数组）优先于 `tag`（字符串）
- `comic` 和 `stats` 可二选一或都有
- `logos` 必须是对象数组，不能是字符串数组

---

## intro（对话页）

```json
{ "type": "intro", "data": {
  "tag": "背景",
  "question": "问题标题",
  "answer": "场景描述（50-100字）",
  "flowChart": {
    "title": "对比标题",
    "oldLabel": "传统方式",
    "oldSteps": ["步骤1", "步骤2", "步骤3"],
    "newLabel": "新方案",
    "newSteps": ["步骤1", "步骤2", "步骤3"]
  }
}}
```

**注意：**
- 字段是 `question`/`answer`（不是 title/body）
- flowChart 字段是 `oldLabel`/`newLabel`（不是 left/right）
- flowChart 步骤字数保持对齐

---

## points（剪报页）

```json
{ "type": "points", "data": {
  "variant": "list",
  "label": "核心功能",
  "count": 4,
  "items": [
    { "icon": "🔥", "title": "标题≤8字", "desc": "描述≤22字" }
  ]
}}
```

安全上限：≤4条（5条需压缩）

---

## insight（深度拆解）

```json
{ "type": "insight", "data": {
  "tag": "洞察",
  "core": "核心判断一句话",
  "details": [
    { "bold": "标签", "text": "说明≤20字" }
  ],
  "tip": "留空或≤15字",
  "comparison": {
    "before": { "icon": "😰", "label": "传统", "traits": ["慢", "贵"] },
    "after": { "icon": "🚀", "label": "新方案", "traits": ["快", "省"] }
  }
}}
```

**注意：**
- 核心句字段是 `core`（不是 title/body）
- `details` 必须是 `{bold, text}` 对象数组（不是字符串数组）
- 有3个 details 就不加 tip

---

## quote（引用页）

```json
{ "type": "quote", "data": {
  "tag": "金句",
  "text": "引文≤3行",
  "source": "来源",
  "note": "补充≤80字",
  "bullets": ["论据1", "论据2"],
  "annotation": "手写批注（zine专用）"
}}
```

---

## end（尾页）

```json
{ "type": "end", "data": {
  "takeaway": {
    "title": "行动清单",
    "codeStyle": true,
    "items": [
      { "text": "npm install xxx", "note": "安装" }
    ],
    "verifyCommands": ["验证命令"],
    "links": [{ "label": "显示名", "url": "链接" }]
  },
  "footer": {
    "cta": "你会用它做什么？评论区聊聊",
    "slogan": "ofox.ai 你的AI伙伴"
  }
}}
```

**注意：** 所有字段嵌套在 `takeaway`/`footer` 内，不放顶层 data 下。

---

## 常见致命错误

| 错误写法 | 正确写法 | 涉及组件 |
|----------|----------|----------|
| `title`/`body` | `question`/`answer` | intro |
| `details: ["文字"]` | `details: [{bold, text}]` | insight |
| `body`/`title` 当核心句 | `core` | insight |
| 顶层 `codeStyle`/`items` | 嵌套在 `takeaway: {...}` 内 | end |
| `logos: ["name"]` | `logos: [{name, url}]` | cover |

---

## 文案 → JSON 映射

### A版（洞察向）

| 文案段落 | JSON 字段 |
|---------|----------|
| 标题/Hook | cover.title |
| 「发生了什么」 | intro.answer |
| 核心要点列表 | points.items |
| 「背后逻辑」 | insight.core + details |
| 「对你的意义」 | end.takeaway.items |
| 互动问题 | end.footer.cta |

### B版（专业向）

| 文案段落 | JSON 字段 |
|---------|----------|
| 概述/总结 | intro.answer |
| 技术要点 | points.items |
| 开发者视角 | insight.core + details |
| 专业问题 | end.footer.cta |
