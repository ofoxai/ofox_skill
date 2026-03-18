# API Configuration

## Setup

Before first use, set the `GEMINI_API_KEY` environment variable:

```bash
export GEMINI_API_KEY="your-api-key-here"
```

## Image Generation Backend

- **Endpoint**: `https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent`
- **Auth Header**: `x-goog-api-key: $GEMINI_API_KEY`
- **Model**: `gemini-3.1-flash-image-preview` (recommended) or `gemini-2.5-flash-image`
- **Aspect Ratio**: `16:9` (via `generationConfig.imageConfig.aspectRatio`)
- **Response format**: base64 encoded image in `candidates[0].content.parts[].inlineData.data`

## Request Format

Gemini native `generateContent` API:

```bash
curl -s -X POST \
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-image-preview:generateContent" \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
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
  }'
```

## Response Format

```json
{
  "candidates": [{
    "content": {
      "parts": [
        {"text": "optional text description from the model"},
        {
          "inlineData": {
            "mimeType": "image/png",
            "data": "<base64-encoded-image>"
          }
        }
      ]
    }
  }]
}
```

## Extracting the Image

1. Parse the JSON response
2. Iterate through `candidates[0].content.parts[]`
3. Find the part with `inlineData` field
4. Decode `inlineData.data` from base64
5. Save as PNG (mimeType is typically `image/png`)

## Notes

- The response may contain both text and image parts — extract the part with `inlineData`
- If `GEMINI_API_KEY` is not set, prompt the user to configure it before proceeding
- Model `gemini-3.1-flash-image-preview` produces higher quality images than `gemini-2.5-flash-image`
