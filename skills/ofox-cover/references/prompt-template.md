# Prompt Template

## Base Prompt Structure

The prompt follows a strict format. Only the `[SCENE]` section changes per cover.

```
A minimalist, hand-drawn comic panel rendered in thick, bold, slightly wobbly black marker lines on a pure white background, mimicking a quick sketch on a whiteboard. There are zero gray tones or shading, only stark black and white. The main character is a simplified, stick-figure style white fox with black outlines, large pointed ears, and a bushy tail. The fox has a simple facial expression. [SCENE].
```

## [SCENE] Construction Rules

The scene description must include ALL of these elements:

1. **Fox action**: What the fox is physically doing (sitting, running, typing, holding something)
2. **Fox expression**: Simple emotion (confused, happy, shocked, smug, exhausted, excited)
3. **Props/Objects**: 1-3 objects that relate to the article topic
4. **Text box** (optional but recommended): An orange (#FF6600) text box or speech bubble with short Chinese text (2-8 characters) that captures the article's hook

## Scene Description Format

```
The fox is [ACTION] and [EXPRESSION]. [OBJECTS/ENVIRONMENT]. [TEXT BOX if any].
```

### Good examples:

| Article Topic | Scene Description |
|---|---|
| AI 工具推荐 | The fox is sitting at a desk surrounded by floating screens, looking overwhelmed, with one paw on a keyboard and the other holding its head. In the top-right corner, a bold orange speech bubble prominently displays the hand-written Chinese characters "太多了" in thick black marker strokes matching the comic's art style |
| 创作者变现 | The fox is wearing sunglasses and leaning back in a chair with its feet on a desk. Gold coins are raining from above. Above the fox, a round orange banner prominently displays the hand-written Chinese characters "躺赚" in thick wobbly black marker strokes |
| 公众号涨粉 | The fox is watering a tiny plant, but the plant has grown into a massive tree towering over the fox. The fox looks shocked with wide eyes. No text needed — the visual metaphor tells the story |
| 技术教程 | The fox is standing at a whiteboard pointing at a diagram with one paw, holding a marker in the other, wearing tiny round glasses. A rectangular orange sign above reads the hand-written Chinese characters "听我说" in bold black marker strokes |
| 行业趋势 | The fox is riding a rocket, holding on tight with both paws, fur blown back by wind. Below the scene, an orange banner displays the hand-written Chinese characters "起飞" in thick black marker strokes matching the comic style |
| 踩坑经验 | The fox is stuck in a hole in the ground, only its head and paws visible, with spiral dizzy eyes. A bold orange speech bubble above shows the hand-written Chinese characters "别学" in thick wobbly black marker strokes |

## Text Box Rules

**CRITICAL: Chinese text quality optimization**

AI models often render Chinese characters incorrectly. Follow these rules to maximize text quality:

1. **Keep text to 2-4 characters max** — fewer characters = higher accuracy (e.g. "危！" > "你的钥匙呢")
2. **Use common, simple characters** — avoid rare or complex characters
3. **Describe the text rendering style explicitly** in the prompt:
   - GOOD: `A bold, hand-written style orange speech bubble prominently displays the Chinese characters "起飞" in thick, wobbly black marker strokes matching the comic's art style`
   - BAD: `An orange text box says '起飞了'`
4. **Embed text in a clear visual container** — speech bubbles or banners give the model spatial context for where and how to render text
5. **Specify the text is hand-written/marker style** — this matches the overall comic aesthetic and forgives slight imperfections in character rendering

**Format for text in prompt:**
```
In the [top-right corner / bottom / above the fox], there is a [bold orange speech bubble / round orange banner / rectangular orange sign] that prominently displays the hand-written Chinese characters "[2-4 chars]" in thick black marker strokes. The text style matches the comic's wobbly hand-drawn aesthetic.
```

**Other rules:**
- Color: ALWAYS orange (#FF6600) — this is the ofox brand color
- Content: A punchy phrase that makes people want to click
- The text should feel like the fox is saying it or it's a caption
- If the model still renders text poorly after 1-2 attempts, consider dropping text entirely and letting the scene tell the story visually

## Things to AVOID in the prompt

- NO color except black, white, and orange (text boxes only)
- NO realistic rendering or photographic style
- NO complex backgrounds or detailed environments
- NO gradients, shadows, or 3D effects
- NO multiple characters (unless specifically requested)
- Keep it SIMPLE — the charm is in the minimalism

## Final Request Body

```json
{
  "contents": [{
    "parts": [
      {"text": "[full prompt text]"}
    ]
  }],
  "generationConfig": {
    "imageConfig": {
      "aspectRatio": "16:9"
    }
  }
}
```
