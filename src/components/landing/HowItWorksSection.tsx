import { motion } from "framer-motion";
import { Lightbulb, MousePointer, Copy, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Lightbulb,
    title: "Descreva sua ideia ou produto",
    description: "Conte para a IA sobre o que você quer postar. Pode ser uma oferta, um lançamento, uma dica ou qualquer ideia."
  },
  {
    number: "02",
    icon: MousePointer,
    title: "Escolha as plataformas",
    description: "Selecione onde você quer publicar: Instagram, LinkedIn, Twitter, Facebook, TikTok ou todas de uma vez."
  },
  {
    number: "03",
    icon: Copy,
    title: "Receba copies prontas",
    description: "Em segundos, você tem textos profissionais, adaptados para cada rede, prontos para copiar e postar."
  }
];

const HowItWorksSection = () => {
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
            Como funciona
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Três passos simples. Sem complicação. Sem curva de aprendizado.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative flex gap-6 md:gap-8 pb-12 last:pb-0"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="absolute left-6 md:left-8 top-16 w-0.5 h-full bg-gradient-to-b from-primary/30 to-transparent" />
              )}

              {/* Number badge */}
              <div className="relative shrink-0">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-primary/10 border-2 border-primary flex items-center justify-center">
                  <span className="text-lg md:text-xl font-bold text-primary">{step.number}</span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 pt-1">
                <div className="flex items-center gap-3 mb-3">
                  <step.icon className="w-5 h-5 text-primary" />
                  <h3 className="text-xl md:text-2xl font-semibold text-foreground">
                    {step.title}
                  </h3>
                </div>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Arrow indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex justify-center mt-12"
        >
          <div className="flex items-center gap-2 text-primary font-medium">
            <span>É só isso</span>
            <ArrowRight className="w-5 h-5 animate-pulse" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
