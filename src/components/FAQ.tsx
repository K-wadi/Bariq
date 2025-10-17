import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
  includeSchema?: boolean;
}

const FAQ: React.FC<FAQProps> = ({ items, includeSchema = true }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Generate JSON-LD schema
  const schemaData = includeSchema
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }
    : null;

  return (
    <div className="max-w-4xl mx-auto">
      {/* JSON-LD Schema */}
      {schemaData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      )}

      {/* FAQ Items */}
      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-bariq-black-lighter border border-gray-800 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-gray-900 transition-colors"
              aria-expanded={openIndex === index}
            >
              <h3 className="text-lg font-semibold text-bariq-white pr-4">
                {item.question}
              </h3>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-bariq-red flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-bariq-grey flex-shrink-0" />
              )}
            </button>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-4 text-bariq-grey">{item.answer}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
