import React from 'react';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon, 
  title, 
  description,
  delay = 0
}) => {
  return (
    <motion.div 
      className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -5 }}
    >
      <div className="bg-primary-50 text-primary-600 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-display font-semibold mb-2 text-charcoal-900">{title}</h3>
      <p className="text-charcoal-600">{description}</p>
    </motion.div>
  );
};

export default FeatureCard;