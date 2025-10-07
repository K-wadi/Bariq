import React, { useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

interface BackgroundAnimationProps {
  variant?: 'hero' | 'section' | 'minimal';
  particleCount?: number;
  className?: string;
}

const BackgroundAnimation: React.FC<BackgroundAnimationProps> = ({ 
  variant = 'hero',
  particleCount = 50,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);

  // Generate particles with performance optimization
  const particles = useMemo(() => {
    const newParticles: Particle[] = [];
    const count = window.innerWidth < 768 ? Math.floor(particleCount * 0.6) : particleCount;
    
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2
      });
    }
    
    return newParticles;
  }, [particleCount]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    particlesRef.current = [...particles];

    // Animation loop with performance optimization
    let lastTime = 0;
    const targetFPS = 60;
    const frameInterval = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      if (currentTime - lastTime >= frameInterval) {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update and draw particles
        particlesRef.current.forEach(particle => {
          // Update position
          particle.x += particle.speedX;
          particle.y += particle.speedY;

          // Wrap around screen
          if (particle.x > canvas.width) particle.x = 0;
          if (particle.x < 0) particle.x = canvas.width;
          if (particle.y > canvas.height) particle.y = 0;
          if (particle.y < 0) particle.y = canvas.height;

          // Draw particle
          ctx.save();
          ctx.globalAlpha = particle.opacity;
          
          // Create gradient for particle
          const gradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.size
          );
          gradient.addColorStop(0, '#2BD5EC');
          gradient.addColorStop(0.5, '#119EF3');
          gradient.addColorStop(1, 'transparent');
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });

        lastTime = currentTime;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      // Static particles for reduced motion
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current.forEach(particle => {
        ctx.save();
        ctx.globalAlpha = particle.opacity * 0.3;
        ctx.fillStyle = '#E5252A';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [particles]);

  const getVariantStyles = () => {
    switch (variant) {
      case 'hero':
        return {
          background: 'linear-gradient(135deg, rgba(229, 37, 42, 0.05) 0%, rgba(229, 37, 42, 0.03) 50%, rgba(229, 37, 42, 0.05) 100%)',
          minHeight: '100vh'
        };
      case 'section':
        return {
          background: 'linear-gradient(135deg, rgba(229, 37, 42, 0.02) 0%, rgba(229, 37, 42, 0.02) 100%)',
          minHeight: 'auto'
        };
      case 'minimal':
        return {
          background: 'rgba(229, 37, 42, 0.01)',
          minHeight: 'auto'
        };
      default:
        return {};
    }
  };

  return (
    <div 
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={getVariantStyles()}
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            'linear-gradient(135deg, rgba(43, 213, 236, 0.1) 0%, rgba(17, 158, 243, 0.1) 100%)',
            'linear-gradient(135deg, rgba(17, 158, 243, 0.1) 0%, rgba(30, 135, 197, 0.1) 100%)',
            'linear-gradient(135deg, rgba(43, 213, 236, 0.1) 0%, rgba(17, 158, 243, 0.1) 100%)'
          ]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ 
          opacity: variant === 'minimal' ? 0.3 : 0.6,
          mixBlendMode: 'screen'
        }}
      />
      
      {/* Floating geometric shapes */}
      {variant === 'hero' && (
        <>
          <motion.div
            className="absolute top-1/4 left-1/4 w-20 h-20 border border-primary-300 rounded-full opacity-20"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
          />
          
          <motion.div
            className="absolute top-3/4 right-1/4 w-16 h-16 bg-gradient-to-br from-primary-200 to-primary-400 rounded-lg opacity-20"
            animate={{
              rotate: [0, -360],
              y: [-10, 10, -10]
            }}
            transition={{
              rotate: { duration: 15, repeat: Infinity, ease: "linear" },
              y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
          />
          
          <motion.div
            className="absolute top-1/2 right-1/3 w-12 h-12 border-2 border-primary-400 transform rotate-45 opacity-30"
            animate={{
              rotate: [45, 405],
              scale: [1, 1.3, 1]
            }}
            transition={{
              rotate: { duration: 12, repeat: Infinity, ease: "linear" },
              scale: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
            }}
          />
        </>
      )}
      
      {/* Subtle overlay for better text readability */}
      <div className="absolute inset-0 bg-white bg-opacity-5" />
    </div>
  );
};

export default BackgroundAnimation; 