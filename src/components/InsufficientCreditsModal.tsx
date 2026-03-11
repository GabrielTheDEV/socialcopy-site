import React from 'react';
import { Coins, AlertCircle } from 'lucide-react';
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

interface InsufficientCreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
  creditsRequired: number;
  creditsAvailable: number;
  onBuyCredits: () => void;
}

const InsufficientCreditsModal: React.FC<InsufficientCreditsModalProps> = ({
  isOpen,
  onClose,
  creditsRequired,
  creditsAvailable,
  onBuyCredits,
}) => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  const content = (
    <div className="space-y-6 py-4">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
          <AlertCircle className="h-8 w-8 text-destructive" />
        </div>
        
        <div className="space-y-4 w-full">
          <div className="flex justify-between items-center p-4 rounded-xl bg-secondary/50 border border-border">
            <span className="text-sm text-muted-foreground">{t.credits.required}</span>
            <div className="flex items-center space-x-2">
              <Coins className="h-4 w-4 text-primary" />
              <span className="font-semibold text-foreground">{creditsRequired}</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center p-4 rounded-xl bg-secondary/50 border border-border">
            <span className="text-sm text-muted-foreground">{t.credits.available}</span>
            <div className="flex items-center space-x-2">
              <Coins className="h-4 w-4 text-destructive" />
              <span className="font-semibold text-destructive">{creditsAvailable}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-3">
        <Button
          onClick={onBuyCredits}
          className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold glow-primary-sm"
        >
          <Coins className="h-5 w-5 mr-2" />
          {t.credits.buyNow}
        </Button>
        <Button
          variant="outline"
          onClick={onClose}
          className="w-full h-12 border-border hover:bg-secondary"
        >
          {t.credits.cancel}
        </Button>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DrawerContent className="px-4 pb-8">
          <DrawerHeader className="text-left">
            <DrawerTitle className="text-xl font-semibold text-center">{t.credits.insufficient}</DrawerTitle>
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
          <DialogTitle className="text-xl font-semibold text-center">{t.credits.insufficient}</DialogTitle>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  );
};

export default InsufficientCreditsModal;
