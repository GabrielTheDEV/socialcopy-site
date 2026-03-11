import React, { useState, useCallback, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import Navigation from '@/components/Navigation';
import AnimatedBackground from '@/components/AnimatedBackground';
import ContentInput, { Platform } from '@/components/ContentInput';
import ProcessingFeedback, { ProcessingStep } from '@/components/ProcessingFeedback';
import OutputSection from '@/components/OutputSection';
import InsufficientCreditsModal from '@/components/InsufficientCreditsModal';
import BuyCreditsDrawer from '@/components/BuyCreditsDrawer';
import SettingsPanel from '@/components/SettingsPanel';
import { useGenerate } from '@/hooks/useApi';
import { useAuth } from '@/contexts/AuthContext';

interface GeneratedContent {
  platform: Platform;
  content: string;
  hashtags?: string[];
}

// Mock content generation - in production this would call an API
const mockGeneratedContent: Record<Platform, { content: string; hashtags: string[] }> = {
  instagram: {
    content: "✨ Ready to transform your social media game? Our latest solution makes content creation effortless and engaging!\n\n💡 Whether you're a startup founder or marketing pro, creating scroll-stopping content has never been easier.\n\n🚀 Join thousands of creators who've already discovered the secret to consistent, high-quality posts.",
    hashtags: ['#ContentCreation', '#SocialMediaMarketing', '#DigitalMarketing', '#StartupLife', '#MarketingTips'],
  },
  linkedin: {
    content: "The way we create content is evolving.\n\nAfter months of research and development, I'm excited to share how AI is transforming the content creation landscape for professionals.\n\nHere's what I've learned:\n\n→ Consistency beats perfection\n→ Authentic voice matters more than ever\n→ The right tools amplify your message\n\nThe future of professional content is here, and it's more accessible than you think.\n\nWhat's your biggest challenge with content creation?",
    hashtags: ['#ProfessionalDevelopment', '#ContentStrategy', '#AIinBusiness'],
  },
  x: {
    content: "Just discovered the future of content creation 🧵\n\nStop spending hours on social media posts.\n\nStart creating content that actually converts.\n\nHere's how 👇",
    hashtags: ['#ContentCreator', '#MarketingTwitter'],
  },
  facebook: {
    content: "🎉 Exciting news for all content creators!\n\nTired of staring at a blank screen, wondering what to post?\n\nWe get it. Creating engaging content for multiple platforms is exhausting. That's exactly why we built something special.\n\nImagine having a creative partner that understands your brand voice and helps you craft the perfect message for every platform.\n\nDrop a 🙌 in the comments if you're ready to level up your content game!",
    hashtags: ['#SmallBusiness', '#ContentMarketing', '#SocialMediaTips'],
  },
  tiktok: {
    content: "POV: You finally found the secret to viral content 🤫\n\nNo more:\n❌ Writer's block\n❌ Inconsistent posting\n❌ Boring captions\n\nYes to:\n✅ Scroll-stopping content\n✅ Posts that actually connect\n✅ More time for what matters\n\nStitch this if you need this in your life 👀",
    hashtags: ['#ContentCreatorLife', '#SocialMediaHacks', '#MarketingTok', '#CreatorEconomy'],
  },
};

const Dashboard: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [credits, setCredits] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [processingStep, setProcessingStep] = useState<ProcessingStep | null>(null);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent[]>([]);
  const [showCreditsModal, setShowCreditsModal] = useState(false);
  const [showBuyCreditsDrawer, setShowBuyCreditsDrawer] = useState(false);
  const [showSettingsPanel, setShowSettingsPanel] = useState(false);
  const [requiredCredits, setRequiredCredits] = useState(0);
  const { generate } = useGenerate();

  useEffect(() => {
    setCredits((user?.coins ?? 0) + 100);
  }, [user?.coins]);

  const calculateCredits = (platforms: Platform[], includeTags: boolean): number => {
    return platforms.length + (includeTags ? 1 : 0);
  };

  const handleGenerate = useCallback(async (
    content: string,
    platforms: Platform[],
    includeTags: boolean,
    requestLanguage: string
  ) => {
    const required = calculateCredits(platforms, includeTags);

    if (credits < required) {
      setRequiredCredits(required);
      setShowCreditsModal(true);
      return;
    }

    setIsGenerating(true);
    setGeneratedContent([]);

    try {
      setProcessingStep('analyzing');

      const tone = requestLanguage === 'pt-BR' ? 'profissional e persuasivo' : 'professional and persuasive';
      const socialNetworks = platforms.map((p: Platform) => {
        switch (p) {
          case 'instagram': return 'INSTAGRAM';
          case 'linkedin': return 'LINKEDIN';
          case 'x': return 'TWITTER';
          case 'facebook': return 'FACEBOOK';
          case 'tiktok': return 'TIKTOK';
          default: return (p as string).toUpperCase(); 
        }
      });

      const apiResult = await generate({
        baseText: content,
        language: requestLanguage,
        tone,
        includeHashtags: includeTags,
        socialNetworks,
      });

      // Small visual pacing between steps
      setProcessingStep('adapting');
      await new Promise((r) => setTimeout(r, 400));

      setProcessingStep('finalizing');
      await new Promise((r) => setTimeout(r, 400));

      setProcessingStep('complete');

      // Prefer API results when available; fallback to mock per-platform only if missing
      const results: GeneratedContent[] = (Array.isArray(apiResult) && apiResult.length > 0
        ? apiResult.map((r: unknown) => {
          const rRecord = r as Record<string, unknown>;
          const platKey = String(rRecord.platform || '').toLowerCase();
          const isKnown = Object.keys(mockGeneratedContent).includes(platKey);
          return {
            platform: (isKnown ? (platKey as Platform) : (rRecord.platform as Platform)),
            content: rRecord.content ?? (isKnown ? mockGeneratedContent[platKey as Platform].content : ''),
            hashtags: rRecord.hashtags ?? (includeTags && isKnown ? mockGeneratedContent[platKey as Platform].hashtags : undefined),
          } as GeneratedContent;
        })
        : platforms.map((platform) => ({
          platform,
          content: mockGeneratedContent[platform].content,
          hashtags: includeTags ? mockGeneratedContent[platform].hashtags : undefined,
        }))
      );

      setGeneratedContent(results);
      setCredits((prev) => prev - required);
    } catch {
      // Fallback to mock data on error
      const results: GeneratedContent[] = platforms.map((platform) => ({
        platform,
        content: mockGeneratedContent[platform].content,
        hashtags: includeTags ? mockGeneratedContent[platform].hashtags : undefined,
      }));

      setGeneratedContent(results);
      setCredits((prev) => prev - required);
    } finally {
      setIsGenerating(false);
      setProcessingStep(null);
    }
  }, [credits, generate]);

  const handleBuyCredits = () => {
    setShowCreditsModal(false);
    setShowBuyCreditsDrawer(true);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen relative overflow-hidden">
        <AnimatedBackground />
        <Navigation 
          credits={credits} 
          onBuyCreditsClick={() => setShowBuyCreditsDrawer(true)}
          onSettingsClick={() => setShowSettingsPanel(true)}
        />
      
      <main className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Hero Section - Premium Landing Page */}
          <div className="text-center mb-16 animate-fade-in">
            {/* AI-Powered Badge */}
            <div className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/30 mb-6 backdrop-blur-sm hover:border-orange-500/50 transition-all duration-300">
              <Sparkles className="h-4 w-4 text-orange-500" />
              <span className="text-xs font-semibold text-orange-500 uppercase tracking-wide">{t.hero.tagline}</span>
            </div>

            {/* Main Headline with Teal/Cyan Highlight */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 tracking-tight leading-tight">
              {t.hero.title}{' '}
              <span className="text-gradient">{t.hero.titleHighlight}</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-foreground/70 max-w-2xl mx-auto mb-12 leading-relaxed">
              {t.hero.subtitle}
            </p>
          </div>

          {/* Output Section - Above Input (Hidden until generated) */}
          {generatedContent.length > 0 && (
            <div className="mb-8 animate-fade-in">
              <OutputSection generatedContent={generatedContent} />
            </div>
          )}

          {/* Processing Feedback - Above Input when active */}
          {processingStep && processingStep !== 'complete' && (
            <div className="mb-6">
              <ProcessingFeedback currentStep={processingStep} />
            </div>
          )}

          {/* Input Section - Center Focus */}
          <div className="max-w-3xl mx-auto">
            <ContentInput
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
            />
          </div>
        </div>
      </main>

      {/* Insufficient Credits Modal */}
      <InsufficientCreditsModal
        isOpen={showCreditsModal}
        onClose={() => setShowCreditsModal(false)}
        creditsRequired={requiredCredits}
        creditsAvailable={credits}
        onBuyCredits={handleBuyCredits}
      />

      {/* Buy Credits Drawer */}
      <BuyCreditsDrawer
        isOpen={showBuyCreditsDrawer}
        onClose={() => setShowBuyCreditsDrawer(false)}
        currentCredits={credits}
      />

      {/* Buy Credits Drawer */}
      <BuyCreditsDrawer
        isOpen={showBuyCreditsDrawer}
        onClose={() => setShowBuyCreditsDrawer(false)}
        currentCredits={credits}
      />

      {/* Settings Panel */}
      <SettingsPanel
        isOpen={showSettingsPanel}
        onClose={() => setShowSettingsPanel(false)}
      />
      </div>
    </ThemeProvider>
  );
};

export default Dashboard;
