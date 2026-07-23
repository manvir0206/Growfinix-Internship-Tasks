import { motion } from "framer-motion";
export default function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
      className="mx-auto max-w-3xl px-5 pb-10 pt-8 text-center sm:px-8 sm:pb-14"
    >
      <div className="mb-5 inline-flex items-center rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-bold tracking-wide text-cyan-700 dark:border-cyan-400/20 dark:bg-cyan-400/10 dark:text-cyan-300">
        YOUR WORDS, DISTILLED
      </div>
      <h1 className="font-['Playfair_Display'] text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:text-6xl dark:text-white">
        Find the signal in{" "}
        <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
          every word.
        </span>
      </h1>
      <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
        Turn lengthy articles, research and notes into clear, thoughtful
        summaries in seconds.
      </p>
    </motion.section>
  );
}
