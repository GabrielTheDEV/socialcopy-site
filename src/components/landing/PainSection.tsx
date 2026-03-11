import { motion } from "framer-motion";
import { Clock, Brain, TrendingDown, RefreshCw, Frown, AlertCircle } from "lucide-react";

const pains = [
  {
    icon: Brain,
    title: "Falta de ideias para postar",
    description: "Você abre o app e fica encarando a tela em branco sem saber o que escrever."
  },
  {
    icon: Clock,
    title: "Horas perdidas criando conteúdo",
    description: "Tempo que poderia ser usado para vender, atender clientes ou simplesmente descansar."
  },
  {
    icon: AlertCircle,
    title: "Não sabe escrever copy que converte",
    description: "Seus posts parecem bonitos, mas não geram cliques, comentários ou vendas."
  },
  {
    icon: RefreshCw,
    title: "Adaptar para cada plataforma",
    description: "O que funciona no Instagram não funciona no LinkedIn. E você precisa reescrever tudo."
  },
  {
    icon: TrendingDown,
    title: "Engajamento baixo",
    description: "Você posta, mas parece que está falando sozinho. Poucos likes, menos vendas."
  },
  {
    icon: Frown,
    title: "Esgotamento mental e bloqueio criativo",
    description: "A pressão de criar conteúdo todo dia está te deixando exausto e sem inspiração."
  }
];

const PainSection = () => {
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
            Você não está sozinho
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Milhares de criadores, empreendedores e social medias enfrentam esses mesmos desafios todos os dias.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pains.map((pain, index) => (
            <motion.div
              key={pain.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
            >
              <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <pain.icon className="w-6 h-6 text-destructive" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {pain.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {pain.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PainSection;
