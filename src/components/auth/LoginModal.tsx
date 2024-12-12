import React from 'react';
import PricingPlans from "@/components/pricing/PricingPlans";
import { Dialog, DialogContent } from "@/components/ui/dialog";

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
  if (!isOpen) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] bg-editor-panel border-editor-border">
        <PricingPlans onComplete={onPlanSelect} />
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;