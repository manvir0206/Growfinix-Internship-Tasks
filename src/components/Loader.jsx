import { motion } from "framer-motion";
export default function Loader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-1 flex-col items-center justify-center px-8 text-center"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.1, ease: "linear" }}
        className="h-10 w-10 rounded-full border-[3px] border-cyan-100 border-t-cyan-500 dark:border-cyan-900 dark:border-t-cyan-300"
      />
      <p className="mt-5 font-semibold text-slate-700 dark:text-slate-200">
        AI is generating your summary...
      </p>
      <p className="mt-1 text-sm text-slate-500">
        Finding the most important ideas
      </p>
    </motion.div>
  );
}
