import React from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  if (!isOpen) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <div className="grid gap-4 py-4">
          <p>Login content goes here</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;