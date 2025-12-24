import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

const experiences = [
  {
    year: '2023 - Present',
    title: 'Senior Full Stack Developer',
    company: 'Tech Innovations Inc.',
    description: 'Leading development of scalable web applications using MERN stack. Implementing modern UI/UX designs with advanced animations and 3D effects.',
    achievements: [
      'Improved application performance by 40%',
      'Led team of 5 developers',
      'Implemented CI/CD pipelines',
    ],
    color: 'blue',
  },
  {
    year: '2022 - 2023',
    title: 'Full Stack Developer',
    company: 'Digital Solutions Ltd.',
    description: 'Developed and maintained multiple client projects using React, Node.js, and MongoDB. Focused on creating responsive and accessible web applications.',
    achievements: [
      'Delivered 15+ successful projects',
      'Reduced bug reports by 60%',
      'Mentored junior developers',
    ],
    color: 'purple',
  },
  {
    year: '2021 - 2022',
    title: 'Frontend Developer',
    company: 'Creative Web Studio',
    description: 'Specialized in creating interactive and animated user interfaces using React and modern CSS frameworks. Collaborated with designers to bring creative visions to life.',
    achievements: [
      'Built 20+ responsive websites',
      'Implemented complex animations',
      'Improved user engagement by 50%',
    ],
    color: 'cyan',
  },
  {
    year: '2020 - 2021',
    title: 'Junior Web Developer',
    company: 'StartUp Hub',
    description: 'Started career building websites and web applications. Learned full-stack development and gained experience with various technologies and frameworks.',
    achievements: [
      'Completed intensive training program',
      'Contributed to 10+ projects',
      'Earned multiple certifications',
    ],
    color: 'blue',
  },
];

export default function ExperienceSection() {
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
        return 'border-primary bg-primary/20';
      case 'purple':
        return 'border-secondary bg-secondary/20';
      case 'cyan':
        return 'border-accent bg-accent/20';
      default:
        return 'border-primary bg-primary/20';
    }
  };

  const getGlowClass = (color: string) => {
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
      id="experience"
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
              <span className="gradient-text">Experience</span>
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
              My professional journey and career milestones
            </motion.p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 xl:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent transform xl:-translate-x-1/2" />

            {/* Experience items */}
            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.8 + index * 0.2 }}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'xl:flex-row' : 'xl:flex-row-reverse'
                  } flex-col xl:gap-12`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-8 xl:left-1/2 transform xl:-translate-x-1/2 -translate-y-1/2 top-8">
                    <div className={`w-6 h-6 rounded-full border-4 ${getColorClass(exp.color)} animate-pulse-glow`} />
                  </div>

                  {/* Content */}
                  <div className={`w-full xl:w-[calc(50%-3rem)] ml-20 xl:ml-0 ${index % 2 === 0 ? 'xl:text-right' : 'xl:text-left'}`}>
                    <div className={`glass-card ${getGlowClass(exp.color)} rounded-3xl p-8 space-y-4 group`}>
                      {/* Year badge */}
                      <div className={`inline-block glass-card px-4 py-2 rounded-full text-sm font-semibold ${
                        exp.color === 'blue' ? 'neon-text-blue' : exp.color === 'purple' ? 'neon-text-purple' : 'neon-text-cyan'
                      }`}>
                        {exp.year}
                      </div>

                      {/* Title and Company */}
                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                          {exp.title}
                        </h3>
                        <p className="text-lg font-semibold text-muted-foreground">
                          {exp.company}
                        </p>
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground leading-relaxed">
                        {exp.description}
                      </p>

                      {/* Achievements */}
                      <div className="space-y-2 pt-4">
                        <p className="text-sm font-semibold text-foreground">Key Achievements:</p>
                        <ul className={`space-y-1 ${index % 2 === 0 ? 'xl:text-right' : 'xl:text-left'}`}>
                          {exp.achievements.map((achievement) => (
                            <li key={achievement} className="text-sm text-muted-foreground flex items-center gap-2 xl:justify-start">
                              <span className="text-primary">✓</span>
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Decorative glow */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
