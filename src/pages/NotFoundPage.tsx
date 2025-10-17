import React from "react";
import { Home } from "lucide-react";
import { motion } from "framer-motion";
import Button from "../components/Button";

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-charcoal-50 px-4">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-9xl font-display font-bold text-primary-600">
            404
          </h1>
        </motion.div>

        <motion.h2
          className="text-3xl md:text-4xl font-display font-bold text-charcoal-900 mt-4 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Pagina Niet Gevonden
        </motion.h2>

        <motion.p
          className="text-lg text-charcoal-600 max-w-md mx-auto mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          De pagina die je zoekt bestaat niet of is verplaatst.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button
            to="/"
            variant="primary"
            size="large"
            icon={<Home size={20} />}
          >
            Terug naar Home
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage;
