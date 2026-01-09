import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import ProjectHoverPopup from './ui/ProjectHoverPopup';
import DetailedProjectModal from './ui/DetailedProjectModal';

const projects = [

  {
    title: 'ShopKart Online E-Commerce Platform',
    description: 'ShopKart is a fully functional full-stack e-commerce web application designed to deliver a complete online shopping experience—from user authentication to secure checkout and order management.',
    tags: ['React', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Stripe', 'Vercel (Frontend)', 'Render (Backend)'],
    color: 'blue',
    icon: '🛒',
    image: 'https://i.postimg.cc/NF1w8Xv0/Shop-Kart.jpg',
    category: 'Full-Stack E-Commerce',
    ghLink: 'https://github.com/sunny-kumar-mit/ShopKart-Backend.git',
    demoLink: 'https://shopkartindia.vercel.app/',
    linkedinLink: 'https://www.linkedin.com/posts/sunny-kumar-mit_fullstackdevelopment-mernstack-reactjs-activity-7413097788634234880-JDa0?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFHoAAEBTuTJM1gdMFXnI6c_-5avlcc-QbU',
    status: 'Live',
    year: '2026',
    objective: 'To simulate a production-grade e-commerce system, showcasing how frontend and backend services work together to power an online marketplace.',
    features: [
      'User Authentication & Authorization (JWT)',
      'Product Browsing & Search',
      'Cart & Order Management',
      'Secure Payment Integration (Stripe)',
      'Admin Dashboard',
      'RESTful API Architecture'
    ],
    techStackDetails: [
      'Frontend: React, Vercel',
      'Backend: Node.js, Express.js, Render',
      'Database: MongoDB',
      'Auth: JWT',
      'Payments: Stripe'
    ],
    howItWorks: [
      'Users register or log in securely',
      'Products are fetched from backend APIs',
      'Users add products to cart and checkout',
      'Payments are processed securely via Stripe',
      'Orders are managed via backend system'
    ],
    useCases: [
      'Demonstrates real-world e-commerce workflows',
      'Showcases full-stack development skills',
      'Suitable for startups and portfolio presentation'
    ],
    futureEnhancements: [
      'Wishlist functionality',
      'Order tracking & notifications',
      'Role-based admin controls',
      'Performance optimization & caching',
      'Mobile app version'
    ]
  },
  {
    title: 'FarmEdge',
    description:
      'FarmEdge is a smart agriculture assistance web platform designed to empower farmers with crop guidance, multilingual support, and an AI-powered chatbot for instant agricultural help. Selected for further development under CRiEYA.',
    tags: [
      'HTML5',
      'CSS3',
      'JavaScript',
      'AgriTech',
      'AI Chatbot',
      'Multilingual Support',
      'GovTech',
      'CRiEYA'
    ],
    color: 'purple',
    icon: '🌾',
    image: 'https://i.postimg.cc/rmZhYbm6/Farm-Edge-demo.jpg',
    category: 'Web Platform',
    status: 'Prototype',
    year: '2024',
    demoLink: 'https://sunny-kumar-mit.github.io/FarmEdge/',
    ghLink: 'https://github.com/sunny-kumar-mit/FarmEdge',
    objective: 'To bridge the gap between technology and traditional farming by providing an accessible, multilingual digital assistant that helps farmers make informed decisions related to crops, weather, and market trends-while remaining simple and farmer-friendly.',
    features: [
      'Interactive AI Chatbot for instant query resolution',
      'Bilingual Support (English & Hindi) for wider accessibility',
      'Smart Crop Recommendations based on season and soil',
      'Real-time Weather Integration for farming planning',
      'Intuitive Dashboard designed for low-digital-literacy users'
    ],
    techStackDetails: ['HTML5', 'CSS3', 'JavaScript', 'DOM Manipulation'],
    howItWorks: [
      'Select preferred language (English/Hindi).',
      'Navigate to the "Crop Guide" or "Weather" section.',
      'Use the chatbot to ask specific farming questions.',
      'Receive instant, data-backed guidance.'
    ],
    useCases: [
      'Small-scale farmers seeking crop advice',
      'Rural users needing voice/text assistance in local languages',
      'Agricultural students researching crop patterns'
    ],
    futureEnhancements: [
      'Voice-based interaction for hands-free usage',
      'Integration with Government Schemes API',
      'Market price tracking feature'
    ]
  },

  {
    title: 'Hybrid Renewable Energy Dashboard',
    description:
      'The Hybrid Renewable Energy Dashboard is a software-centric web platform developed for Smart India Hackathon (SIH) 2025, designed to optimize solar, wind, battery, and grid power as a single virtual power plant.',
    tags: ['Flutter', 'Dart', 'Energy Analytics', 'Netlify', 'Clean Tech', 'SIH 2025', 'Top 50'],
    color: 'cyan',
    icon: '🌱',
    image: 'https://i.postimg.cc/brJNTXtJ/Hybrid-Energy-Dashboard.jpg',
    category: 'Software Dashboard',
    status: 'Prototype',
    year: '2025',
    demoLink: 'https://keen-pithivier-bc886a.netlify.app/',
    ghLink: 'https://github.com/sunny-kumar-mit/Project-1.git',
    linkedinLink: 'https://www.linkedin.com/posts/ashmit-shingarwade-72b770324_smartindiahackathon-sih2025-innovation-ugcPost-7379047919158456320-ww4W?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFHoAAEBTuTJM1gdMFXnI6c_-5avlcc-QbU',
    objective: 'To deliver a unified, data-driven energy management dashboard that converts raw energy data into clear, actionable insights, enabling efficient renewable utilization, reduced grid dependency, and lower operational costs-while remaining simple for non-specialist users.',
    features: [
      'Unified Energy Monitoring',
      'Smart Analytics & Forecasting',
      'Operational Recommendations',
      'Carbon & Cost Insights'
    ],
    techStackDetails: ['Flutter', 'Dart', 'Netlify', 'Interactive Charts'],
    howItWorks: [
      'Ingests renewable generation and consumption data',
      'Analyzes to detect surplus, deficit, and optimization windows',
      'Presents real-time status and recommendations',
      'Administrators take informed actions'
    ],
    useCases: [
      'Improved renewable energy utilization',
      'Reduced electricity bills for campuses',
      'Transparent carbon reporting'
    ],
    futureEnhancements: [
      'Real-time weather-based energy forecasting',
      'Automated load control integration',
      'Advanced carbon analytics & reports',
      'Mobile app version'
    ]
  },
  {
    title: 'Mindful Mentor',
    description:
      'Mindful Mentor is a modern iOS mental wellness application built using SwiftUI, focused on promoting mindfulness, emotional balance, and mental clarity through a calm, visually soothing, and user-friendly experience.',
    tags: ['Swift', 'SwiftUI', 'iOS', 'UI Animations'],
    color: 'cyan',
    icon: '🧠',
    image: 'https://i.postimg.cc/wM6F42q3/Mindful-Mentor.jpg',
    category: 'Mental Health Tech',
    status: 'Prototype',
    year: '2024',
    demoLink: 'https://www.linkedin.com/posts/sunny-kumar-mit_swiftui-iosdev-mentalhealthtech-activity-7328488456358133761-W2ei',
    ghLink: 'https://github.com/sunny-kumar-mit/Project-8.git',
    linkedinLink: 'https://www.linkedin.com/posts/sunny-kumar-mit_swiftui-iosdev-mentalhealthtech-activity-7328488456358133761-W2ei?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFHoAAEBTuTJM1gdMFXnI6c_-5avlcc-QbU',

    objective: 'To provide users with a gentle digital companion that encourages mindfulness through design, motion, and interaction—not complexity.',
    features: [
      'Calming Animated UI',
      'Mindfulness-Focused Design',
      'Smooth Transitions & Motion',
      'Fully Native iOS App',
      'Modern Apple-Style UI/UX'
    ],
    techStackDetails: ['Swift', 'SwiftUI', 'iOS', 'Native Animations'],
    howItWorks: [
      'App launches with a welcoming, calming interface',
      'Users experience smooth transitions and guided UI flow',
      'Visual elements and motion promote relaxation',
      'Design encourages users to slow down'
    ],
    useCases: [
      'Supports daily mindfulness habits',
      'Encourages mental well-being',
      'Demonstrates design-led mental health tech'
    ],
    futureEnhancements: [
      'Guided meditation sessions',
      'Daily mindfulness reminders',
      'Mood tracking & journaling',
      'Haptic feedback'
    ]
  },
  {
    title: 'Portfolio Website',
    description: 'Modern portfolio website with 3D animations, smooth transitions, and responsive design.',
    tags: ['React', 'Three.js', 'GSAP', 'Framer Motion'],
    color: 'purple',
    icon: '🎨',
    image: 'https://i.postimg.cc/3NRmDcrN/My-Portfolio.jpg',
    category: 'Web Design',
    ghLink: 'https://github.com/sunny-kumar-mit',
    year: '2024',
    objective: 'To showcase skills and projects in an immersive, interactive digital environment.',
    features: ['3D Hero Elements', 'Smooth Scroll', 'Dark Mode', 'Responsive Layout'],
    useCases: ['Personal Branding', 'Job Applications']
  },
  {
    title: 'Property Registration Portal',
    description:
      'The Property Registration Portal is a citizen-centric digital governance web platform developed during UDAAN 2.0, a 24-hour National Hackathon hosted by MIT ADT University, Pune. It streamlines property registration and verification.',
    tags: ['HTML', 'CSS', 'JavaScript', 'GovTech', 'Hackathon Winner'],
    color: 'blue',
    icon: '🏛️',
    image: 'https://i.postimg.cc/C5b227fK/Property-Reg.jpg',
    category: 'GovTech Portal',
    year: '2024',
    demoLink: 'https://sunny-kumar-mit.github.io/Project-7/',
    ghLink: 'https://github.com/sunny-kumar-mit/Project-7.git',
    certificateLink: 'https://unstop.com/certificate-preview/12c33534-78d6-4279-b44d-63b08277a9ad?utm_campaign=site-emails',
    objective: 'To digitize and simplify the property registration process, enabling citizens to easily search, verify, and understand property information.',
    features: [
      'Simple & Advanced Property Search',
      'Live Property Details with Map Coordinates',
      'Disputed Property Checker',
      'Registry Office Locator',
      'Multilingual Support',
      'AI-based Registration Assistant'
    ],
    techStackDetails: ['HTML5', 'CSS3', 'JavaScript', 'GitHub Pages'],
    howItWorks: [
      'Users access the portal via a web browser',
      'Property details are searched using multiple parameters',
      'System displays property info, location, and dispute status',
      'AI assistant guides through registration'
    ],
    useCases: [
      'Faster and transparent property verification',
      'Reduced dependency on physical offices',
      'Improved citizen trust in digital services'
    ],
    futureEnhancements: [
      'Secure backend & database integration',
      'Aadhaar-based identity verification',
      'Blockchain-based property records'
    ]
  }
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Popup State (Desktop Hover)
  const [hoveredProject, setHoveredProject] = useState<typeof projects[0] | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // Modal State (Full Detail)
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  // Check mobile status
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMobile) {
      setCursorPos({ x: e.clientX, y: e.clientY });
    }
  };

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
                className={`glass-card ${getColorClass(project.color)} rounded-3xl p-0 space-y-0 group cursor-pointer relative overflow-hidden flex flex-col`}
                onMouseEnter={(e) => {
                  if (!isMobile) {
                    setHoveredProject(project);
                    setCursorPos({ x: e.clientX, y: e.clientY });
                  }
                }}
                onMouseLeave={() => !isMobile && setHoveredProject(null)}
                onMouseMove={handleMouseMove}
                onClick={() => {
                  setSelectedProject(project); // Open Full Modal
                  setHoveredProject(null); // Clear hover
                }}
              // Note: On mobile, click triggers popup. We enforce isMobile true just in case or use existing state.
              // Better: 
              // onClick={() => {
              //    if (isMobile) setHoveredProject(project);
              // }}
              >
                {/* Project Image */}
                <div className="w-full h-56 overflow-hidden relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-top transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="glass-card px-4 py-2 rounded-full text-sm font-medium">
                      View Details →
                    </div>
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  {/* Project Icon & Title */}
                  <div className="flex items-center gap-2">
                    <div className="text-3xl text-foreground">
                      {project.icon}
                    </div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                  </div>

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

      {/* Desktop Hover Popup (Only shows if modal is NOT open) */}
      <ProjectHoverPopup
        project={!selectedProject ? hoveredProject : null}
        isOpen={!!hoveredProject && !selectedProject}
        onClose={() => setHoveredProject(null)}
        cursorPos={cursorPos}
        isMobile={isMobile}
      />

      {/* Full Screen Detail Modal */}
      <DetailedProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
