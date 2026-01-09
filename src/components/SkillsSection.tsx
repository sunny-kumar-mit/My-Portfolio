import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import TypewriterText from './ui/TypewriterText';

const skills = [
  {
    category: 'Frontend',
    icon: '🎨',
    items: ['React', 'Tailwind CSS', 'JavaScript', 'TypeScript', 'HTML5', 'Modern CSS'],
    color: 'blue',
  },
  {
    category: 'Backend',
    icon: '⚙️',
    items: ['Node.js', 'Express.js', 'REST APIs', 'Authentication', 'WebSockets'],
    color: 'purple',
  },
  {
    category: 'Database',
    icon: '🗄️',
    items: ['MongoDB', 'Mongoose', 'Database Design', 'Query Optimization'],
    color: 'cyan',
  },
  {
    category: 'Mobile App Development',
    icon: '📱',
    items: ['Flutter', 'Dart', 'Swift (iOS)', 'Android Dev', 'iOS Dev', 'Cross-Platform'],
    color: 'blue',
  },
  {
    category: 'Programming Languages',
    icon: '💻',
    items: ['C', 'C++', 'Java', 'Python', 'JavaScript', 'TypeScript', 'Dart'],
    color: 'purple',
  },
  {
    category: 'UI / UX & Design',
    icon: '✒️',
    items: ['Figma', 'Canva', 'UI Wireframing', 'UX Design', 'Design Systems', 'Responsive Design', 'A11y'],
    color: 'cyan',
  },
  {
    category: 'Tools & Others',
    icon: '🛠️',
    items: ['Git', 'GitHub', 'VS Code', 'Postman', 'npm/yarn', 'n8n'],
    color: 'blue',
  },
  {
    category: 'Animation & 3D',
    icon: '✨',
    items: ['Three.js', 'GSAP', 'Framer Motion', 'CSS Animations'],
    color: 'purple',
  },
  {
    category: 'Soft Skills',
    icon: '🎯',
    items: ['Problem Solving', 'Team Collaboration', 'Communication', 'Time Management'],
    color: 'cyan',
  },
];

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
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

  const getColorClass = (color: string) => {
    switch (color) {
      case 'blue':
        return 'neon-border-blue hover-glow-blue';
      case 'purple':
        return 'neon-border-purple hover-glow-purple';
      case 'cyan':
        return 'neon-border-cyan hover-glow-blue';
      default:
        return 'neon-border-blue hover-glow-blue';
    }
  };

  const getTextColorClass = (color: string) => {
    switch (color) {
      case 'blue':
        return 'neon-text-blue';
      case 'purple':
        return 'neon-text-purple';
      case 'cyan':
        return 'neon-text-cyan';
      default:
        return 'neon-text-blue';
    }
  };

  const getItemHoverClass = (color: string) => {
    switch (color) {
      case 'blue':
        return 'hover:border-blue-500/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:bg-blue-500/10 hover:text-blue-200';
      case 'purple':
        return 'hover:border-purple-500/50 hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] hover:bg-purple-500/10 hover:text-purple-200';
      case 'cyan':
        return 'hover:border-cyan-400/50 hover:shadow-[0_0_15px_rgba(34,211,238,0.5)] hover:bg-cyan-400/10 hover:text-cyan-200';
      default:
        return 'hover:border-blue-500/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:bg-blue-500/10 hover:text-blue-200';
    }
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-4 py-20 relative"
    >
      <div className="container mx-auto max-w-7xl">
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
              <span className="gradient-text">Skills & Expertise</span>
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isVisible ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="w-24 h-1 bg-gradient-to-r from-primary via-secondary to-accent mx-auto rounded-full"
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-muted-foreground text-lg xl:text-xl max-w-3xl mx-auto"
            >
              A comprehensive toolkit for building modern, scalable web applications
            </motion.p>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.category}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                className={`glass-card ${getColorClass(skill.color)} rounded-3xl p-8 space-y-6 group`}
              >
                {/* Category Header */}
                <div className="flex items-center gap-4">
                  <div className="text-5xl group-hover:scale-110 transition-transform duration-300">
                    {skill.icon}
                  </div>
                  <h3 className={`text-2xl font-bold ${getTextColorClass(skill.color)}`}>
                    {skill.category}
                  </h3>
                </div>

                {/* Skills List */}
                <div className="flex flex-wrap gap-3">
                  {skill.items.map((item, itemIndex) => (
                    <motion.span
                      key={item}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.4, delay: 1 + index * 0.1 + itemIndex * 0.05 }}
                      className={`glass-card px-4 py-2 rounded-full text-sm font-medium text-foreground transition-all duration-300 cursor-pointer border border-transparent hover:scale-105 ${getItemHoverClass(skill.color)}`}
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>

                {/* Decorative element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            ))}
          </div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="glass-card neon-border-blue rounded-3xl py-6 px-10 text-center hover-glow-blue flex items-center justify-center"
          >
            <p className="text-lg xl:text-xl text-muted-foreground">
              <span className="neon-text-blue font-semibold">
                <TypewriterText
                  text="Always learning"
                  start={isVisible}
                  delay={1500}
                  showCursor={false}
                />
              </span>
              <TypewriterText
                text=" and staying up-to-date with the latest technologies and best practices in web development."
                start={isVisible}
                delay={1950} // 1500 + (15 chars * 30ms) = 1950ms
              />
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
