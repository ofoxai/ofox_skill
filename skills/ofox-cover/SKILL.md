---
name: ofox-cover
description: Generate WeChat article cover images featuring a minimalist black-and-white comic-style fox character. Use when user asks to create a cover image for WeChat articles, or mentions "封面", "公众号封面", "ofox cover".
license: MIT
compatibility: Requires an OpenAI-compatible image generation API (e.g. Gemini, DALL-E, DashScope). Designed for Claude Code and compatible agents.
metadata:
  author: ofoxai
  version: "1.0"
  category: creative-design
---

# ofox-cover - 公众号封面生成器

为 ofox.ai 公众号文章生成黑白手绘漫画风格封面，主角是简笔画小狐狸。

## Usage

```
/ofox-cover 文章标题或主题
/ofox-cover 文章标题 --scene "狐狸在做什么"
/ofox-cover path/to/article.md
```

## Examples

```
/ofox-cover AI让创作者月入过万
/ofox-cover 如何用AI写公众号文章 --scene "狐狸坐在电脑前疯狂打字"
/ofox-cover ./articles/ai-tools.md
```

---

## Workflow

### Step 0: Read references

Read `references/prompt-template.md` and `references/scene-library.md` before proceeding.

### Step 1: Understand the content

- If a file path is given: read the article, extract title and key themes
- If a title/topic string is given: use it directly
- Extract 3-5 keywords from the content

### Step 2: Design the fox scene

If `--scene` is provided, use it directly. Otherwise:

1. Read `references/scene-library.md` for inspiration
2. Based on the article topic, design a scene:
   - What is the fox DOING? (action/pose)
   - What is the fox's EXPRESSION? (emotion)
   - What OBJECTS or TEXT BOXES appear in the scene?
   - What visual METAPHOR connects to the article topic?
3. The scene should be **funny, relatable, or clever** - the kind of image that makes someone want to click

### Step 3: Confirm with user

Present the scene idea in a brief one-liner, e.g.:

```
场景：狐狸戴着墨镜，一手拿手机一手拿咖啡，旁边飘着写有"月入过万"的气泡框，表情得意
```

Ask: "这个场景 OK 吗？或者你有其他想法？"

If user says OK or gives no objection, proceed. If user suggests changes, adapt.

### Step 4: Generate the prompt

Use the template from `references/prompt-template.md` to construct the full prompt JSON.

**CRITICAL RULES:**
- The fox is ALWAYS white with black outlines
- ONLY black and white, zero gray tones or shading
- Thick, bold, slightly wobbly marker lines
- Pure white background
- Stick-figure / simplified comic style
- Text boxes use orange color (#FF6600) for ofox brand consistency
- Aspect ratio is ALWAYS 16:9

### Step 5: Generate the image

Read `references/api-config.md` for the API endpoint, model, and request format.

Call the configured image generation API with the constructed prompt. The API follows OpenAI-compatible format. Decode the base64 response and save as PNG.

**Users must configure their own API credentials before first use.** See `references/api-config.md` for setup instructions.

### Step 6: Save output

Save the generated image to the article's directory or current working directory:
- Filename: `cover-{slug}.png` where slug is derived from the title
- Also save the prompt to `cover-{slug}-prompt.json` for future reference/iteration

### Step 7: Offer iteration

After showing the result, ask:
"封面生成完成！需要调整场景或重新生成吗？"

If user wants changes, go back to Step 2.
