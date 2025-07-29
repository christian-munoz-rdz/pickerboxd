import Toggle from 'react-toggle';
import { useTheme } from '@/contexts/ThemeContext';
import { Moon, Sun, Monitor } from 'lucide-react';
import { Button } from './ui/button';
import "react-toggle/style.css";

type Theme = 'light' | 'dark' | 'system';

export function DarkModeToggle() {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center gap-2">
      <Toggle
        checked={resolvedTheme === 'dark'}
        onChange={toggleTheme}
        icons={{
          checked: <Moon className="w-3 h-3" />,
          unchecked: <Sun className="w-3 h-3" />
        }}
        aria-label="Toggle dark mode"
      />
      
      {/* Theme selector dropdown */}
      <div className="hidden sm:flex gap-1">
        {(['light', 'dark', 'system'] as Theme[]).map((t) => (
          <Button
            key={t}
            variant={theme === t ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setTheme(t)}
            className="p-2"
            aria-label={`Set ${t} theme`}
          >
            {t === 'light' && <Sun className="w-4 h-4" />}
            {t === 'dark' && <Moon className="w-4 h-4" />}
            {t === 'system' && <Monitor className="w-4 h-4" />}
          </Button>
        ))}
      </div>
    </div>
  );
} 