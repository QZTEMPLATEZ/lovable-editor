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
      <DialogContent className="sm:max-w-[95vw] md:max-w-[800px] bg-editor-panel border-editor-border p-4 h-[85vh]">
        <div className="flex flex-col h-full">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-2xl md:text-3xl font-light text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300 mb-2">
              Welcome to OSÍRIZ
            </DialogTitle>
            <p className="text-center text-gray-400 text-base md:text-lg">
              Choose your plan to start creating amazing videos
            </p>
          </DialogHeader>

          <div className="flex flex-col gap-6 flex-grow">
            <div className="flex flex-col gap-3 items-center max-w-sm mx-auto w-full">
              <Button 
                variant="outline" 
                size="lg"
                className="w-full border-editor-border hover:bg-editor-accent/10 gap-2"
              >
                <Mail className="w-5 h-5" />
                Continue with Email
              </Button>
              <Button 
                variant="outline"
                size="lg" 
                className="w-full border-editor-border hover:bg-editor-accent/10 gap-2"
              >
                <Lock className="w-5 h-5" />
                Sign in Securely
              </Button>

              <div className="relative w-full text-center my-2">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-editor-border" />
                </div>
                <span className="relative px-2 text-sm text-gray-500 bg-editor-panel">
                  Or choose a plan
                </span>
              </div>
            </div>

            <div className="flex-grow">
              <PricingPlans onComplete={onPlanSelect} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;