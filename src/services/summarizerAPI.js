import { HfInference } from "@huggingface/inference";

const TIMEOUT = 30000;
const model = import.meta.env.VITE_HF_MODEL || "facebook/bart-large-cnn";

export async function generateSummary(text, length = "medium", signal) {
  const token = import.meta.env.VITE_HF_API_TOKEN;
  if (!token) throw new Error("CONFIG_MISSING");
  const client = new HfInference(token);
  const options = { short: [25, 75], medium: [60, 150], detailed: [120, 280] }[
    length
  ];
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("TIMEOUT")), TIMEOUT),
  );
  try {
    const result = await Promise.race([
      client.summarization({
        model,
        inputs: text,
        parameters: {
          min_length: options[0],
          max_length: options[1],
          do_sample: false,
        },
      }),
      timeout,
    ]);
    if (!result?.summary_text) throw new Error("EMPTY_RESPONSE");
    return result.summary_text;
  } catch (error) {
    if (signal?.aborted) throw new Error("CANCELLED");
    const status = error?.status || error?.response?.status;
    if (status === 401 || status === 403) throw new Error("AUTH");
    if (status === 429) throw new Error("RATE_LIMIT");
    if (status >= 500) throw new Error("UNAVAILABLE");
    if (error.message === "TIMEOUT") throw error;
    if (!navigator.onLine) throw new Error("OFFLINE");
    throw error;
  }
}
