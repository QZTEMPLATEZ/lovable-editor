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
      <DialogContent className="sm:max-w-[640px] md:max-w-[720px] bg-editor-panel/95 border-editor-border p-4 aspect-video">
        <div className="flex flex-col h-full gap-2">
          <DialogHeader className="space-y-1">
            <DialogTitle className="text-xl font-light text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
              Welcome to OSÍRIZ
            </DialogTitle>
            <p className="text-center text-gray-400 text-[10px]">
              Choose your plan to start creating amazing videos
            </p>
          </DialogHeader>

          <div className="flex flex-col gap-2 flex-grow">
            <div className="space-y-1.5 max-w-[200px] mx-auto w-full">
              <Button 
                variant="outline" 
                size="sm"
                className="w-full border-editor-border hover:bg-editor-accent/10 gap-1.5 h-7 text-xs"
              >
                <Mail className="w-3 h-3" />
                Continue with Email
              </Button>
              <Button 
                variant="outline"
                size="sm"
                className="w-full border-editor-border hover:bg-editor-accent/10 gap-1.5 h-7 text-xs"
              >
                <Lock className="w-3 h-3" />
                Sign in Securely
              </Button>

              <div className="relative w-full text-center">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-editor-border/30" />
                </div>
                <span className="relative px-2 text-[9px] text-gray-500 bg-editor-panel">
                  Or choose a plan
                </span>
              </div>
            </div>

            <div className="flex-grow min-h-0 -mx-2 overflow-auto">
              <PricingPlans onComplete={onPlanSelect} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;