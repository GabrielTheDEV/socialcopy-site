import { useState, useEffect } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useAuthModal } from "@/contexts/AuthModalContext";
import { useNavigate } from "react-router-dom";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AuthModal = ({ open, onOpenChange }: AuthModalProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const { toast } = useToast();
  const { login, register } = useAuth();
  const { mode } = useAuthModal();
  const navigate = useNavigate();

  // Sincroniza com o modo do contexto
  useEffect(() => {
    setIsSignUp(mode === "signup");
  }, [mode]);

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    try {
      // Redireciona para endpoint de Google no backend
      window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Erro ao conectar com Google",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignUp) {
        if (!name.trim()) {
          throw new Error("Nome é obrigatório");
        }
        await register(name, email, password);
        toast({
          title: "Conta criada!",
          description: "Bem-vindo! Redirecionando...",
        });
        // Redireciona para /app após sucesso
        setTimeout(() => {
          navigate("/app");
          onOpenChange(false);
        }, 1000);
      } else {
        await login(email, password);
        toast({
          title: "Bem-vindo de volta!",
          description: "Login realizado com sucesso.",
        });
        // Redireciona para /app após sucesso
        setTimeout(() => {
          navigate("/app");
          onOpenChange(false);
        }, 1000);
      }
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Erro ao processar sua solicitação",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold text-foreground">
            {isSignUp ? "Crie sua conta gratuita" : "Entre na sua conta"}
          </DialogTitle>
          <p className="text-muted-foreground mt-2">
            {isSignUp ? "Comece em segundos. Sem cartão de crédito." : "Bem-vindo de volta!"}
          </p>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Google OAuth Button */}
          <Button
            variant="outline"
            size="lg"
            className="w-full h-12 text-base font-medium border-2 hover:bg-muted/50"
            onClick={handleGoogleAuth}
            disabled={isLoading}
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 
7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continuar com Google
          </Button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                ou continue com email
              </span>
            </div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleEmailAuth} className="space-y-4">
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground">
                  Nome
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="h-11"
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Mínimo 6 caracteres"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="h-11"
              />
            </div>
            <Button
              type="submit"
              variant="accent"
              size="lg"
              className="w-full h-12"
              disabled={isLoading}
            >
              <Mail className="w-4 h-4 mr-2" />
              {isSignUp ? "Criar conta com email" : "Entrar com email"}
            </Button>
          </form>

          {/* Toggle Sign Up / Sign In */}
          <p className="text-center text-sm text-muted-foreground">
            {isSignUp ? "Já tem uma conta?" : "Não tem uma conta?"}{" "}
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setEmail("");
                setPassword("");
                setName("");
              }}
              className="text-primary hover:underline font-medium"
            >
              {isSignUp ? "Entrar" : "Criar conta"}
            </button>
          </p>

          {/* Terms */}
          <p className="text-center text-xs text-muted-foreground">
            Ao continuar, você concorda com nossos{" "}
            <a href="#" className="text-primary hover:underline">
              Termos
            </a>{" "}
            e{" "}
            <a href="#" className="text-primary hover:underline">
              Política de Privacidade
            </a>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
