# API Configuration

## Setup

Before first use, configure your image generation API by setting the following environment variables or editing the values below.

## Image Generation Backend

- **Endpoint**: `{YOUR_API_ENDPOINT}` (e.g. `https://api.openai.com/v1/images/generations` or any OpenAI-compatible endpoint)
- **Auth Header**: `Authorization: Bearer {YOUR_API_KEY}`
- **Model**: `{YOUR_IMAGE_MODEL}` (e.g. `google/gemini-3.1-flash-image-preview`, `dall-e-3`, `gpt-image-1`, etc.)
- **Size**: `1792x1024` (approximately 16:9)
- **Response format**: base64 encoded image in `data[0].b64_json`

## Request Format

The API must follow OpenAI-compatible image generation format:

```json
{
  "model": "{YOUR_IMAGE_MODEL}",
  "prompt": "[full prompt text]",
  "size": "1792x1024"
}
```

## Supported Backends

Any OpenAI-compatible image generation API should work, including:

- OpenAI (DALL-E 3, GPT Image)
- Google Gemini (via compatible proxy)
- Replicate
- DashScope (通义万象)
- OpenRouter
- Any other OpenAI-compatible proxy

## Notes

- Response must include `b64_json` in `data[0].b64_json`, which will be decoded and saved as PNG locally
- If your API returns `url` instead of `b64_json`, download the image from the URL and save locally
