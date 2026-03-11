import React from 'react';
import { Zap, Sparkles, Crown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';

interface CreditPackage {
  id: string;
  credits: number;
  price: number;
  popular?: boolean;
  icon: React.ReactNode;
}

interface BuyCreditsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentCredits: number;
}

const BuyCreditsDrawer: React.FC<BuyCreditsDrawerProps> = ({
  isOpen,
  onClose,
  currentCredits,
}) => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  const packages: CreditPackage[] = [
    { id: 'starter', credits: 50, price: 9, icon: <Zap className="h-5 w-5" /> },
    { id: 'popular', credits: 150, price: 19, popular: true, icon: <Sparkles className="h-5 w-5" /> },
    { id: 'pro', credits: 500, price: 49, icon: <Crown className="h-5 w-5" /> },
  ];

  const handlePurchase = () => {
    // In production, this would trigger checkout
    // TODO: Integrate with payment gateway (Stripe, etc)
    onClose();
  };

  const content = (
    <div className="flex flex-col h-full">
      <SheetHeader className="pb-6 border-b border-border">
        <SheetTitle className="text-xl font-semibold text-foreground">
          {t.buyCredits.title}
        </SheetTitle>
        <p className="text-sm text-muted-foreground mt-1">
          {t.buyCredits.subtitle}
        </p>
      </SheetHeader>

      <div className="flex-1 overflow-y-auto py-6">
        {/* Current Credits */}
        <div className="mb-6 p-4 rounded-xl bg-muted/30 border border-border/50">
          <p className="text-sm text-muted-foreground">{t.buyCredits.currentBalance}</p>
          <p className="text-2xl font-bold text-foreground mt-1">
            {currentCredits} <span className="text-sm font-normal text-muted-foreground">{t.nav.credits}</span>
          </p>
        </div>

        {/* Credit Usage Explanation */}
        <div className="mb-6 space-y-2">
          <h3 className="text-sm font-medium text-foreground">{t.buyCredits.howItWorks}</h3>
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              {t.buyCredits.creditExplain1}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              {t.buyCredits.creditExplain2}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              {t.buyCredits.creditExplain3}
            </li>
          </ul>
        </div>

        {/* Packages */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground mb-3">{t.buyCredits.selectPackage}</h3>
          {packages.map((pkg) => (
            <button
              key={pkg.id}
              onClick={() => handlePurchase(pkg.id)}
              className={`
                w-full p-4 rounded-xl border transition-all duration-200
                hover:border-primary/50 hover:bg-primary/5 active:scale-[0.98]
                ${pkg.popular 
                  ? 'border-primary/50 bg-primary/5 ring-1 ring-primary/20' 
                  : 'border-border/50 bg-card/50'
                }
              `}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`
                    p-2.5 rounded-lg
                    ${pkg.popular ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}
                  `}>
                    {pkg.icon}
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">
                        {pkg.credits} {t.nav.credits}
                      </span>
                      {pkg.popular && (
                        <span className="px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide bg-primary text-primary-foreground rounded-full">
                          {t.buyCredits.popular}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      ${(pkg.price / pkg.credits).toFixed(2)} {t.buyCredits.perCredit}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-foreground">${pkg.price}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-border mt-auto">
        <p className="text-xs text-center text-muted-foreground">
          {t.buyCredits.securePayment}
        </p>
      </div>
    </div>
  );

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent 
        side={isMobile ? 'bottom' : 'right'}
        className={`
          ${isMobile 
            ? 'h-[85vh] rounded-t-2xl' 
            : 'w-[400px] sm:max-w-[400px]'
          }
          bg-background border-border
        `}
      >
        {content}
      </SheetContent>
    </Sheet>
  );
};

export default BuyCreditsDrawer;
