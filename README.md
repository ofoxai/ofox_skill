# ofox_skill

ofox 团队共用 Skill 库，适配 Claude Code / Cursor / Windsurf 等 AI 编程工具。

## Skills 列表

### ofox-cover - 公众号封面生成器

为 ofox.ai 公众号文章生成黑白手绘漫画风格封面，主角是简笔画小狐狸。

**特点：**
- 黑白粗线条手绘漫画风格，品牌橙色(#FF6600)文字框
- 根据文章主题自动设计场景，用视觉叙事传达文章核心内容
- 支持任意 OpenAI 兼容的图片生成 API（Gemini、DALL-E、通义万象等）
- 内置 30+ 场景预设，覆盖 AI/创作/变现/学习/生活/行业 6 大话题

**使用方式：**
```
/ofox-cover 文章标题或主题
/ofox-cover 文章标题 --scene "狐狸在做什么"
/ofox-cover path/to/article.md
```

**安装：** 将 `ofox-cover/` 目录复制到 `~/.claude/skills/` 下，然后在 `ofox-cover/references/api-config.md` 中配置你的图片生成 API。

---

> 后续会持续添加更多团队共用 Skill，敬请期待。
