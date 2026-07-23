import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { generateSummary } from "../services/summarizerAPI";
import { MAX_CHARS, MIN_CHARS } from "../utils/helpers";

const messages = {
  CONFIG_MISSING: "Add your Hugging Face API token to .env to get started.",
  AUTH: "Your API token was not accepted. Please check your .env file.",
  RATE_LIMIT: "The API rate limit was reached. Please try again shortly.",
  UNAVAILABLE: "The AI service is temporarily unavailable. Please try again.",
  TIMEOUT: "The request took too long. Please try again.",
  OFFLINE: "You appear to be offline. Check your connection and retry.",
  EMPTY_RESPONSE: "The AI returned an empty response. Please try again.",
};

export function useSummarizer() {
  const [text, setText] = useState(
    () => localStorage.getItem("briefly-draft") || "",
  );
  const [summary, setSummary] = useState("");
  const [length, setLength] = useState("medium");
  const [loading, setLoading] = useState(false);
  const controller = useRef(null);
  useEffect(() => {
    localStorage.setItem("briefly-draft", text);
  }, [text]);
  useEffect(() => () => controller.current?.abort(), []);
  const summarize = useCallback(async () => {
    if (!text.trim())
      return toast.error("Paste some text before generating a summary.");
    if (text.trim().length < MIN_CHARS)
      return toast.error(
        `Add at least ${MIN_CHARS} characters for a useful summary.`,
      );
    if (text.length > MAX_CHARS)
      return toast.error(
        `Keep your text under ${MAX_CHARS.toLocaleString()} characters.`,
      );
    controller.current = new AbortController();
    setLoading(true);
    try {
      const result = await generateSummary(
        text.trim(),
        length,
        controller.current.signal,
      );
      setSummary(result);
      toast.success("Summary ready!");
    } catch (error) {
      if (error.message !== "CANCELLED")
        toast.error(
          messages[error.message] ||
            "Unable to generate a summary. Please try again.",
        );
    } finally {
      setLoading(false);
      controller.current = null;
    }
  }, [length, text]);
  const clear = () => {
    setText("");
    setSummary("");
    localStorage.removeItem("briefly-draft");
  };
  return {
    text,
    setText,
    summary,
    setSummary,
    length,
    setLength,
    loading,
    summarize,
    clear,
  };
}
