import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthModal } from "@/contexts/AuthModalContext";

const Navbar = () => {
  const { openModal } = useAuthModal();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-hero/80 backdrop-blur-lg border-b border-hero-foreground/10"
    >
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <span className="font-display font-bold text-xl text-hero-foreground">SocialCopy</span>
        </div>

        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => openModal("login")}
            className="text-hero-foreground hover:bg-white/10 border border-hero-foreground/20 hover:border-hero-foreground/40 transition-all duration-300"
          >
            Entrar
          </Button>
          <Button variant="accent" size="sm" onClick={() => openModal("signup")}>
            Criar conta grátis
          </Button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
