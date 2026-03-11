import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const objections = [
  {
    question: "Isso é pra mim?",
    answer: "Se você precisa criar conteúdo para redes sociais — seja como criador de conteúdo, empreendedor, social media, freelancer ou dono de negócio — sim, é pra você. Não importa se você está começando ou já tem experiência."
  },
  {
    question: "Preciso saber copywriting?",
    answer: "Absolutamente não. A IA já foi treinada com as melhores técnicas de copywriting e neuromarketing. Você só precisa ter a ideia — ela cuida do resto."
  },
  {
    question: "Funciona para qualquer nicho?",
    answer: "Sim. A ferramenta se adapta ao seu contexto. Funciona para moda, saúde, educação, tecnologia, gastronomia, serviços, infoprodutos e muito mais."
  },
  {
    question: "Preciso pagar alguma coisa agora?",
    answer: "Não. Você cria sua conta grátis e já recebe 20 copies para testar. Sem cartão de crédito. Sem pegadinhas."
  },
  {
    question: "E se eu não gostar das copies?",
    answer: "Você pode regenerar quantas vezes quiser até encontrar a versão perfeita. E pode editar manualmente qualquer texto para deixar com a sua cara."
  }
];

const ObjectionsSection = () => {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Perguntas que você pode ter
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Vamos ser transparentes. Aqui estão as respostas para suas possíveis dúvidas.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {objections.map((item, index) => (
            <motion.div
              key={item.question}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-card border border-border"
            >
              <div className="flex gap-3 mb-3">
                <CheckCircle className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                <h3 className="text-lg font-semibold text-foreground">
                  {item.question}
                </h3>
              </div>
              <p className="text-muted-foreground pl-9 leading-relaxed">
                {item.answer}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ObjectionsSection;
