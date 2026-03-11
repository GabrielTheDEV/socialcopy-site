import { motion } from "framer-motion";
import { Sparkles, Zap, Target } from "lucide-react";

const SolutionSection = () => {
  return (
    <section className="section-padding hero-section relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">A solução que você precisa</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-hero-foreground mb-6">
            Conheça o{" "}
            <span className="gradient-text">SocialCopy</span>
          </h2>
          <p className="text-lg md:text-xl text-hero-muted max-w-3xl mx-auto leading-relaxed">
            Uma ferramenta de inteligência artificial que transforma suas ideias em copies prontas para postar 
            em qualquer rede social. Profissionais. Persuasivas. Em segundos.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center p-8 rounded-2xl bg-hero-foreground/5 border border-hero-foreground/10 backdrop-blur-sm"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-6">
              <Zap className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-hero-foreground mb-3">
              IA de última geração
            </h3>
            <p className="text-hero-muted">
              Treinada para criar copies que convertem, usando técnicas avançadas de copywriting e neuromarketing.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center p-8 rounded-2xl bg-hero-foreground/5 border border-hero-foreground/10 backdrop-blur-sm"
          >
            <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center mx-auto mb-6">
              <Target className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-xl font-semibold text-hero-foreground mb-3">
              Múltiplas plataformas
            </h3>
            <p className="text-hero-muted">
              Instagram, LinkedIn, Twitter, Facebook, TikTok... Uma única ideia, copies adaptadas para cada rede.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center p-8 rounded-2xl bg-hero-foreground/5 border border-hero-foreground/10 backdrop-blur-sm"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-hero-foreground mb-3">
              Zero bloqueio criativo
            </h3>
            <p className="text-hero-muted">
              Ideias fluindo sempre. A IA te ajuda a destravar e criar conteúdo consistente sem esforço.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
