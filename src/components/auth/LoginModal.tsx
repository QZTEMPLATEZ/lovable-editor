import React, { useState } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import PricingPlans from '../pricing/PricingPlans';
import { useToast } from "@/hooks/use-toast";
import { Mail, Lock } from 'lucide-react';

export interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlanSelect?: () => void;
}

const LoginModal = ({ isOpen, onClose, onPlanSelect }: LoginModalProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the login logic
    toast({
      title: "Login functionality coming soon",
      description: "Please select a plan to continue",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] bg-editor-glass-dark border-editor-border">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-editor-panel">
            <TabsTrigger value="login" className="text-white data-[state=active]:bg-purple-500/20">
              Login
            </TabsTrigger>
            <TabsTrigger value="pricing" className="text-white data-[state=active]:bg-purple-500/20">
              Pricing Plans
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="mt-6">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-editor-panel border-editor-border text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 bg-editor-panel border-editor-border text-white"
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-purple-500 hover:bg-purple-600 text-white"
              >
                Sign In
              </Button>

              <div className="text-center">
                <Button 
                  variant="link" 
                  className="text-purple-400 hover:text-purple-300"
                  onClick={() => {
                    toast({
                      title: "Reset password",
                      description: "Password reset functionality coming soon",
                    });
                  }}
                >
                  Forgot password?
                </Button>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="pricing" className="mt-6">
            <PricingPlans onComplete={onPlanSelect} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;