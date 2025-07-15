import React from 'react';
import { Clock } from 'lucide-react';

interface DynamicPricingBannerProps {
  variant?: 'hero' | 'inline' | 'urgency';
  className?: string;
}

const DynamicPricingBanner: React.FC<DynamicPricingBannerProps> = ({ 
  variant = 'hero', 
  className = '' 
}) => {
  // Get current date information
  const now = new Date();
  const currentDay = now.getDate();
  const currentMonth = now.getMonth() + 1; // 0-indexed, so add 1
  const currentYear = now.getFullYear();
  
  // Calculate next month
  const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1;
  const nextMonthYear = currentMonth === 12 ? currentYear + 1 : currentYear;
  
  // Month names for display
  const monthNames = [
    'januari', 'februari', 'maart', 'april', 'mei', 'juni',
    'juli', 'augustus', 'september', 'oktober', 'november', 'december'
  ];
  
  // Calculate days until next month
  const daysInCurrentMonth = new Date(currentYear, currentMonth, 0).getDate();
  const daysUntilNextMonth = daysInCurrentMonth - currentDay + 1;
  
  // Determine urgency level and message
  const getUrgencyMessage = () => {
    if (daysUntilNextMonth <= 7) {
      return {
        level: 'critical',
        message: `🔥 LAATSTE WEEK: Prijzen stijgen ${nextMonth} ${monthNames[nextMonth - 1]} met €10`,
        subMessage: `📈 Nog ${daysUntilNextMonth} dagen om te besparen`,
        bgColor: 'bg-red-500',
        textColor: 'text-white'
      };
    } else if (daysUntilNextMonth <= 14) {
      return {
        level: 'warning',
        message: `⚠️ PRIJSSTIJGING: ${nextMonth} ${monthNames[nextMonth - 1]} stijgen prijzen met €10`,
        subMessage: `⏰ Nog ${daysUntilNextMonth} dagen om van huidige prijzen te profiteren`,
        bgColor: 'bg-orange-500',
        textColor: 'text-white'
      };
    } else {
      return {
        level: 'info',
        message: `💡 BINNENKORT: Prijzen stijgen ${nextMonth} ${monthNames[nextMonth - 1]} met €10`,
        subMessage: `📅 Boek nu en bespaar op alle pakketten`,
        bgColor: 'bg-blue-500',
        textColor: 'text-white'
      };
    }
  };
  
  const urgency = getUrgencyMessage();
  
  // Different variants of the banner
  if (variant === 'hero') {
    return (
      <div className={`${urgency.bgColor} ${urgency.textColor} p-3 rounded-lg mb-6 text-center ${className}`}>
        <p className="font-bold">{urgency.message}</p>
        <p className="text-sm">{urgency.subMessage}</p>
      </div>
    );
  }
  
  if (variant === 'inline') {
    return (
      <div className={`${urgency.bgColor} ${urgency.textColor} p-4 rounded-lg border ${className}`}>
        <div className="flex items-center justify-center mb-2">
          <Clock className="w-5 h-5 mr-2" />
          <span className="font-bold">{urgency.message}</span>
        </div>
        <p className="text-sm text-center">{urgency.subMessage}</p>
      </div>
    );
  }
  
  if (variant === 'urgency') {
    return (
      <div className={`bg-red-50 p-4 rounded-lg border border-red-200 ${className}`}>
        <p className="text-red-800 font-medium text-center">
          {urgency.message}
        </p>
        <p className="text-red-600 text-sm text-center mt-1">
          {urgency.subMessage}
        </p>
      </div>
    );
  }
  
  return null;
};

export default DynamicPricingBanner; 