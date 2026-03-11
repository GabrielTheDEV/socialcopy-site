import { motion } from "framer-motion";
import { ChevronUp } from "lucide-react";

const AnimatedArrow = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="flex items-center justify-center gap-2"
    >
      <motion.div
        animate={{
          y: [-4, 4, -4],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="flex flex-col items-center"
      >
        <ChevronUp className="w-6 h-6 text-primary" />
        <motion.div
          animate={{
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-0.5 h-4 bg-gradient-to-b from-primary to-transparent rounded-full"
        />
      </motion.div>
    </motion.div>
  );
};

export default AnimatedArrow;
