import {
  HiArrowUpTray,
  HiDocumentText,
  HiSparkles,
  HiXMark,
} from "react-icons/hi2";
import { MAX_CHARS, MIN_CHARS, words } from "../utils/helpers";
export default function TextInput({
  text,
  setText,
  length,
  setLength,
  loading,
  onSubmit,
  onClear,
}) {
  const onFile = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.type !== "text/plain") return;
    const reader = new FileReader();
    reader.onload = (e) => setText(String(e.target.result).slice(0, MAX_CHARS));
    reader.readAsText(file);
  };
  return (
    <section className="glass flex min-h-[480px] flex-col p-5 sm:p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="font-bold text-slate-900 dark:text-white">
            Your text
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Paste or upload something worth reading.
          </p>
        </div>
        <label
          className="icon-button cursor-pointer"
          title="Upload .txt file"
          aria-label="Upload text file"
        >
          <HiArrowUpTray size={19} />
          <input
            className="sr-only"
            type="file"
            accept=".txt,text/plain"
            onChange={onFile}
            disabled={loading}
          />
        </label>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value.slice(0, MAX_CHARS))}
        disabled={loading}
        aria-label="Text to summarize"
        placeholder="Paste an article, meeting notes, email, or research paper here..."
        className="min-h-[215px] w-full resize-none rounded-2xl border border-slate-200 bg-slate-50/70 p-4 text-sm leading-6 text-slate-700 placeholder:text-slate-400 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-black/15 dark:text-slate-200"
      />{" "}
      <div className="mt-3 flex justify-between text-xs text-slate-500">
        <span>
          {words(text)} words{" "}
          {text.length > 0 && text.length < MIN_CHARS
            ? `· ${MIN_CHARS - text.length} more characters needed`
            : ""}
        </span>
        <span
          className={text.length >= MAX_CHARS ? "font-bold text-rose-500" : ""}
        >
          {text.length.toLocaleString()} / {MAX_CHARS.toLocaleString()}
        </span>
      </div>
      <div className="mt-auto pt-6">
        <div className="mb-4 flex items-center gap-2">
          <HiDocumentText className="text-cyan-500" />
          <label htmlFor="length" className="text-sm font-semibold">
            Summary depth
          </label>
          <select
            id="length"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            disabled={loading}
            className="ml-auto rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 dark:border-white/10 dark:bg-slate-800 dark:text-white"
          >
            <option value="short">Short</option>
            <option value="medium">Balanced</option>
            <option value="detailed">Detailed</option>
          </select>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onSubmit}
            disabled={loading || text.length < MIN_CHARS}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-500/20 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-45"
          >
            <HiSparkles size={18} />
            Generate summary
          </button>
          {text && (
            <button
              onClick={onClear}
              disabled={loading}
              className="icon-button border border-slate-200 dark:border-white/10"
              aria-label="Clear all text"
            >
              <HiXMark size={20} />
            </button>
          )}
        </div>
        <p className="mt-3 text-center text-xs text-slate-400">
          Press{" "}
          <kbd className="rounded border border-slate-200 px-1 dark:border-white/10">
            Ctrl
          </kbd>{" "}
          +{" "}
          <kbd className="rounded border border-slate-200 px-1 dark:border-white/10">
            Enter
          </kbd>{" "}
          to generate
        </p>
      </div>
    </section>
  );
}
