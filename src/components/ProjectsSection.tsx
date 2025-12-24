import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'Full-stack MERN e-commerce application with payment integration, user authentication, and admin dashboard.',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    color: 'blue',
    icon: '🛒',
  },
  {
    title: 'Social Media Dashboard',
    description: 'Real-time social media analytics dashboard with interactive charts and data visualization.',
    tags: ['React', 'Express', 'WebSockets', 'Chart.js'],
    color: 'purple',
    icon: '📊',
  },
  {
    title: 'Task Management App',
    description: 'Collaborative task management tool with drag-and-drop functionality and team collaboration features.',
    tags: ['React', 'MongoDB', 'REST API', 'Tailwind'],
    color: 'cyan',
    icon: '✅',
  },
  {
    title: 'Portfolio Website',
    description: 'Modern portfolio website with 3D animations, smooth transitions, and responsive design.',
    tags: ['React', 'Three.js', 'GSAP', 'Framer Motion'],
    color: 'blue',
    icon: '🎨',
  },
  {
    title: 'Blog Platform',
    description: 'Full-featured blogging platform with markdown support, comments, and user profiles.',
    tags: ['React', 'Node.js', 'MongoDB', 'JWT'],
    color: 'purple',
    icon: '📝',
  },
  {
    title: 'Weather Dashboard',
    description: 'Real-time weather application with location-based forecasts and interactive maps.',
    tags: ['React', 'API Integration', 'Geolocation', 'Charts'],
    color: 'cyan',
    icon: '🌤️',
  },
];

export default function ProjectsSection() {
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

  return (
    <section
      id="projects"
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
              <span className="gradient-text">Featured Projects</span>
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
              A showcase of my recent work and creative projects
            </motion.p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                className={`glass-card ${getColorClass(project.color)} rounded-3xl p-8 space-y-6 group cursor-pointer relative overflow-hidden`}
              >
                {/* Project Icon */}
                <div className="flex items-center justify-between">
                  <div className="text-6xl group-hover:scale-110 transition-transform duration-300">
                    {project.icon}
                  </div>
                  <div className="glass-card px-4 py-2 rounded-full text-sm font-medium">
                    View Project →
                  </div>
                </div>

                {/* Project Title */}
                <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>

                {/* Project Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="glass-card px-3 py-1 rounded-full text-xs font-medium text-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Decorative glow */}
                <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            ))}
          </div>

          {/* View More Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="text-center"
          >
            <a
              href="#contact"
              className="inline-block magnetic-btn glass-card neon-border-purple px-8 py-4 rounded-full font-semibold text-lg hover-glow-purple transition-all duration-300 hover:scale-105"
            >
              Want to see more? Let's talk!
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
