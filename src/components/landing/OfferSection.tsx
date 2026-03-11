import { motion } from "framer-motion";
import { ArrowRight, Gift, CreditCard, Clock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthModal } from "@/contexts/AuthModalContext";
const offers = [
  {
    icon: Gift,
    text: "20 copies grátis para começar"
  },
  {
    icon: CreditCard,
    text: "Sem cartão de crédito"
  },
  {
    icon: Clock,
    text: "Comece em segundos"
  },
  {
    icon: Sparkles,
    text: "Acesso imediato à IA"
  }
];

const OfferSection = () => {
  const { openModal } = useAuthModal();

  return (
    <section className="hero-section section-padding relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-hero-foreground mb-6">
            Comece agora.{" "}
            <span className="gradient-text">Grátis.</span>
          </h2>
          <p className="text-xl text-hero-muted max-w-2xl mx-auto mb-10">
            Crie sua conta em segundos e experimente o poder da IA para criar conteúdo que engaja e converte.
          </p>

          {/* Offer cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {offers.map((offer, index) => (
              <motion.div
                key={offer.text}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-4 rounded-xl bg-hero-foreground/5 border border-hero-foreground/10 backdrop-blur-sm"
              >
                <offer.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-sm text-hero-foreground font-medium">
                  {offer.text}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button variant="heroAccent" size="xl" className="mb-4" onClick={openModal}>
              Criar minha conta grátis
              <ArrowRight className="w-5 h-5" />
            </Button>
            <p className="text-hero-muted text-sm">
              Sem risco. Sem compromisso. Cancele quando quiser.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default OfferSection;
