import React, { useState } from 'react';
import { Copy, Check, Instagram, Linkedin, Facebook } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Platform } from './ContentInput';

interface OutputCardProps {
  platform: Platform;
  content: string;
  hashtags?: string[];
  delay?: number;
}

const platformConfig: Record<Platform, { 
  name: string; 
  icon: React.ReactNode; 
  gradient: string;
  iconBg: string;
}> = {
  instagram: {
    name: 'Instagram',
    icon: <Instagram className="h-4 w-4" />,
    gradient: 'from-pink-500 via-purple-500 to-orange-400',
    iconBg: 'bg-gradient-to-br from-pink-500 via-purple-500 to-orange-400',
  },
  linkedin: {
    name: 'LinkedIn',
    icon: <Linkedin className="h-4 w-4" />,
    gradient: 'from-blue-600 to-blue-700',
    iconBg: 'bg-[#0A66C2]',
  },
  x: {
    name: 'X (Twitter)',
    icon: <span className="text-sm font-bold">𝕏</span>,
    gradient: 'from-neutral-700 to-neutral-900',
    iconBg: 'bg-neutral-900',
  },
  facebook: {
    name: 'Facebook',
    icon: <Facebook className="h-4 w-4" />,
    gradient: 'from-blue-500 to-blue-600',
    iconBg: 'bg-[#1877F2]',
  },
  tiktok: {
    name: 'TikTok',
    icon: <span className="text-sm">🎵</span>,
    gradient: 'from-neutral-900 via-pink-500 to-cyan-400',
    iconBg: 'bg-neutral-900',
  },
};

const OutputCard: React.FC<OutputCardProps> = ({ platform, content, hashtags, delay = 0 }) => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const config = platformConfig[platform];

  // Extract hashtags from content and combine with provided hashtags
  const extractHashtagsFromContent = (text: string) => {
    const matches = Array.from(text.matchAll(/#[\p{L}\p{N}_-]+/gu));
    return matches.map(m => m[0]);
  };

  const contentHashtags = extractHashtagsFromContent(content);
  const allHashtags = [...new Set([...contentHashtags, ...(hashtags || [])])];

  // Remove hashtags from content for display
  const cleanContent = content.replace(/#[\p{L}\p{N}_-]+/gu, '').trim();

  const handleCopy = async () => {
    const textToCopy = allHashtags.length > 0 
      ? `${cleanContent}\n\n${allHashtags.join(' ')}`
      : cleanContent;
    
    await navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="w-full h-full rounded-xl bg-card border border-border overflow-hidden animate-fade-in-up transition-all duration-300 hover:border-border/80 hover:shadow-lg hover:shadow-primary/5"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
        <div className="flex items-center space-x-3">
          <div className={`p-1.5 rounded-lg ${config.iconBg} text-white`}>
            {config.icon}
          </div>
          <span className="font-medium text-sm text-foreground">{config.name} Copy</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className={`h-8 px-3 text-xs transition-all ${copied ? 'text-green-500' : 'text-muted-foreground hover:text-foreground'}`}
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 mr-1.5" />
              {t.output.copied}
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5 mr-1.5" />
              {t.output.copy}
            </>
          )}
        </Button>
      </div>

      {/* Content */}
      <div className="p-4 max-h-[280px] overflow-y-auto">
        <p className="text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed">
          {cleanContent}
        </p>
        
        {allHashtags.length > 0 && (
          <div className="mt-4 pt-3 border-t border-border/50">
            <div className="flex flex-wrap gap-1.5">
              {allHashtags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-2 py-0.5 text-xs font-medium text-orange-500/80 bg-orange-500/10 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OutputCard;