import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mail, Lock } from "lucide-react";
import PricingPlans from "../pricing/PricingPlans";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlanSelect: () => void;
}

const LoginModal = ({ isOpen, onClose, onPlanSelect }: LoginModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] bg-editor-panel border-editor-border">
        <DialogHeader>
          <DialogTitle className="text-3xl font-light text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300 mb-2">
            Welcome to OSÍRIZ
          </DialogTitle>
          <p className="text-center text-gray-400 text-lg">
            Choose your plan to start creating amazing videos
          </p>
        </DialogHeader>

        <div className="space-y-8 py-6">
          <div className="flex flex-col gap-4 items-center">
            <Button 
              variant="outline" 
              size="lg"
              className="w-full max-w-md border-editor-border hover:bg-editor-accent/10 gap-2"
            >
              <Mail className="w-5 h-5" />
              Continue with Email
            </Button>
            <Button 
              variant="outline"
              size="lg" 
              className="w-full max-w-md border-editor-border hover:bg-editor-accent/10 gap-2"
            >
              <Lock className="w-5 h-5" />
              Sign in Securely
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-editor-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-editor-panel px-4 text-gray-400 text-sm">Available Plans</span>
            </div>
          </div>

          <PricingPlans onComplete={onPlanSelect} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;