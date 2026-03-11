import React, { useState, useRef, useEffect } from 'react';
import { Hash, Info, ChevronDown, Loader2, Instagram, Linkedin, Twitter, Facebook, Music } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import PlatformSelector from './PlatformSelector';

export type Platform = 'instagram' | 'linkedin' | 'x' | 'facebook' | 'tiktok';

interface ContentInputProps {
  onGenerate: (content: string, platforms: Platform[], includeTags: boolean, requestLanguage: string) => void;
  isGenerating: boolean;
}

const ContentInput: React.FC<ContentInputProps> = ({ onGenerate, isGenerating }) => {
  const { t } = useLanguage();
  const defaultRequestLang = (useLanguage().language === 'pt-BR') ? 'pt-BR' : 'en-US';
  const [content, setContent] = useState('');
  const [includeTags, setIncludeTags] = useState(false);
  const [requestLanguage, setRequestLanguage] = useState<string>(defaultRequestLang);
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>(['instagram', 'linkedin']);
  const [isPlatformModalOpen, setIsPlatformModalOpen] = useState(false);
  const [optionsOpen, setOptionsOpen] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.max(140, textareaRef.current.scrollHeight)}px`;
    }
  }, [content]);

  const handleGenerate = () => {
    if (content.trim() && selectedPlatforms.length > 0) {
      onGenerate(content, selectedPlatforms, includeTags, requestLanguage);
    }
  };

  const platformIcons: Record<Platform, React.ReactNode> = {
    instagram: (
      <div className="h-4 w-4 md:h-6 md:w-6 rounded-full flex items-center justify-center bg-gradient-to-br from-pink-500 via-purple-500 to-orange-400 text-white">
        <Instagram className="h-2 w-2 md:h-3 md:w-3" />
      </div>
    ),
    linkedin: (
      <div className="h-4 w-4 md:h-6 md:w-6 rounded-full flex items-center justify-center bg-[#0A66C2] text-white">
        <Linkedin className="h-2 w-2 md:h-3 md:w-3" />
      </div>
    ),
    x: (
      <div className="h-4 w-4 md:h-6 md:w-6 rounded-full flex items-center justify-center bg-neutral-800 text-white">
        <Twitter className="h-2 w-2 md:h-3 md:w-3" />
      </div>
    ),
    facebook: (
      <div className="h-4 w-4 md:h-6 md:w-6 rounded-full flex items-center justify-center bg-[#1877F2] text-white">
        <Facebook className="h-2 w-2 md:h-3 md:w-3" />
      </div>
    ),
    tiktok: (
      <div className="h-4 w-4 md:h-6 md:w-6 rounded-full flex items-center justify-center bg-black text-white">
        <Music className="h-2 w-2 md:h-3 md:w-3" />
      </div>
    ),
  };

  return (
    <div className="w-full space-y-4 animate-fade-in">
      {/* Main Textarea - Center Focus */}
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={t.input.placeholder}
          className="w-full min-h-[140px] p-5 text-base text-foreground placeholder:text-muted-foreground/60 bg-card border border-border rounded-xl resize-none focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary/50 transition-all"
          disabled={isGenerating}
        />
        <div className="absolute bottom-4 right-4 text-xs text-muted-foreground/60">
          {content.length} {t.input.charCount}
        </div>
      </div>

      {/* Options Panel - Collapsible on Mobile */}
      <Collapsible open={optionsOpen} onOpenChange={setOptionsOpen} className="md:block">
        <CollapsibleTrigger className="md:hidden flex items-center justify-between w-full px-4 py-3 bg-card border border-border rounded-lg">
          <span className="text-sm font-medium text-foreground">Options</span>
          <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${optionsOpen ? 'rotate-180' : ''}`} />
        </CollapsibleTrigger>
        
        <CollapsibleContent className="md:!block">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mt-3 md:mt-0 p-4 md:p-0 bg-card md:bg-transparent border md:border-0 border-border rounded-lg md:rounded-none">
            {/* Tags Toggle */}
            <div className="flex items-center space-x-3">
              <Switch
                checked={includeTags}
                onCheckedChange={setIncludeTags}
                disabled={isGenerating}
              />
              <div className="flex items-center space-x-2">
                <Hash className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground">{t.input.tagsLabel}</span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">{t.input.tagsTooltip}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>

            {/* Request language selector */}
            <div className="flex items-center">
              <select
                value={requestLanguage}
                onChange={(e) => setRequestLanguage(e.target.value)}
                disabled={isGenerating}
                className="text-sm px-2 py-1 border border-border rounded-md bg-card"
              >
                <option value="pt-BR">Português (pt-BR)</option>
                <option value="en-US">English (en-US)</option>
              </select>
            </div>

            {/* Platform Selector Button */}
            <button
              onClick={() => setIsPlatformModalOpen(true)}
              disabled={isGenerating}
              className="flex items-center space-x-2 px-4 py-2.5 bg-muted/50 border border-border rounded-lg hover:bg-muted hover:border-border/80 transition-all group disabled:opacity-50"
            >
              <div className="flex -space-x-1">
                {selectedPlatforms.slice(0, 3).map((platform, idx) => (
                  <span key={platform} className={`inline-flex ${idx === 0 ? '' : '-ml-1 md:-ml-1'}`}>
                    {platformIcons[platform]}
                  </span>
                ))}
                {selectedPlatforms.length > 3 && (
                  <span className="text-xs text-muted-foreground ml-2">
                    +{selectedPlatforms.length - 3}
                  </span>
                )}
              </div>
              <span className="text-sm text-muted-foreground">
                {selectedPlatforms.length} {t.input.platformsSelected}
              </span>
              <ChevronDown className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </button>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Generate Button */}
      <Button
        onClick={handleGenerate}
        disabled={!content.trim() || selectedPlatforms.length === 0 || isGenerating}
        className="w-full h-12 text-base font-semibold bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-orange-500/50 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {isGenerating ? (
          <span className="flex items-center space-x-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>{t.input.generating}</span>
          </span>
        ) : (
          t.input.generate
        )}
      </Button>

      {/* Platform Selector Modal */}
      <PlatformSelector
        isOpen={isPlatformModalOpen}
        onClose={() => setIsPlatformModalOpen(false)}
        selectedPlatforms={selectedPlatforms}
        onSelectionChange={setSelectedPlatforms}
      />
    </div>
  );
};

export default ContentInput;