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
      <DialogContent className="sm:max-w-[90vw] md:max-w-[700px] bg-editor-panel border-editor-border p-4 h-[80vh]">
        <div className="flex flex-col h-full">
          <DialogHeader className="mb-3">
            <DialogTitle className="text-xl md:text-2xl font-light text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
              Welcome to OSÍRIZ
            </DialogTitle>
            <p className="text-center text-gray-400 text-sm md:text-base">
              Choose your plan to start creating amazing videos
            </p>
          </DialogHeader>

          <div className="flex flex-col gap-4 flex-grow">
            <div className="flex flex-col gap-2 items-center max-w-xs mx-auto w-full">
              <Button 
                variant="outline" 
                size="default"
                className="w-full border-editor-border hover:bg-editor-accent/10 gap-2"
              >
                <Mail className="w-4 h-4" />
                Continue with Email
              </Button>
              <Button 
                variant="outline"
                size="default"
                className="w-full border-editor-border hover:bg-editor-accent/10 gap-2"
              >
                <Lock className="w-4 h-4" />
                Sign in Securely
              </Button>

              <div className="relative w-full text-center my-1">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-editor-border" />
                </div>
                <span className="relative px-2 text-xs text-gray-500 bg-editor-panel">
                  Or choose a plan
                </span>
              </div>
            </div>

            <div className="flex-grow min-h-0">
              <PricingPlans onComplete={onPlanSelect} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;