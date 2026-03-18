# API Configuration

## Setup

Before first use, configure your image generation API by setting the following environment variables or editing the values below.

## Image Generation Backend

- **Endpoint**: `https://api.ofox.ai/gemini/v1/images/generations`
- **Auth Header**: `Authorization: Bearer {OFOX_COVER_API_KEY}` (set via environment variable)
- **Model**: `google/gemini-2.5-flash-image` (or `google/gemini-3.1-flash-image-preview`)
- **Size**: `1792x1024` (approximately 16:9)
- **Response format**: base64 encoded image in `data[0].b64_json`

## Request Format

The API must follow OpenAI-compatible image generation format:

```json
{
  "model": "google/gemini-2.5-flash-image",
  "prompt": "[full prompt text]",
  "size": "1792x1024"
}
```

## Environment Variable

Set your API key as an environment variable:

```bash
export OFOX_COVER_API_KEY="your-api-key-here"
```

The key is stored in 1Password vault `openclaw`, item `gen-image-api-key`.

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
