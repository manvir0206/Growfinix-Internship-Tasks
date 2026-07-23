import { motion } from "framer-motion";
import {
  HiArrowDownTray,
  HiClipboardDocument,
  HiSpeakerWave,
  HiTrash,
} from "react-icons/hi2";
import { toast } from "react-toastify";
import { readingTime, words } from "../utils/helpers";
import Loader from "./Loader";
export default function SummaryCard({ summary, loading, setSummary }) {
  const copy = async () => {
    await navigator.clipboard.writeText(summary);
    toast.success("Summary copied to clipboard.");
  };
  const download = () => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([summary], { type: "text/plain" }));
    a.download = "briefly-summary.txt";
    a.click();
    URL.revokeObjectURL(a.href);
  };
  const speak = () => {
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(summary));
  };
  return (
    <section className="glass flex min-h-[480px] flex-col overflow-hidden p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-bold text-slate-900 dark:text-white">
            Your summary
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            The essential ideas, made clear.
          </p>
        </div>
        {summary && (
          <button
            onClick={() => setSummary("")}
            className="icon-button"
            aria-label="Clear result"
          >
            <HiTrash size={18} />
          </button>
        )}
      </div>
      {loading ? (
        <Loader />
      ) : summary ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-1 flex-col"
        >
          <article className="prose-summary mt-6 flex-1 rounded-2xl border border-cyan-100 bg-gradient-to-br from-cyan-50/70 to-blue-50/50 p-5 text-sm leading-7 text-slate-700 dark:border-cyan-400/10 dark:from-cyan-400/5 dark:to-blue-400/5 dark:text-slate-200">
            {summary}
          </article>
          <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
            <span>
              {words(summary)} words · {readingTime(summary)} min read
            </span>
            <span>{summary.length} characters</span>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-2">
            <button
              onClick={copy}
              className="icon-button w-full gap-1 border border-slate-200 text-xs dark:border-white/10"
            >
              <HiClipboardDocument size={17} />
              Copy
            </button>
            <button
              onClick={download}
              className="icon-button w-full gap-1 border border-slate-200 text-xs dark:border-white/10"
            >
              <HiArrowDownTray size={17} />
              Save
            </button>
            <button
              onClick={speak}
              className="icon-button w-full gap-1 border border-slate-200 text-xs dark:border-white/10"
            >
              <HiSpeakerWave size={17} />
              Listen
            </button>
          </div>
        </motion.div>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-slate-100 text-2xl dark:bg-white/10">
            ✦
          </div>
          <h3 className="mt-5 font-bold text-slate-700 dark:text-slate-200">
            Waiting for your ideas
          </h3>
          <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500">
            Your concise, AI-crafted summary will appear here.
          </p>
        </div>
      )}
    </section>
  );
}
