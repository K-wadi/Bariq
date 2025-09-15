// Animation utilities for high-performance, accessible animations
// Based on best practices from Framer Motion and modern web performance

export const ANIMATION_DURATION = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.6,
  extra: 0.8
} as const;

// Easing curves for natural motion
export const EASING = {
  ease: [0.25, 0.1, 0.25, 1],
  easeIn: [0.42, 0, 1, 1],
  easeOut: [0, 0, 0.58, 1],
  easeInOut: [0.42, 0, 0.58, 1],
  bounce: [0.68, -0.55, 0.265, 1.55],
  spring: { type: "spring", stiffness: 260, damping: 20 }
} as const;

// Page transition variants
export const pageTransitions = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: ANIMATION_DURATION.normal,
      ease: EASING.easeOut
    }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: {
      duration: ANIMATION_DURATION.fast,
      ease: EASING.easeIn
    }
  }
};

// Hero section animations
export const heroAnimations = {
  container: {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  },
  title: {
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: ANIMATION_DURATION.slow,
        ease: EASING.easeOut
      }
    }
  },
  subtitle: {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: ANIMATION_DURATION.normal,
        ease: EASING.easeOut
      }
    }
  },
  cta: {
    initial: { opacity: 0, scale: 0.9 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: ANIMATION_DURATION.normal,
        ease: EASING.bounce
      }
    }
  }
};

// Scroll-triggered animations
export const scrollAnimations = {
  fadeInUp: {
    initial: { opacity: 0, y: 40 },
    whileInView: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: ANIMATION_DURATION.normal,
        ease: EASING.easeOut
      }
    },
    viewport: { once: true, margin: "-100px" }
  },
  fadeInLeft: {
    initial: { opacity: 0, x: -40 },
    whileInView: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: ANIMATION_DURATION.normal,
        ease: EASING.easeOut
      }
    },
    viewport: { once: true, margin: "-100px" }
  },
  fadeInRight: {
    initial: { opacity: 0, x: 40 },
    whileInView: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: ANIMATION_DURATION.normal,
        ease: EASING.easeOut
      }
    },
    viewport: { once: true, margin: "-100px" }
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.8 },
    whileInView: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: ANIMATION_DURATION.normal,
        ease: EASING.bounce
      }
    },
    viewport: { once: true, margin: "-100px" }
  }
};

// Card animations with stagger
export const cardAnimations = {
  container: {
    initial: { opacity: 0 },
    whileInView: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    },
    viewport: { once: true, margin: "-50px" }
  },
  item: {
    initial: { opacity: 0, y: 30 },
    whileInView: {
      opacity: 1,
      y: 0,
      transition: {
        duration: ANIMATION_DURATION.normal,
        ease: EASING.easeOut
      }
    },
    whileHover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: ANIMATION_DURATION.fast,
        ease: EASING.easeOut
      }
    }
  }
};

// Button animations
export const buttonAnimations = {
  primary: {
    whileHover: {
      scale: 1.05,
      boxShadow: "0 10px 30px rgba(43, 213, 236, 0.3)",
      transition: {
        duration: ANIMATION_DURATION.fast,
        ease: EASING.easeOut
      }
    },
    whileTap: {
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    }
  },
  secondary: {
    whileHover: {
      scale: 1.02,
      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
      transition: {
        duration: ANIMATION_DURATION.fast,
        ease: EASING.easeOut
      }
    },
    whileTap: {
      scale: 0.98,
      transition: {
        duration: 0.1
      }
    }
  }
};

// Form animations
export const formAnimations = {
  container: {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  },
  field: {
    initial: { opacity: 0, x: -20 },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: ANIMATION_DURATION.normal,
        ease: EASING.easeOut
      }
    }
  },
  submit: {
    initial: { opacity: 0, scale: 0.9 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: ANIMATION_DURATION.normal,
        ease: EASING.bounce
      }
    }
  }
};

// Loading animations
export const loadingAnimations = {
  spinner: {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }
    }
  },
  pulse: {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: EASING.easeInOut
      }
    }
  },
  shimmer: {
    animate: {
      x: ["-100%", "100%"],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "linear"
      }
    }
  }
};

// Navigation animations
export const navAnimations = {
  mobileMenu: {
    initial: { opacity: 0, height: 0 },
    animate: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: ANIMATION_DURATION.normal,
        ease: EASING.easeOut,
        height: {
          duration: ANIMATION_DURATION.normal
        }
      }
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: ANIMATION_DURATION.fast,
        ease: EASING.easeIn
      }
    }
  },
  menuItem: {
    initial: { opacity: 0, x: -20 },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: ANIMATION_DURATION.normal,
        ease: EASING.easeOut
      }
    }
  }
};

// Pricing animations
export const pricingAnimations = {
  counter: {
    initial: { scale: 0.8 },
    animate: { scale: 1 },
    whileInView: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 0.8,
        ease: EASING.bounce
      }
    },
    viewport: { once: true, margin: "-100px" }
  },
  badge: {
    initial: { scale: 0, rotate: -10 },
    animate: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: ANIMATION_DURATION.normal,
        ease: EASING.bounce,
        delay: 0.3
      }
    }
  }
};

// Floating elements
export const floatingAnimations = {
  gentle: {
    animate: {
      y: [-5, 5, -5],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: EASING.easeInOut
      }
    }
  },
  rotate: {
    animate: {
      rotate: [0, 360],
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }
    }
  }
};

// Performance optimization utilities
export const reducedMotionCheck = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const optimizedVariants = (variants: any) => {
  if (reducedMotionCheck()) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 }
    };
  }
  return variants;
};

// Custom hook for scroll-triggered animations
export const useScrollAnimation = () => {
  return {
    initial: "initial",
    whileInView: "whileInView",
    viewport: { once: true, margin: "-100px" }
  };
};

// Stagger utilities
export const createStagger = (delayBetween: number = 0.1, delayChildren: number = 0) => ({
  animate: {
    transition: {
      staggerChildren: delayBetween,
      delayChildren
    }
  }
});

// Mobile-optimized animations
export const mobileOptimizedAnimation = (desktopVariant: any, mobileVariant?: any) => {
  const isMobile = window.innerWidth < 768;
  
  if (isMobile && mobileVariant) {
    return mobileVariant;
  }
  
  if (isMobile) {
    return {
      ...desktopVariant,
      transition: {
        ...desktopVariant.transition,
        duration: (desktopVariant.transition?.duration || ANIMATION_DURATION.normal) * 0.7
      }
    };
  }
  
  return desktopVariant;
}; 