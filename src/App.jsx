import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TextInput from "./components/TextInput";
import SummaryCard from "./components/SummaryCard";
import Footer from "./components/Footer";
import { useSummarizer } from "./hooks/useSummarizer";

export default function App() {
  const [dark, setDark] = useState(
    () => localStorage.getItem("briefly-theme") === "dark",
  );
  const state = useSummarizer();
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("briefly-theme", dark ? "dark" : "light");
  }, [dark]);
  useEffect(() => {
    const shortcut = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        state.summarize();
      }
    };
    window.addEventListener("keydown", shortcut);
    return () => window.removeEventListener("keydown", shortcut);
  }, [state.summarize]);
  return (
    <div id="top" className="ambient min-h-screen">
      <Navbar dark={dark} onThemeToggle={() => setDark(!dark)} />
      <main>
        <Hero />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mx-auto grid max-w-7xl gap-5 px-5 sm:px-8 lg:grid-cols-2 lg:gap-6"
        >
          <TextInput
            {...state}
            onSubmit={state.summarize}
            onClear={state.clear}
          />
          <SummaryCard
            summary={state.summary}
            loading={state.loading}
            setSummary={state.setSummary}
          />
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
