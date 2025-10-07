import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface ReviewCardProps {
  name: string;
  date: string;
  rating: number;
  comment: string;
  carType?: string;
  delay?: number;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  name,
  date,
  rating,
  comment,
  carType,
  delay = 0
}) => {
  return (
    <motion.div 
      className="bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay }}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-display font-semibold text-lg text-charcoal-900">{name}</h3>
          {carType && <p className="text-charcoal-500 text-sm">{carType}</p>}
        </div>
        <p className="text-charcoal-400 text-sm">{date}</p>
      </div>
      
      <div className="flex mb-3">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-charcoal-300'
            }`}
          />
        ))}
      </div>
      
      <p className="text-charcoal-600">{comment}</p>
    </motion.div>
  );
};

export default ReviewCard;