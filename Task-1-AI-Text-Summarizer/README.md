# Briefly — AI Text Summarizer

A polished React/Vite interface for turning long-form text into concise summaries with the Hugging Face Inference API.

## Features

- Hugging Face API integration with a dedicated service layer and 30-second timeout
- Input validation (100–10,000 characters), character/word metrics, `.txt` upload and saved drafts
- Short, balanced and detailed summary modes
- Copy, download and text-to-speech controls
- Responsive glass-style UI, dark mode, keyboard shortcut (`Ctrl/Cmd + Enter`) and motion transitions
- Friendly notifications for connectivity, authentication, timeout, API availability, and rate-limit errors

## Run locally

1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env`.
3. Create a Hugging Face access token at [Hugging Face Settings](https://huggingface.co/settings/tokens), then set `VITE_HF_API_TOKEN` in `.env`.
4. Run `npm run dev` and open the local URL Vite prints.

`facebook/bart-large-cnn` is used by default. You can use another compatible model by setting `VITE_HF_MODEL` in `.env`.

## Project layout

```
src/
  components/       Reusable interface sections
  hooks/            Summarization orchestration and saved input state
  services/         Hugging Face API boundary and error normalization
  utils/            Validation and text metric helpers
```

## Security note

Vite environment variables are embedded in the client bundle. For a public production app, put the Hugging Face request behind a serverless/backend endpoint so a privileged API token is never exposed. The `.env` file is intentionally not committed.
