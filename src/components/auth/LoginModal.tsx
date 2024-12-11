import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Github, Mail } from "lucide-react";
import PricingPlans from "../pricing/PricingPlans";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlanSelect: () => void;
}

const LoginModal = ({ isOpen, onClose, onPlanSelect }: LoginModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-editor-panel border-editor-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-light text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
            Welcome to OSÍRIZ
          </DialogTitle>
          <DialogDescription className="text-center text-gray-400">
            Choose how you'd like to continue
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full border-editor-border hover:bg-editor-accent/10"
              onClick={() => console.log('GitHub login')}
            >
              <Github className="mr-2 h-4 w-4" />
              Continue with GitHub
            </Button>
            <Button 
              variant="outline" 
              className="w-full border-editor-border hover:bg-editor-accent/10"
              onClick={() => console.log('Email login')}
            >
              <Mail className="mr-2 h-4 w-4" />
              Continue with Email
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-editor-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-editor-panel px-2 text-gray-400">Available Plans</span>
            </div>
          </div>

          <PricingPlans onComplete={onPlanSelect} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;