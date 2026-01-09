import { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Download } from 'lucide-react';

const typewriterTexts = [
  "Hi, I'm Sunny Kumar",
  'Full Stack MERN Developer',
  'I Build Animated & Scalable Web Apps',
  'Turning Ideas into Digital Reality',
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 } // Lower threshold for Hero because it's tall
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

  useEffect(() => {
    const currentFullText = typewriterTexts[currentTextIndex];
    const typingSpeed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (displayText.length < currentFullText.length) {
          setDisplayText(currentFullText.slice(0, displayText.length + 1));
        } else {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        // Deleting
        if (displayText.length > 0) {
          setDisplayText(currentFullText.slice(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % typewriterTexts.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentTextIndex]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden"
    >
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-center">
          {/* Left side - Professional Photo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex justify-center xl:justify-end"
          >
            <div className="relative group parallax-layer">
              <div className="glass-card neon-border-blue rounded-3xl p-4 hover-glow-blue animate-pulse-glow">
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src="/images/sunny-kumar.png"
                    alt="Sunny Kumar - Full Stack Developer"
                    className="w-full max-w-md h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>

              {/* Floating decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-3xl animate-float" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
            </div>
          </motion.div>

          {/* Right side - Typewriter Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <span className="text-primary text-lg font-semibold tracking-wider uppercase">
                  Welcome to my portfolio
                </span>
              </motion.div>

              {/* Typewriter effect */}
              <div className="min-h-[200px] flex items-center">
                <h1 className="text-5xl xl:text-7xl font-bold leading-tight">
                  <span className="gradient-text">
                    {displayText}
                    <span className="animate-pulse">|</span>
                  </span>
                </h1>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-muted-foreground text-lg xl:text-xl max-w-2xl"
              >
                Crafting exceptional digital experiences with cutting-edge technologies and creative innovation.
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#projects"
                className="magnetic-btn glass-card neon-border-blue px-8 py-4 rounded-full font-semibold text-lg hover-glow-blue transition-all duration-300 hover:scale-105"
              >
                View My Work
              </a>
              <a
                href="#contact"
                className="magnetic-btn glass-card neon-border-purple px-8 py-4 rounded-full font-semibold text-lg hover-glow-purple transition-all duration-300 hover:scale-105"
              >
                Get In Touch
              </a>
              <a
                href="/Sunny_Kumar_Resume.pdf"
                download="Sunny_Kumar_Resume.pdf"
                className="magnetic-btn glass-card neon-border-cyan px-8 py-4 rounded-full font-semibold text-lg hover-glow-blue transition-all duration-300 hover:scale-105 flex items-center gap-2 group"
              >
                <Download className="w-5 h-5 group-hover:animate-bounce" />
                Resume
              </a>
            </motion.div>

            <div className="flex gap-6 pt-8">
              {[
                { icon: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png', label: 'LinkedIn', href: 'https://www.linkedin.com/in/sunny-kumar-mit/' },
                { icon: 'https://i.postimg.cc/YCbCbV4x/github-(1).png6', label: 'GitHub', href: 'https://github.com/sunny-kumar-mit/' },
                { icon: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg', label: 'Email', href: 'mailto:sunny01srp@gmail.com' },
                { icon: 'https://play-lh.googleusercontent.com/QbavRFj9bwEj8Wm3mIfOG781pUoPIWdOGEnOGKk35mf_M5AvIEhDhyEP7ZfQFwpzPwM', label: 'Linktree', href: 'https://linktr.ee/sunny01srp' },
                { icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png', label: 'Instagram', href: 'https://www.instagram.com/crazy01srp/' },
                { icon: 'https://i.postimg.cc/kMvDhwpG/twitter.png', label: 'X', href: 'https://x.com/sunny01srp' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card w-14 h-14 rounded-full flex items-center justify-center hover-glow-blue transition-all duration-300 hover:scale-110 overflow-hidden bg-white/5"
                  aria-label={social.label}
                >
                  <img
                    src={social.icon}
                    alt={social.label}
                    className="w-8 h-8 object-contain"
                  />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="text-muted-foreground text-sm">Scroll Down</span>
          <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center p-2">
            <div className="w-1 h-3 bg-primary rounded-full animate-pulse" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
