import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

type Language = 'en' | 'pt-BR';

interface Translations {
  nav: {
    dashboard: string;
    buyCredits: string;
    credits: string;
  };
  hero: {
    tagline: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
  };
  input: {
    placeholder: string;
    charCount: string;
    tagsLabel: string;
    tagsTooltip: string;
    selectPlatforms: string;
    platformsSelected: string;
    generate: string;
    generating: string;
  };
  platforms: {
    title: string;
    instagram: string;
    linkedin: string;
    x: string;
    facebook: string;
    tiktok: string;
    confirm: string;
  };
  output: {
    title: string;
    copy: string;
    copied: string;
    noContent: string;
  };
  processing: {
    analyzing: string;
    adapting: string;
    finalizing: string;
  };
  credits: {
    insufficient: string;
    required: string;
    available: string;
    buyNow: string;
    cancel: string;
  };
  buyCredits: {
    title: string;
    subtitle: string;
    currentBalance: string;
    howItWorks: string;
    creditExplain1: string;
    creditExplain2: string;
    creditExplain3: string;
    selectPackage: string;
    popular: string;
    perCredit: string;
    securePayment: string;
  };
  settings: {
    title: string;
    account: string;
    freeAccount: string;
    theme: string;
    darkMode: string;
    lightMode: string;
    language: string;
    signOut: string;
  };
}

const translations: Record<Language, Translations> = {
  en: {
    nav: {
      dashboard: 'Dashboard',
      buyCredits: 'Buy Credits',
      credits: 'credits',
    },
    hero: {
      tagline: 'AI-Powered Content Generation',
      title: 'Transform your ideas into',
      titleHighlight: 'social magic',
      subtitle: 'Create engaging, platform-optimized content for all your social channels in seconds.',
    },
    input: {
      placeholder: 'Describe your content idea, product, or message. Be as detailed as you want...',
      charCount: 'characters',
      tagsLabel: 'Generate hashtags',
      tagsTooltip: '+1 credit for AI-optimized hashtags',
      selectPlatforms: 'Select Platforms',
      platformsSelected: 'platforms selected',
      generate: 'Generate Content',
      generating: 'Generating...',
    },
    platforms: {
      title: 'Select Platforms',
      instagram: 'Instagram',
      linkedin: 'LinkedIn',
      x: 'X (Twitter)',
      facebook: 'Facebook',
      tiktok: 'TikTok',
      confirm: 'Confirm Selection',
    },
    output: {
      title: 'Generated Content',
      copy: 'Copy',
      copied: 'Copied!',
      noContent: 'Your generated content will appear here',
    },
    processing: {
      analyzing: 'Analyzing your content...',
      adapting: 'Adapting for each platform...',
      finalizing: 'Finalizing your copies...',
    },
    credits: {
      insufficient: 'Insufficient Credits',
      required: 'Credits required',
      available: 'Credits available',
      buyNow: 'Buy Credits Now',
      cancel: 'Cancel',
    },
    buyCredits: {
      title: 'Buy Credits',
      subtitle: 'Get more credits to generate amazing content',
      currentBalance: 'Current Balance',
      howItWorks: 'How credits work',
      creditExplain1: '1 credit = 1 platform generation',
      creditExplain2: '+1 credit for AI-optimized hashtags',
      creditExplain3: 'Credits never expire',
      selectPackage: 'Select a package',
      popular: 'Popular',
      perCredit: 'per credit',
      securePayment: 'Secure payment powered by Stripe',
    },
    settings: {
      title: 'Settings',
      account: 'Account',
      freeAccount: 'Free Account',
      theme: 'Theme',
      darkMode: 'Dark',
      lightMode: 'Light',
      language: 'Language',
      signOut: 'Sign out',
    },
  },
  'pt-BR': {
    nav: {
      dashboard: 'Painel',
      buyCredits: 'Comprar Créditos',
      credits: 'créditos',
    },
    hero: {
      tagline: 'Geração de Conteúdo com IA',
      title: 'Transforme suas ideias em',
      titleHighlight: 'magia social',
      subtitle: 'Crie conteúdo envolvente e otimizado para todas as suas redes sociais em segundos.',
    },
    input: {
      placeholder: 'Descreva sua ideia de conteúdo, produto ou mensagem. Seja o mais detalhado possível...',
      charCount: 'caracteres',
      tagsLabel: 'Gerar hashtags',
      tagsTooltip: '+1 crédito para hashtags otimizadas por IA',
      selectPlatforms: 'Selecionar Plataformas',
      platformsSelected: 'plataformas selecionadas',
      generate: 'Gerar Conteúdo',
      generating: 'Gerando...',
    },
    platforms: {
      title: 'Selecionar Plataformas',
      instagram: 'Instagram',
      linkedin: 'LinkedIn',
      x: 'X (Twitter)',
      facebook: 'Facebook',
      tiktok: 'TikTok',
      confirm: 'Confirmar Seleção',
    },
    output: {
      title: 'Conteúdo Gerado',
      copy: 'Copiar',
      copied: 'Copiado!',
      noContent: 'Seu conteúdo gerado aparecerá aqui',
    },
    processing: {
      analyzing: 'Analisando seu conteúdo...',
      adapting: 'Adaptando para cada plataforma...',
      finalizing: 'Finalizando suas copies...',
    },
    credits: {
      insufficient: 'Créditos Insuficientes',
      required: 'Créditos necessários',
      available: 'Créditos disponíveis',
      buyNow: 'Comprar Créditos',
      cancel: 'Cancelar',
    },
    buyCredits: {
      title: 'Comprar Créditos',
      subtitle: 'Obtenha mais créditos para gerar conteúdo incrível',
      currentBalance: 'Saldo Atual',
      howItWorks: 'Como funcionam os créditos',
      creditExplain1: '1 crédito = 1 geração por plataforma',
      creditExplain2: '+1 crédito para hashtags otimizadas por IA',
      creditExplain3: 'Créditos nunca expiram',
      selectPackage: 'Selecione um pacote',
      popular: 'Popular',
      perCredit: 'por crédito',
      securePayment: 'Pagamento seguro via Stripe',
    },
    settings: {
      title: 'Configurações',
      account: 'Conta',
      freeAccount: 'Conta Gratuita',
      theme: 'Tema',
      darkMode: 'Escuro',
      lightMode: 'Claro',
      language: 'Idioma',
      signOut: 'Sair',
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
  }, []);

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export type { Language, Translations };
