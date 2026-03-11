import React, { useState } from 'react';
import { Menu, X, Coins, User, Settings, Sun, Moon } from 'lucide-react';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

interface NavigationProps {
  credits: number;
  onBuyCreditsClick: () => void;
  onSettingsClick: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ 
  credits, 
  onBuyCreditsClick,
  onSettingsClick 
}) => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/40 backdrop-blur-2xl border-b border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-0.5 group">
              <span className="text-xl font-bold dark:bg-gradient-to-r dark:from-cyan-400 dark:to-teal-400 dark:bg-clip-text dark:text-transparent text-blue-500">
                Social
              </span>
              <span className="text-xl font-bold dark:text-white text-foreground">
                Copy
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a 
              href="#" 
              className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors duration-300"
            >
              {t.nav.dashboard}
            </a>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-3">
            {/* Credits Pill */}
            <div className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-background/50 border border-primary/20 hover:border-primary/40 transition-colors">
              <Coins className="h-3.5 w-3.5 text-primary" />
              <span className="text-sm font-semibold text-foreground">{credits}</span>
              <span className="text-xs text-foreground/60 hidden sm:inline">{t.nav.credits}</span>
            </div>

            {/* Buy Credits Button - Orange CTA */}
            <Button 
              onClick={onBuyCreditsClick}
              size="sm"
              className="hidden sm:flex bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-orange-500/50 h-9"
            >
              {t.nav.buyCredits}
            </Button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-background/30 border border-primary/20 hover:border-primary/40 transition-colors"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4 text-primary" />
              ) : (
                <Moon className="h-4 w-4 text-foreground/70" />
              )}
            </button>

            {/* Language Switcher - Desktop */}
            <div className="hidden lg:flex items-center rounded-lg bg-background/30 border border-primary/20 p-0.5">
              <button
                onClick={() => toggleLanguage('en')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                  language === 'en'
                    ? 'bg-primary text-background'
                    : 'text-foreground/70 hover:text-foreground'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => toggleLanguage('pt-BR')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                  language === 'pt-BR'
                    ? 'bg-primary text-background'
                    : 'text-foreground/70 hover:text-foreground'
                }`}
              >
                PT-BR
              </button>
            </div>

            {/* User Avatar / Settings */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-lg bg-background/30 hover:bg-background/50 border border-primary/20 h-9 w-9 transition-colors">
                  <Avatar className="h-8 w-8">
                    {user?.avatar ? (
                      <AvatarImage src={user.avatar} alt={user?.username || 'User'} />
                    ) : null}
                    <AvatarFallback className="bg-transparent">
                      <User className="h-4 w-4 text-primary" />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-background/95 border-primary/20">
                <DropdownMenuLabel className="text-foreground">
                  {user?.username || user?.name || user?.email || 'user'}
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-primary/10" />
                <DropdownMenuItem onClick={onSettingsClick}>
                  <Settings className="h-4 w-4 mr-2 text-primary" />
                  {t.settings.title}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-primary/10" />
                <DropdownMenuItem onClick={logout}>{t.settings.signOut}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-background/50 transition-colors border border-primary/10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5 text-foreground" />
              ) : (
                <Menu className="h-5 w-5 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-primary/10 animate-fade-in">
            <div className="flex flex-col space-y-2">
              <a 
                href="#" 
                className="px-3 py-2.5 text-sm font-medium text-foreground/70 hover:text-primary hover:bg-background/30 rounded-lg transition-colors"
              >
                {t.nav.dashboard}
              </a>
              <button 
                onClick={() => {
                  onBuyCreditsClick();
                  setMobileMenuOpen(false);
                }}
                className="px-3 py-2.5 text-sm font-medium text-orange-500 hover:text-orange-400 hover:bg-orange-500/10 rounded-lg transition-colors text-left"
              >
                {t.nav.buyCredits}
              </button>
              
              {/* Mobile Language Switcher */}
              <div className="flex items-center space-x-2 px-3 py-2.5">
                <span className="text-xs text-foreground/60">{t.settings.language}:</span>
                <div className="flex items-center rounded-lg bg-background/30 border border-primary/20 p-0.5">
                  <button
                    onClick={() => toggleLanguage('en')}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                      language === 'en'
                        ? 'bg-primary text-background'
                        : 'text-foreground/70 hover:text-foreground'
                    }`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => toggleLanguage('pt-BR')}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                      language === 'pt-BR'
                        ? 'bg-primary text-background'
                        : 'text-foreground/70 hover:text-foreground'
                    }`}
                  >
                    PT-BR
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
