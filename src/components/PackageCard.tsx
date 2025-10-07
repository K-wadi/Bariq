import React from 'react';
import { Check, X, Star, TrendingUp } from 'lucide-react';
import Button from './Button';
import { motion } from 'framer-motion';

interface PackageCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  missingFeatures?: string[];
  popular?: boolean;
  bestValue?: boolean;
  actionLabel?: string;
  actionLink?: string;
  delay?: number;
}

const PackageCard: React.FC<PackageCardProps> = ({
  title,
  price,
  description,
  features,
  missingFeatures = [],
  popular = false,
  bestValue = false,
  actionLabel = 'Boek Nu',
  actionLink = '/boeken',
  delay = 0,
}) => {
  const getCardStyle = () => {
    if (bestValue) return 'border-2 border-green-500 shadow-lg';
    if (popular) return 'border-2 border-primary-clean shadow-lg';
    return 'border border-charcoal-200';
  };

  const getBadgeStyle = () => {
    if (bestValue) return 'bg-green-500 text-white';
    if (popular) return 'bg-primary-clean text-white';
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
      {(popular || bestValue) && (
        <div className={`${getBadgeStyle()} text-center py-2 font-medium text-sm flex items-center justify-center`}>
          {bestValue && <Star className="w-4 h-4 mr-1" />}
          {popular && <TrendingUp className="w-4 h-4 mr-1" />}
          {bestValue ? 'BEST VALUE' : popular ? 'POPULAIR' : ''}
        </div>
      )}
      
      <div className="bg-gray-900 p-6 border border-gray-700">
        <h3 className="text-xl font-display font-semibold mb-2 text-gray-200">{title}</h3>
        
        <div className="mb-4">
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-gray-200">{price}</span>
          </div>
          <div className="text-xs text-gray-400 mt-1">
            incl. BTW
          </div>
        </div>
        
        <p className="text-gray-400 mb-6">{description}</p>
        
        {/* Features */}
        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5 mr-3" />
              <span className="text-gray-400">{feature}</span>
            </li>
          ))}
          {missingFeatures.map((feature, index) => (
            <li key={`missing-${index}`} className="flex items-start opacity-50">
              <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5 mr-3" />
              <span className="text-gray-400 line-through">{feature}</span>
            </li>
          ))}
        </ul>
        
        <Button
          to={actionLink}
          variant={bestValue ? 'primary' : popular ? 'primary' : 'outline'}
          fullWidth
          size="large"
          className={bestValue ? 'bg-green-500 hover:bg-green-600' : ''}
        >
          {actionLabel}
        </Button>
      </div>
    </motion.div>
  );
};

export default PackageCard;