import React from 'react';
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
  if (!isOpen) return null;
  
  return <PricingPlans onComplete={onPlanSelect} />;
};

export default LoginModal;