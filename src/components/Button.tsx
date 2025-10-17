import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { buttonAnimations } from "../utils/animationUtils";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "text";
  size?: "small" | "medium" | "large";
  to?: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  disabled?: boolean;
  fullWidth?: boolean;
  animate?: boolean;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "medium",
  to,
  href,
  onClick,
  type = "button",
  className = "",
  icon,
  iconPosition = "left",
  disabled = false,
  fullWidth = false,
  animate = true,
  loading = false,
}) => {
  const baseClasses =
    "flex items-center justify-center font-medium transition-all rounded-md";

  const variantClasses = {
    primary: "bg-gradient-primary text-white hover:opacity-90 shadow-sm",
    secondary: "bg-primary-clean text-white hover:bg-opacity-90 shadow-sm",
    outline:
      "bg-transparent border-2 border-primary-clean text-primary-clean hover:bg-primary-clean/10",
    text: "bg-transparent text-primary-clean hover:bg-primary-clean/10",
  };

  const sizeClasses = {
    small: "text-sm px-3 py-1",
    medium: "px-5 py-2",
    large: "text-lg px-6 py-3",
  };

  const disabledClasses = disabled
    ? "opacity-50 cursor-not-allowed"
    : "cursor-pointer";

  const widthClass = fullWidth ? "w-full" : "";

  const allClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${widthClass} smooth-transition hover-lift ${className} relative overflow-hidden`;

  // Animation variants based on button variant
  const getAnimationVariants = () => {
    if (!animate) return {};

    if (variant === "primary") {
      return buttonAnimations.primary;
    }
    return buttonAnimations.secondary;
  };

  const loadingSpinner = (
    <motion.svg
      className="animate-spin -ml-1 mr-3 h-4 w-4 text-current"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </motion.svg>
  );

  const content = (
    <>
      {/* Shimmer effect for primary buttons */}
      {variant === "primary" && animate && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      )}

      {loading && loadingSpinner}

      {icon && iconPosition === "left" && !loading && (
        <motion.span
          className="mr-2"
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, delay: 0.1 }}
        >
          {icon}
        </motion.span>
      )}

      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.1 }}
      >
        {children}
      </motion.span>

      {icon && iconPosition === "right" && !loading && (
        <motion.span
          className="ml-2"
          initial={{ opacity: 0, x: 5 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, delay: 0.1 }}
        >
          {icon}
        </motion.span>
      )}
    </>
  );

  if (to) {
    return (
      <motion.div
        {...getAnimationVariants()}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Link to={to} className={allClasses}>
          {content}
        </Link>
      </motion.div>
    );
  }

  if (href) {
    return (
      <motion.div
        {...getAnimationVariants()}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <a
          href={href}
          className={allClasses}
          target="_blank"
          rel="noopener noreferrer"
        >
          {content}
        </a>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      className={allClasses}
      onClick={onClick}
      disabled={disabled || loading}
      {...getAnimationVariants()}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {content}
    </motion.button>
  );
};

export default Button;
