export const MAX_CHARS = 10000;
export const MIN_CHARS = 100;
export const words = (text = "") =>
  text.trim() ? text.trim().split(/\s+/).length : 0;
export const readingTime = (text = "") =>
  Math.max(1, Math.ceil(words(text) / 225));
export const formatLength = (length) =>
  ({ short: "Short", medium: "Balanced", detailed: "Detailed" })[length] ||
  "Balanced";
