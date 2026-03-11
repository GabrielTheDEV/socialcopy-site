import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthModal } from "@/contexts/AuthModalContext";
import AnimatedArrow from "./AnimatedArrow";

const HeroSection = () => {
  const { openModal } = useAuthModal();

  return (
    <section className="hero-section relative overflow-hidden min-h-screen flex items-center">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-8"
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">By Barbozza</span>
          </motion.div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-hero-foreground leading-tight mb-6 text-balance">
            Cansado de{" "}
            <span className="gradient-text">perder horas</span>{" "}
            criando conteúdo que ninguém engaja?
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-hero-muted max-w-2xl mx-auto mb-10 leading-relaxed">
            Transforme suas ideias em copies irresistíveis para todas as redes sociais em segundos. 
            Sem bloqueio criativo. Sem perda de tempo. Só resultados.
          </p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button variant="heroAccent" size="xl" onClick={openModal}>
              Criar conta grátis
              <ArrowRight className="w-5 h-5" />
            </Button>
            <AnimatedArrow />
          </motion.div>

          {/* Trust indicators */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-8 text-sm text-hero-muted"
          >
            ✓ Sem cartão de crédito &nbsp;•&nbsp; ✓ Comece em segundos &nbsp;•&nbsp; ✓ Cancele quando quiser
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
