# ofox_skill

ofox 团队共用 Agent Skills 库，遵循 [Agent Skills 规范](https://agentskills.io/specification)，适配 Claude Code / Cursor / Windsurf 等 AI 编程工具。

## 目录结构

```
ofox_skill/
├── skills/                   # Skills 集合
│   ├── ofox-cover/           # 公众号封面生成器
│   └── ofox-zine-engine/     # AI 资讯 Zine 图文引擎
├── template/                 # Skill 模板（新建 skill 时参考）
├── LICENSE
└── README.md
```

## Skills 列表

| Skill | 描述 | 分类 |
|-------|------|------|
| [ofox-cover](skills/ofox-cover/) | 公众号封面生成器 - 黑白手绘漫画风格，小狐狸主角 | Creative & Design |
| [ofox-zine-engine](skills/ofox-zine-engine/) | AI 资讯 Zine 图文引擎 - 采集→评估→核实→文案→Zine渲染→质量门禁 | Content Creation |

### ofox-cover

为微信公众号文章生成黑白手绘漫画风格封面，主角是简笔画小狐狸。

**特点：**
- 黑白粗线条手绘漫画风，品牌橙色(#FF6600)文字框
- 根据文章主题自动设计场景，用视觉叙事传达文章核心内容
- 支持任意 OpenAI 兼容的图片生成 API（Gemini、DALL-E、通义万象等）
- 内置 30+ 场景预设，覆盖 AI / 创作 / 变现 / 学习 / 生活 / 行业 6 大话题

**使用：**
```
/ofox-cover 文章标题或主题
/ofox-cover 文章标题 --scene "狐狸在做什么"
/ofox-cover path/to/article.md
```

### ofox-zine-engine

AI 资讯内容生产全流程引擎，从热点采集到 Zine 剪报风图文卡片输出。

**特点：**
- 完整内容流水线：采集 → 评估 → 数据核实 → 文案生成 → 入库
- Zine 剪报风模块化组装：6大模块按内容特征自由组合
- 内置质量门禁：溢出检查 + 敏感词扫描 + 数据格式验证
- 适配小红书等平台，含敏感词替换规则

**使用：**
```
今日热点                      # 采集+评估
生成 1 3                     # 生成文案并入库
/graphic-zine 260319-01      # Zine 图文渲染
```

## 安装

将 `skills/` 目录下的 skill 文件夹复制到你的 `~/.claude/skills/` 目录：

```bash
# 克隆仓库
git clone https://github.com/ofoxai/ofox_skill.git

# 复制指定 skill
cp -r ofox_skill/skills/ofox-cover ~/.claude/skills/
```

安装后按 skill 内 `references/api-config.md` 的说明配置你的图片生成 API。

## 创建新 Skill

参考 `template/SKILL.md` 模板，在 `skills/` 下新建目录：

```
skills/your-skill-name/
├── SKILL.md          # 必需：元数据 + 指令
├── references/       # 可选：参考文档
├── scripts/          # 可选：脚本
└── assets/           # 可选：静态资源
```

详见 [Agent Skills 规范](https://agentskills.io/specification)。

## License

[MIT](LICENSE)
