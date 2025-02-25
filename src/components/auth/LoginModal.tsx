
import React, { useState } from 'react';
import PricingPlans from '../pricing/PricingPlans';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlanSelect: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onPlanSelect,
}) => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPlans, setShowPlans] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email === 'adm@adm.com' && password === 'admadm') {
      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo ao sistema.",
      });
      localStorage.setItem('isLoggedIn', 'true');
      onClose();
    } else {
      toast({
        title: "Erro ao fazer login",
        description: "Credenciais inválidas. Por favor, tente novamente.",
        variant: "destructive"
      });
      setShowPlans(true);
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] bg-editor-panel border-editor-border">
        {!showPlans ? (
          <div className="space-y-6 p-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-white">Bem-vindo de volta</h2>
              <p className="text-gray-400">Faça login para continuar</p>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm text-gray-400">Email</label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="bg-editor-glass-dark border-editor-border text-white"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm text-gray-400">Senha</label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-editor-glass-dark border-editor-border text-white"
                  required
                />
              </div>

              <Button 
                type="submit"
                className="w-full bg-editor-accent hover:bg-editor-accent/80"
              >
                Entrar
              </Button>

              <p className="text-center text-sm text-gray-400">
                Não tem uma conta?{" "}
                <button 
                  type="button"
                  onClick={() => setShowPlans(true)}
                  className="text-editor-accent hover:underline"
                >
                  Ver planos
                </button>
              </p>
            </form>
          </div>
        ) : (
          <PricingPlans onComplete={onPlanSelect} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
