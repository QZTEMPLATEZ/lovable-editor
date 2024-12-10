import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Crown, Sparkles } from 'lucide-react';

type PlanTier = 'basic' | 'pro' | 'business';

interface PlanBadgeProps {
  tier: PlanTier;
}

const PlanBadge = ({ tier }: PlanBadgeProps) => {
  switch (tier) {
    case 'basic':
      return (
        <Badge variant="secondary" className="bg-blue-500/10 text-blue-400 border border-blue-500/20">
          Basic
        </Badge>
      );
    case 'pro':
      return (
        <Badge variant="secondary" className="bg-purple-500/10 text-purple-400 border border-purple-500/20">
          <Crown className="w-3 h-3 mr-1" />
          Pro
        </Badge>
      );
    case 'business':
      return (
        <Badge variant="secondary" className="bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <Sparkles className="w-3 h-3 mr-1" />
          Business
        </Badge>
      );
  }
};

export default PlanBadge;