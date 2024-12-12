import React from 'react';
import { Button } from "@/components/ui/button";
import { Check } from 'lucide-react';

interface PricingPlansProps {
  onComplete?: () => void;
}

const PricingPlans = ({ onComplete }: PricingPlansProps) => {
  const plans = [
    {
      name: 'Basic',
      price: '$29',
      features: ['Up to 3 videos', 'Basic editing tools', 'Standard support'],
    },
    {
      name: 'Pro',
      price: '$79',
      features: ['Unlimited videos', 'Advanced editing', '24/7 Priority support', 'Custom exports'],
    },
    {
      name: 'Business',
      price: '$199',
      features: ['Everything in Pro', 'Team collaboration', 'API access', 'Custom branding'],
    },
  ];

  return (
    <div className="py-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-white mb-4">Choose Your Plan</h2>
        <p className="text-gray-400">Select the perfect plan for your needs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="bg-editor-panel/50 p-6 rounded-xl border border-purple-500/20 backdrop-blur-sm hover:border-purple-500/40 transition-all"
          >
            <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
            <p className="text-3xl font-bold text-purple-400 mb-6">{plan.price}<span className="text-sm text-gray-400">/month</span></p>
            
            <ul className="space-y-4 mb-8">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center text-gray-300">
                  <Check className="w-5 h-5 text-purple-500 mr-2" />
                  {feature}
                </li>
              ))}
            </ul>

            <Button
              onClick={onComplete}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
            >
              Get Started
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingPlans;