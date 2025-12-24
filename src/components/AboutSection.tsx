import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-4 py-20 relative"
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          {/* Section Title */}
          <div className="text-center space-y-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl xl:text-6xl font-bold"
            >
              <span className="gradient-text">About Me</span>
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isVisible ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="w-24 h-1 bg-gradient-to-r from-primary via-secondary to-accent mx-auto rounded-full"
            />
          </div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="glass-card neon-border-purple rounded-3xl p-8 xl:p-12 hover-glow-purple"
          >
            <div className="space-y-6">
              <p className="text-xl xl:text-2xl leading-relaxed text-foreground">
                I'm a <span className="neon-text-blue font-semibold">passionate Full Stack Developer</span> specializing in{' '}
                <span className="neon-text-purple font-semibold">MERN stack</span>, focused on building{' '}
                <span className="neon-text-cyan font-semibold">visually stunning</span>, performant, and scalable web applications with modern UI/UX.
              </p>

              <p className="text-lg xl:text-xl leading-relaxed text-muted-foreground">
                With a keen eye for design and a deep understanding of modern web technologies, I transform complex ideas into elegant, user-friendly digital solutions. 
                My approach combines technical excellence with creative innovation to deliver exceptional results.
              </p>

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 pt-8">
                {[
                  {
                    icon: '🎨',
                    title: 'Creative Design',
                    description: 'Crafting beautiful, intuitive interfaces',
                  },
                  {
                    icon: '⚡',
                    title: 'Performance',
                    description: 'Optimized for speed and efficiency',
                  },
                  {
                    icon: '🚀',
                    title: 'Scalability',
                    description: 'Built to grow with your needs',
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                    className="glass-card rounded-2xl p-6 text-center space-y-3 hover-glow-blue"
                  >
                    <div className="text-4xl">{item.icon}</div>
                    <h3 className="text-xl font-semibold text-primary">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
            className="grid grid-cols-2 xl:grid-cols-4 gap-6"
          >
            {[
              { value: '50+', label: 'Projects Completed' },
              { value: '3+', label: 'Years Experience' },
              { value: '100%', label: 'Client Satisfaction' },
              { value: '24/7', label: 'Support Available' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                className="glass-card rounded-2xl p-6 text-center space-y-2 hover-glow-blue"
              >
                <div className="text-4xl xl:text-5xl font-bold gradient-text">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
