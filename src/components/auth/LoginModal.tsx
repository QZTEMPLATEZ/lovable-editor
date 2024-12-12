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
      <DialogContent className="sm:max-w-[520px] md:max-w-[580px] bg-editor-panel/95 border-editor-border p-6 h-[600px]">
        <div className="flex flex-col h-full gap-8">
          <DialogHeader>
            <DialogTitle className="text-2xl font-light text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
              Welcome to OSÍRIZ
            </DialogTitle>
            <p className="text-center text-gray-400 text-sm mt-2">
              Choose your plan to start creating amazing videos
            </p>
          </DialogHeader>

          <div className="flex flex-col gap-8 flex-grow">
            <div className="space-y-3 max-w-[280px] mx-auto w-full">
              <Button 
                variant="outline" 
                size="default"
                className="w-full border-editor-border hover:bg-editor-accent/10 gap-2 h-11"
              >
                <Mail className="w-4 h-4" />
                Continue with Email
              </Button>
              <Button 
                variant="outline"
                size="default"
                className="w-full border-editor-border hover:bg-editor-accent/10 gap-2 h-11"
              >
                <Lock className="w-4 h-4" />
                Sign in Securely
              </Button>

              <div className="relative w-full text-center">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-editor-border/30" />
                </div>
                <span className="relative px-3 text-xs text-gray-500 bg-editor-panel">
                  Or choose a plan
                </span>
              </div>
            </div>

            <div className="flex-grow min-h-0 -mx-2">
              <PricingPlans onComplete={onPlanSelect} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;