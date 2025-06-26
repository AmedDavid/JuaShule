import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "./ui/button"

// Helper to get/set theme
function getInitialTheme() {
  if (typeof window === 'undefined') return 'light';
  const stored = localStorage.getItem('theme');
  if (stored) return stored;
  // System preference
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export default function ModeToggle() {
  const [theme, setTheme] = React.useState(getInitialTheme());

  React.useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="icon"
        aria-label="Toggle theme"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        <Sun
          className={
            "h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all " +
            (theme === 'dark' ? 'dark:-rotate-90 dark:scale-0' : '')
          }
        />
        <Moon
          className={
            "absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all " +
            (theme === 'dark' ? 'dark:rotate-0 dark:scale-100' : '')
          }
        />
        <span className="sr-only">Toggle theme</span>
      </Button>
      {/* Dropdown for system/light/dark can be added here if needed */}
    </div>
  );
}
