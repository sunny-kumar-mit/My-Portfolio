import { useEffect, useState } from 'react';
import ThreeBackground from '@/components/ThreeBackground';
import CustomCursor from '@/components/CustomCursor';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import ExperienceSection from '@/components/ExperienceSection';
import CertificationsSection from '@/components/CertificationsSection';
import ContactSection from '@/components/ContactSection';
import { motion, AnimatePresence } from 'motion/react';

export default function Portfolio() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 800);
          return 100;
        }
        return prev + 2;
      });
    }, 60);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          >
            <div className="text-center space-y-8">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <h1 className="text-6xl font-bold gradient-text">SK</h1>
                <p className="text-muted-foreground text-lg">Loading Portfolio...</p>
              </motion.div>

              {/* Progress Bar */}
              <div className="w-64 h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${loadingProgress}%` }}
                  transition={{ duration: 0.3 }}
                  className="h-full bg-gradient-to-r from-primary via-secondary to-accent"
                />
              </div>

              <p className="text-primary font-semibold">{loadingProgress}%</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      {!isLoading && (
        <>
          {/* Three.js Background */}
          <ThreeBackground />

          {/* Custom Cursor */}
          <CustomCursor />

          {/* Navigation */}
          <nav className="fixed top-0 left-0 right-0 z-40 glass-card border-b border-border">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                {/* Logo */}
                <motion.a
                  href="#home"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-2xl font-bold gradient-text"
                >
                  Sunny Kumar
                </motion.a>

                {/* Navigation Links */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="hidden md:flex items-center gap-8"
                >
                  {['Home', 'About', 'Skills', 'Projects', 'Experience', 'Certifications', 'Contact'].map((item, index) => (
                    <motion.a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                      className="text-foreground hover:text-primary transition-colors duration-300 font-medium"
                    >
                      {item}
                    </motion.a>
                  ))}
                </motion.div>

                {/* Mobile Menu Button */}
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="md:hidden glass-card p-3 rounded-lg hover-glow-blue"
                  aria-label="Menu"
                >
                  <div className="space-y-1.5">
                    <div className="w-6 h-0.5 bg-primary" />
                    <div className="w-6 h-0.5 bg-primary" />
                    <div className="w-6 h-0.5 bg-primary" />
                  </div>
                </motion.button>
              </div>
            </div>
          </nav>

          {/* Main Sections */}
          <main className="relative">
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
            <ExperienceSection />
            <CertificationsSection />
            <ContactSection />
          </main>

          {/* Footer */}
          <footer className="relative py-12 px-4 border-t border-border">
            <div className="container mx-auto max-w-6xl">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <p className="text-muted-foreground">
                    © 2026 Sunny Kumar. All rights reserved.
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Always learning, always building, always improving 🌱

                  </p>
                </div>

                <div className="flex gap-4">
                  {[
                    { icon: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png', label: 'LinkedIn', href: 'https://www.linkedin.com/in/sunny-kumar-mit/' },
                    { icon: 'https://i.postimg.cc/YCbCbV4x/github-(1).png6', label: 'GitHub', href: 'https://github.com/sunny-kumar-mit/' },
                    { icon: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg', label: 'Email', href: 'mailto:sunny01srp@gmail.com' },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass-card w-12 h-12 rounded-full flex items-center justify-center hover-glow-blue transition-all duration-300 hover:scale-110 overflow-hidden bg-white/5"
                      aria-label={social.label}
                    >
                      <img
                        src={social.icon}
                        alt={social.label}
                        className="w-6 h-6 object-contain"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Sitting Boy GIF */}
            <div className="absolute bottom-0 right-4 pointer-events-none hidden md:block">
              <img
                src="https://media.tenor.com/GfSX-u7VZQ4AAAAi/ninja.gif"
                alt="Saying Hi"
                className="w-24 h-24 object-contain"
              />
            </div>
          </footer>

          {/* Scroll to Top Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 glass-card neon-border-blue w-14 h-14 rounded-full flex items-center justify-center text-2xl hover-glow-blue transition-all duration-300 hover:scale-110 z-40"
            aria-label="Scroll to top"
          >
            ↑
          </motion.button>
        </>
      )}
    </>
  );
}
