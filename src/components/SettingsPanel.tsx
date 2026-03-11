import React from 'react';
import { Moon, Sun, Globe, User, LogOut } from 'lucide-react';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { useTheme, Theme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  isOpen,
  onClose,
}) => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();
  const isMobile = useIsMobile();

  const themeOptions: { value: Theme; label: string; icon: React.ReactNode }[] = [
    { value: 'dark', label: t.settings.darkMode, icon: <Moon className="h-4 w-4" /> },
    { value: 'light', label: t.settings.lightMode, icon: <Sun className="h-4 w-4" /> },
  ];

  const languageOptions: { value: Language; label: string }[] = [
    { value: 'en', label: 'English' },
    { value: 'pt-BR', label: 'Português (BR)' },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent 
        side={isMobile ? 'bottom' : 'right'}
        className={`
          ${isMobile 
            ? 'h-[70vh] rounded-t-2xl' 
            : 'w-[380px] sm:max-w-[380px]'
          }
          bg-background border-border
        `}
      >
        <div className="flex flex-col h-full">
          <SheetHeader className="pb-6 border-b border-border">
            <SheetTitle className="text-xl font-semibold text-foreground">
              {t.settings.title}
            </SheetTitle>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto py-6 space-y-8">
            {/* Account Section */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                {t.settings.account}
              </h3>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 border border-border/50">
                <Avatar className="h-10 w-10">
                  {user?.avatar ? (
                    <AvatarImage src={user.avatar} alt={user?.username || 'User'} />
                  ) : null}
                  <AvatarFallback className="bg-primary/10">
                    <User className="h-5 w-5 text-primary" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {user?.username || user?.name || user?.email || 'user'}
                  </p>
                  <p className="text-xs text-muted-foreground">{t.settings.freeAccount}</p>
                </div>
              </div>
            </div>

            {/* Theme Section */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                {t.settings.theme}
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {themeOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setTheme(option.value)}
                    className={`
                      flex items-center gap-2 p-3 rounded-xl border transition-all duration-200
                      ${theme === option.value 
                        ? 'border-primary bg-primary/10 text-foreground' 
                        : 'border-border/50 bg-card/50 text-muted-foreground hover:border-border hover:bg-muted/30'
                      }
                    `}
                  >
                    {option.icon}
                    <span className="text-sm font-medium">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Language Section */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                <Globe className="h-4 w-4" />
                {t.settings.language}
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {languageOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setLanguage(option.value)}
                    className={`
                      flex items-center justify-between p-3 rounded-xl border transition-all duration-200
                      ${language === option.value 
                        ? 'border-primary bg-primary/10 text-foreground' 
                        : 'border-border/50 bg-card/50 text-muted-foreground hover:border-border hover:bg-muted/30'
                      }
                    `}
                  >
                    <span className="text-sm font-medium">{option.label}</span>
                    {language === option.value && (
                      <span className="w-2 h-2 rounded-full bg-primary" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-border mt-auto">
            <Button 
              variant="ghost" 
              className="w-full justify-start text-muted-foreground hover:text-foreground"
              onClick={logout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              {t.settings.signOut}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SettingsPanel;
