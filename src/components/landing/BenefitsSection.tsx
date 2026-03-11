import { motion } from "framer-motion";
import { Clock, TrendingUp, Smile, Calendar, DollarSign, Rocket } from "lucide-react";

const benefits = [
  {
    icon: Clock,
    title: "Mais tempo livre",
    description: "Economize horas por semana que você gastava pensando no que postar."
  },
  {
    icon: Calendar,
    title: "Consistência garantida",
    description: "Nunca mais fique sem postar. Tenha sempre conteúdo pronto para publicar."
  },
  {
    icon: DollarSign,
    title: "Mais vendas",
    description: "Copies persuasivas que transformam seguidores em clientes pagantes."
  },
  {
    icon: Smile,
    title: "Menos estresse",
    description: "Diga adeus ao bloqueio criativo e à pressão de criar conteúdo todo dia."
  },
  {
    icon: TrendingUp,
    title: "Presença mais forte",
    description: "Apareça em todas as redes com conteúdo profissional e relevante."
  },
  {
    icon: Rocket,
    title: "Escale seu negócio",
    description: "Foque no que importa enquanto a IA cuida do seu conteúdo."
  }
];

const BenefitsSection = () => {
  return (
    <section className="section-padding bg-secondary/50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            O que você ganha com isso
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Não é sobre features. É sobre transformar sua rotina e seus resultados.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex gap-4 p-6 rounded-2xl bg-card border border-border hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <benefit.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
