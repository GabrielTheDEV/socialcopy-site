import React from 'react';
import { Check, Loader2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export type ProcessingStep = 'analyzing' | 'adapting' | 'finalizing' | 'complete';

interface ProcessingFeedbackProps {
  currentStep: ProcessingStep;
}

const ProcessingFeedback: React.FC<ProcessingFeedbackProps> = ({ currentStep }) => {
  const { t } = useLanguage();

  const steps: { id: ProcessingStep; label: string }[] = [
    { id: 'analyzing', label: t.processing.analyzing },
    { id: 'adapting', label: t.processing.adapting },
    { id: 'finalizing', label: t.processing.finalizing },
  ];

  const getStepStatus = (stepId: ProcessingStep): 'pending' | 'active' | 'complete' => {
    const stepOrder: ProcessingStep[] = ['analyzing', 'adapting', 'finalizing', 'complete'];
    const currentIndex = stepOrder.indexOf(currentStep);
    const stepIndex = stepOrder.indexOf(stepId);

    if (currentIndex > stepIndex) return 'complete';
    if (currentIndex === stepIndex) return 'active';
    return 'pending';
  };

  return (
    <div className="w-full p-6 rounded-2xl bg-secondary/50 border border-border animate-fade-in">
      <div className="flex flex-col space-y-4">
        {steps.map((step, index) => {
          const status = getStepStatus(step.id);
          return (
            <div
              key={step.id}
              className={`flex items-center space-x-4 transition-opacity duration-300 ${
                status === 'pending' ? 'opacity-40' : 'opacity-100'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  status === 'complete'
                    ? 'bg-primary text-primary-foreground'
                    : status === 'active'
                    ? 'bg-primary/20 border-2 border-primary'
                    : 'bg-secondary border border-border'
                }`}
              >
                {status === 'complete' ? (
                  <Check className="h-4 w-4" />
                ) : status === 'active' ? (
                  <Loader2 className="h-4 w-4 text-primary animate-spin" />
                ) : (
                  <span className="text-xs text-muted-foreground">{index + 1}</span>
                )}
              </div>
              <span
                className={`text-sm font-medium transition-colors ${
                  status === 'active'
                    ? 'text-foreground'
                    : status === 'complete'
                    ? 'text-muted-foreground'
                    : 'text-muted-foreground/50'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProcessingFeedback;
