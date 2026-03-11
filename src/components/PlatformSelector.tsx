import React from 'react';
import { Check, Instagram, Linkedin, Facebook } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { useIsMobile } from '@/hooks/use-mobile';
import { Platform } from './ContentInput';

interface PlatformSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlatforms: Platform[];
  onSelectionChange: (platforms: Platform[]) => void;
}

const platforms: { id: Platform; name: string; icon: React.ReactNode; color: string }[] = [
  { 
    id: 'instagram', 
    name: 'Instagram', 
    icon: <Instagram className="h-6 w-6" />,
    color: 'from-pink-500 to-purple-500'
  },
  { 
    id: 'linkedin', 
    name: 'LinkedIn', 
    icon: <Linkedin className="h-6 w-6" />,
    color: 'from-blue-600 to-blue-700'
  },
  { 
    id: 'x', 
    name: 'X (Twitter)', 
    icon: <span className="text-xl font-bold">𝕏</span>,
    color: 'from-gray-800 to-gray-900'
  },
  { 
    id: 'facebook', 
    name: 'Facebook', 
    icon: <Facebook className="h-6 w-6" />,
    color: 'from-blue-500 to-blue-600'
  },
  { 
    id: 'tiktok', 
    name: 'TikTok', 
    icon: <span className="text-xl">🎵</span>,
    color: 'from-gray-900 via-pink-500 to-cyan-400'
  },
];

const PlatformSelector: React.FC<PlatformSelectorProps> = ({
  isOpen,
  onClose,
  selectedPlatforms,
  onSelectionChange,
}) => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  const togglePlatform = (platformId: Platform) => {
    if (selectedPlatforms.includes(platformId)) {
      onSelectionChange(selectedPlatforms.filter((p) => p !== platformId));
    } else {
      onSelectionChange([...selectedPlatforms, platformId]);
    }
  };

  const content = (
    <div className="space-y-4 py-4">
      <div className="grid grid-cols-1 gap-3">
        {platforms.map((platform) => {
          const isSelected = selectedPlatforms.includes(platform.id);
          return (
            <button
              key={platform.id}
              onClick={() => togglePlatform(platform.id)}
              className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                isSelected
                  ? 'border-primary bg-primary/10'
                  : 'border-border bg-secondary/50 hover:border-muted-foreground/50'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-lg bg-gradient-to-br ${platform.color} text-white`}>
                  {platform.icon}
                </div>
                <span className="font-medium text-foreground">{platform.name}</span>
              </div>
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  isSelected
                    ? 'border-primary bg-primary'
                    : 'border-muted-foreground/50'
                }`}
              >
                {isSelected && <Check className="h-4 w-4 text-primary-foreground" />}
              </div>
            </button>
          );
        })}
      </div>

      <Button
        onClick={onClose}
        className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-orange-500/50"
      >
        {t.platforms.confirm}
      </Button>
    </div>
  );

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DrawerContent className="px-4 pb-8">
          <DrawerHeader className="text-left">
            <DrawerTitle className="text-xl font-semibold">{t.platforms.title}</DrawerTitle>
          </DrawerHeader>
          {content}
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">{t.platforms.title}</DialogTitle>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  );
};

export default PlatformSelector;
