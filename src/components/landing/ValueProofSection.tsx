import { motion } from "framer-motion";
import { Clock, Repeat, Zap, Shield } from "lucide-react";

const proofs = [
  {
    icon: Clock,
    stat: "5x",
    label: "mais rápido",
    description: "Crie conteúdo para a semana inteira em minutos, não horas."
  },
  {
    icon: Repeat,
    stat: "7",
    label: "dias por semana",
    description: "Poste consistentemente sem burnout ou bloqueio criativo."
  },
  {
    icon: Zap,
    stat: "30s",
    label: "por copy",
    description: "Tempo médio para gerar uma copy pronta para postar."
  },
  {
    icon: Shield,
    stat: "100%",
    label: "sem risco",
    description: "Teste grátis. Sem cartão. Sem compromisso."
  }
];

const ValueProofSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Por que isso funciona
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Números que falam por si. Resultados reais para pessoas reais.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {proofs.map((proof, index) => (
            <motion.div
              key={proof.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <proof.icon className="w-7 h-7 text-primary" />
              </div>
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-1">
                {proof.stat}
              </div>
              <div className="text-lg font-semibold text-foreground mb-2">
                {proof.label}
              </div>
              <p className="text-sm text-muted-foreground">
                {proof.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProofSection;
