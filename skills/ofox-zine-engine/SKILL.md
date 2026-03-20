---
name: ofox-zine-engine
description: Ofox AI Zine 图文引擎 - 从内容库文案生成剪报风格图文卡片。包含完整的内容采集 → 评估 → 核实 → 文案生成 → Zine 图文渲染 → 质量门禁 → 截图全流程。适用于小红书等平台的 AI 资讯图文内容生产。
license: MIT
compatibility: Designed for Claude Code and compatible agents. Requires Node.js for screenshot.
metadata:
  author: ofoxai
  version: "1.0"
  category: content-creation
---

# ofox-zine-engine - AI 资讯 Zine 图文引擎

从 AI 行业热点采集到 Zine 剪报风图文卡片输出的完整生产流程。

## Prerequisites

graphic-engine 和 content-library 已内置在本 skill 目录下，无需额外克隆。

首次使用需安装截图依赖：

```bash
cd skills/ofox-zine-engine/graphic-engine && npm install
```

目录结构：

```
skills/ofox-zine-engine/
├── SKILL.md
├── references/
├── graphic-engine/       ← 渲染引擎（内置）
│   ├── templates/engine.html
│   ├── assets/logos/
│   ├── output/ofox/zine/   ← 运行时自动创建
│   └── screenshot.js
└── content-library/      ← 内容库（内置）
    ├── index.md
    ├── pending/
    └── personas.md
```

**路径约定：** 下文 `graphic-engine/` 和 `content-library/` 均指本 skill 目录下的子目录。

## Usage

```
# 内容采集
今日热点
处理 [URL]

# 生成文案并入库
生成 1 3 5
输出 1

# Zine 图文渲染
/graphic-zine {ID}

# 质量审核
/review {路径}
```

## Examples

```
今日热点                          # 采集+评估今日 AI 热点
处理 https://github.com/xxx      # 处理单条链接
生成 1 3                         # 生成第 1、3 条内容并入库
/graphic-zine 260319-01          # 从内容库生成 Zine 图文
/review output/ofox/zine/xxx/    # 手动质量审核
```

---

## 一、整体架构

```
内容引擎                     图文引擎（Zine）
─────────                   ──────────────
采集热点 → 评估打分           读文案 → 模块化组装
  ↓                           ↓
数据核实 → 生成文案           填充 JSON → 生成 HTML
  ↓                           ↓
入库 index.md               质量门禁 → 预览 → 截图
```

### 关键路径

```
skills/ofox-zine-engine/
├── content-library/          ← 内容库（内置）
│   ├── index.md              ← 索引（只用 Edit 工具！）
│   ├── pending/YYMMDD.md     ← 文案文件
│   └── personas.md           ← 人设库
└── graphic-engine/           ← 渲染引擎（内置）
    ├── templates/engine.html ← 统一模板（theme: "zine"）
    ├── assets/logos/         ← Logo 资源
    ├── output/ofox/zine/     ← Zine 输出目录
    └── screenshot.js         ← 截图脚本
```

---

## 二、内容生产流程

### Step 1: 采集

| 优先级 | 来源 | 方式 |
|--------|------|------|
| P0 | GitHub Trending | 搜索 |
| P1 | 官方博客（OpenAI/Anthropic/Google） | 搜索+抓取 |
| P2 | 权威媒体（TechCrunch/机器之心） | 搜索 |
| P3 | Twitter KOL | 搜索 |

**规则：**
- 必须确认发布日期，>3天旧闻剔除
- 必须提供原始链接
- 无法确认日期标记「日期不明」

### Step 2: 价值评估

6 维度评分：时效性(15%) + 技术深度(25%) + 开发者价值(25%) + 可信度(15%) + 独特性(10%) + 噱头指数(10%负向)

| 总分 | 判定 | 行动 |
|------|------|------|
| 22-28 | 高价值 | 立即生成 |
| 16-21 | 中高价值 | 建议生成 |
| <16 | 低价值 | 跳过 |

### Step 3: 数据核实（强制）

**流程：评估完成 → 用户确认 → 数据提取 → 文案生成**

1. 访问源头（GitHub README、官方博客）
2. 逐项提取事实清单（数字/命令/技术/产品/引述）
3. 表格展示给用户确认
4. 基于清单生成文案，禁止编造

### Step 4: 文案生成

| 版本 | 结构 | 适用 |
|------|------|------|
| A版（洞察向） | 事实 → 背后逻辑 → 对你的意义 → 互动钩子 | 面向大众 |
| B版（专业向） | 概述 → 技术要点 → 开发者视角 → 专业问题 | 面向开发者 |

**内容公式：** 好内容 = 事实(20%) + 逻辑(30%) + 意义(30%) + 钩子(20%)

### Step 5: 入库

1. 分配 ID：`YYMMDD-序号`
2. 用 Edit 工具更新 `index.md`（禁止 sed -i / Write / cat >）
3. 写入 `pending/YYMMDD.md`

---

## 三、Zine 图文渲染流程

### Step 1: 路径推导

```
输入：ID = YYMMDD-NN

推导：
  文案 = content-library/pending/{YYMMDD}.md → "## {ID}" 章节
  主题 = 从标题提取
  模板 = graphic-engine/templates/engine.html
  JSON = theme: "zine"
  输出 = graphic-engine/output/ofox/zine/{YYMMDD}-{topic}-b-zine/
```

### Step 2: 生成 HTML

```
1. 读取文案 → 提取对应版本段落
2. 文案 → JSON（pages[] 格式，theme: "zine"）
3. 按内容特征选择模块（见下方模块系统）
4. 复制 engine.html → 输出目录
5. 修正 logo 路径：sed 's|"assets/logos/|"../../../../assets/logos/|g'
6. 替换 defaultData JSON
```

### Step 3: 质量门禁（自动）

溢出检查 + 敏感词扫描 + 数据格式验证 → 发现问题自动修复 → 全部通过输出预览路径

### Step 4: 截图（等用户确认）

```bash
cd graphic-engine && node screenshot.js output/ofox/zine/{目录}/{文件}.html
```

---

## 四、Zine 模块系统

**设计理念：内容决定结构，不是结构限制内容。**

Zine 是模块化组装，根据内容特点选模块、定顺序、调密度。配色：铜橙 #C65D3B。

### 6 大模块

#### 1. 封面（cover）— 必选

| 子模块 | 字段 | 何时用 |
|--------|------|--------|
| 报头 | `date`, `edition` | 始终 |
| 标签+邮票 | `tags`, `starBadge` | GitHub/有star数据 |
| 大标题 | `title` | 始终 |
| 副标题 | `subtitle` | 有作者/机构/数据 |
| 关键词 | `keywords` | ≤4个，不硬凑 |
| 漫画条 | `comic` | 有过程/演变/对比 |
| 数据挂件 | `stats` | 有3-4个关键数字 |
| Logo栏 | `logos` | 有对应资源 |

comic 和 stats 可二选一。

#### 2. 对话页（intro）— 推荐

| 子模块 | 字段 | 何时用 |
|--------|------|--------|
| 问答气泡 | `question`, `answer` | 能用问答讲清 |
| 流程对比 | `flowChart` | 新旧方案有差异 |

不适合 Q&A 框架 → 跳过。

#### 3. 剪报页（points）— 推荐

4条最安全，title≤8字，desc≤22字，说清"为什么有用"。

#### 4. 深度拆解页（insight）— 可选

| 子模块 | 字段 | 何时用 |
|--------|------|--------|
| 技术规格 | `details` | 有具体参数 |
| 竞品对比 | `comparison` | 有可比对象 |
| 结论 | `verdict` | 有一句话判断 |

不涉及技术比较 → 跳过。

#### 5. 引用页（quote）— 可选

大引文 + 来源 + bullets + 手写批注。没有金句 → 跳过。

#### 6. 尾页（end）— 必选

终端命令或文本列表 + 链接 + CTA + slogan。

### 组装策略

| 内容类型 | 组合 |
|---------|------|
| GitHub 开源项目 | 封面(全量) → 对话 → 剪报 → 深度拆解 → 引用 → 尾页 |
| 模型/产品发布 | 封面(无漫画) → 对话 → 剪报 → 引用 → 尾页 |
| 行业报告/榜单 | 封面(stats) → 剪报 → 深度拆解 → 尾页 |
| 观点/趋势分析 | 封面(简洁) → 对话 → 引用 → 尾页 |
| 工具教程 | 封面 → 对话 → 剪报 → 尾页(终端) |

**页数：** 4-6页为宜，不超过7页。4页精炼 > 6页注水。

### 判断流程

```
1. 有关键数字？→ 封面加 stats
2. 有演变/对比？→ 封面加 comic
3. 能问答讲清？→ 加对话页
4. 有 3+ 并列要点？→ 加剪报页
5. 有竞品/参数？→ 加深度拆解
6. 有核心金句？→ 加引用页
7. 开发者工具？→ 尾页终端；否→文本列表
```

---

## 五、Zine 视觉元素

| 元素 | 适合数据 |
|------|---------|
| 便签（黄/粉/蓝/绿/橙） | 批注、吐槽、简短观点 |
| 气泡（左/右） | 问答、对话 |
| 剪报卡 | 并列要点 |
| 邮票 | 数字徽章（star、版本号） |
| 标签机 | 分类标记 |
| 编号圈 | 有序列表 |
| 回形针 | 页面装饰 |
| Washi tape | 分隔线装饰 |
| 手绘下划线 | 强调文字 |
| 红圈标注 | 圈出重点 |
| 漫画面板 | 过程/演变故事 |

---

## Guidelines

### 数据核实规则
- 项目名必须从 GitHub 确认真实存在
- 描述用仓库原文，不自行美化
- 模型价格只从官网获取（禁止 OpenRouter 等第三方价格）
- 官网无明确价格标注"价格待确认"

### 敏感词规避（小红书平台）

| 敏感词 | 替换 |
|--------|------|
| API | 接口 |
| 代理/proxy | 直连/访问不便 |
| 50+ 模型 | 列举具体模型名 |
| 海外信用卡/支付 | 删除 |
| 海外手机号 | 删除 |
| 程序员 | 开发者 |
| 平台（API语境） | 工具 |

### 溢出安全上限

| 模块 | 上限 |
|------|------|
| cover | 标题≤2行, keywords≤4, stats≤4 |
| intro | flowChart 步骤字数对齐 |
| points | ≤4条, title≤8字, desc≤22字 |
| insight | details≤3, tip留空 |
| quote | 引文≤3行, note≤80字 |
| end | items≤3, verifyCommands≤2行 |

### 绝对禁止
- sed -i 操作 index.md（macOS BSD sed 会清空文件）
- 编造数字/命令/技术细节
- logos 写成字符串数组（必须 `[{name, url}]`）
- 从零写 HTML（必须复制 engine.html）
- 修改模板 CSS/JS（只改 JSON）
- 自动截图（等用户确认）

### 必须执行
- 数据核实后出事实清单再生成
- 复制模板后修正 logo 路径（4层 `../../../../`）
- 生成后自动运行质量门禁
- 敏感词全部替换
- 尾页 ofox.ai + slogan
- intro 有 flowChart（不留空）
