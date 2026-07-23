import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
export default function ThemeToggle({ dark, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="icon-button"
      aria-label="Toggle color theme"
    >
      {dark ? <HiOutlineSun size={20} /> : <HiOutlineMoon size={20} />}
    </button>
  );
}
