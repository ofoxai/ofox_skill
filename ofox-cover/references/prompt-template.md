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
| AI 工具推荐 | The fox is sitting at a desk surrounded by floating screens, looking overwhelmed, with one paw on a keyboard and the other holding its head. An orange text box says '工具太多了' |
| 创作者变现 | The fox is wearing sunglasses and leaning back in a chair with its feet on a desk. Gold coins are raining from above. An orange speech bubble says '躺赚' |
| 公众号涨粉 | The fox is watering a tiny plant labeled '粉丝', but the plant has grown into a massive tree towering over the fox. The fox looks shocked with wide eyes |
| 技术教程 | The fox is standing at a whiteboard pointing at a diagram with one paw, holding a marker in the other, wearing tiny round glasses. An orange text box says '听我说' |
| 行业趋势 | The fox is riding a rocket, holding on tight with both paws, fur blown back by wind. An orange banner below says '起飞了' |
| 踩坑经验 | The fox is stuck in a hole in the ground, only its head and paws visible, with spiral dizzy eyes. An orange text box says '别学我' |

## Text Box Rules

- Color: ALWAYS orange (#FF6600) — this is the ofox brand color
- Text: Short Chinese, 2-8 characters max
- Content: A punchy phrase that makes people want to click
- Style: Simple rectangular box or speech bubble
- The text should feel like the fox is saying it or it's a caption

## Things to AVOID in the prompt

- NO color except black, white, and orange (text boxes only)
- NO realistic rendering or photographic style
- NO complex backgrounds or detailed environments
- NO gradients, shadows, or 3D effects
- NO multiple characters (unless specifically requested)
- Keep it SIMPLE — the charm is in the minimalism

## Final JSON Format

```json
{
  "prompt": "[full prompt text]",
  "aspect_ratio": "16:9"
}
```
