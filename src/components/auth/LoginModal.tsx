import React from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import PricingPlans from '../pricing/PricingPlans';

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
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <PricingPlans onComplete={onPlanSelect} />
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;