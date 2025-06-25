import React from 'react';
import { Check, X, Star, TrendingUp, Shield } from 'lucide-react';
import Button from './Button';
import { motion } from 'framer-motion';

interface PackageCardProps {
  title: string;
  price: string;
  oldPrice?: string;
  description: string;
  features: string[];
  missingFeatures?: string[];
  popular?: boolean;
  bestValue?: boolean;
  decoy?: boolean;
  actionLabel?: string;
  actionLink?: string;
  delay?: number;
  savings?: string;
  badge?: string;
  urgency?: string;
}

const PackageCard: React.FC<PackageCardProps> = ({
  title,
  price,
  oldPrice,
  description,
  features,
  missingFeatures = [],
  popular = false,
  bestValue = false,
  decoy = false,
  actionLabel = 'Boek Nu',
  actionLink = '/boeken',
  delay = 0,
  savings,
  badge,
  urgency
}) => {
  const getCardStyle = () => {
    if (bestValue) return 'border-2 border-green-500 shadow-lg transform scale-105';
    if (popular) return 'border-2 border-primary-clean shadow-lg';
    if (decoy) return 'border-2 border-purple-500 shadow-md';
    return 'border border-charcoal-200';
  };

  const getBadgeStyle = () => {
    if (bestValue) return 'bg-green-500 text-white';
    if (popular) return 'bg-primary-clean text-white';
    if (decoy) return 'bg-purple-500 text-white';
    return 'bg-charcoal-500 text-white';
  };

  return (
    <motion.div 
      className={`rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all relative ${getCardStyle()}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
    >
      {/* Badge */}
      {(popular || bestValue || decoy || badge) && (
        <div className={`${getBadgeStyle()} text-center py-2 font-medium text-sm flex items-center justify-center`}>
          {bestValue && <Star className="w-4 h-4 mr-1" />}
          {popular && <TrendingUp className="w-4 h-4 mr-1" />}
          {decoy && <Shield className="w-4 h-4 mr-1" />}
          {bestValue ? 'BEST VALUE' : popular ? 'MOST POPULAR' : decoy ? 'PREMIUM PROTECTION' : badge}
        </div>
      )}
      
      <div className="bg-white p-6">
        <h3 className="text-xl font-display font-semibold mb-2 text-charcoal-900">{title}</h3>
        
        <div className="mb-4">
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-charcoal-900">{price}</span>
            {oldPrice && (
              <span className="text-lg text-red-500 line-through ml-2">{oldPrice}</span>
            )}
          </div>
          {savings && (
            <div className="text-green-600 font-semibold text-sm mt-1">{savings}</div>
          )}
          {urgency && (
            <div className="text-red-600 font-medium text-xs mt-1 flex items-center">
              🔥 {urgency}
            </div>
          )}
        </div>
        
        <p className="text-charcoal-600 mb-6">{description}</p>
        
        {/* Features */}
        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5 mr-3" />
              <span className="text-charcoal-700">{feature}</span>
            </li>
          ))}
          {missingFeatures.map((feature, index) => (
            <li key={`missing-${index}`} className="flex items-start opacity-50">
              <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5 mr-3" />
              <span className="text-charcoal-500 line-through">{feature}</span>
            </li>
          ))}
        </ul>
        
        <Button
          to={actionLink}
          variant={bestValue ? 'primary' : popular ? 'primary' : decoy ? 'secondary' : 'outline'}
          fullWidth
          size="large"
          className={bestValue ? 'bg-green-500 hover:bg-green-600' : ''}
        >
          {actionLabel}
        </Button>
        
        {/* Social proof for popular packages */}
        {popular && (
          <div className="mt-3 text-center text-sm text-charcoal-600">
            ⭐ 78% van klanten kiest dit pakket
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default PackageCard;