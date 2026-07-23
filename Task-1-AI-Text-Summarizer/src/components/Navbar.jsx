import { HiSparkles } from "react-icons/hi2";
import ThemeToggle from "./ThemeToggle";
export default function Navbar({ dark, onThemeToggle }) {
  return (
    <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6 sm:px-8">
      <a
        href="#top"
        className="flex items-center gap-2 font-extrabold tracking-tight text-slate-900 dark:text-white"
      >
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 text-white shadow-lg shadow-cyan-500/25">
          <HiSparkles />
        </span>
        briefly
      </a>
      <div className="flex items-center gap-2">
        <span className="hidden text-sm font-medium text-slate-500 sm:block dark:text-slate-400">
          AI text companion
        </span>
        <ThemeToggle dark={dark} onToggle={onThemeToggle} />
      </div>
    </nav>
  );
}
