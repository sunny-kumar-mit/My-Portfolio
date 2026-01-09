import { useRef, useState, useEffect } from 'react';
import { motion, useAnimationControls } from 'motion/react';
import CertificationCard from './ui/CertificationCard';
import CertificationModal, { type CertificationData } from './ui/CertificationModal';
import CertificationHoverPopup from './ui/CertificationHoverPopup';

// Dummy Data
const certifications: CertificationData[] = [
    {
        id: '1',
        title: 'Foundations of Cybersecurity',
        issuer: 'Google / Coursera',
        date: 'Jan 2026',
        image: 'https://i.postimg.cc/wBG5Gb8z/image.png',
        skills: [
            'Cybersecurity Fundamentals',
            'Security Principles',
            'Threat & Risk Management',
            'Network Security Basics',
            'Digital Safety & Privacy'
        ],
        credentialLink: 'https://coursera.org/verify/PRCVNUC5EV0Y',
        description:
            'Industry-recognized certification by Google validating foundational knowledge of cybersecurity concepts, including threat identification, risk management, security practices, and protecting digital assets in modern systems.',
        color: 'blue'
    },
    {
        id: '2',
        title: 'Internal Smart India Hackathon 2025',
        issuer: 'Smart India Hackathon / MIT ADT University, Pune',
        date: 'Sep 2025',
        image: 'https://i.postimg.cc/R0js1Jqz/image.png',
        skills: [
            'Problem Solving',
            'Hackathon Experience',
            'Team Collaboration',
            'Innovation & Ideation',
            'Rapid Prototyping',
            'Software Development'
        ],
        credentialLink: 'https://i.postimg.cc/R0js1Jqz/image.png',
        description:
            'Certificate of participation awarded for active involvement in the Internal Smart India Hackathon (SIH) 2025. Team “GatiSutra” was shortlisted among the Top 50 teams out of approximately 800 teams, demonstrating strong problem-solving, innovation, and collaborative development skills.',
        color: 'purple',
    },
    {
        id: '3',
        title: 'Designing User Interfaces and User Interactions',
        issuer: 'Indian Institute of Technology Guwahati / Coursera',
        date: 'Jan 2026',
        image: 'https://i.postimg.cc/vHnVYHJJ/image.png',
        skills: [
            'UI Design',
            'Interaction Design',
            'User Experience (UX)',
            'Human-Centered Design',
            'Usability Principles',
            'Interface Prototyping'
        ],
        credentialLink: 'https://coursera.org/verify/7FKDG3Z83OCP',
        description:
            'An industry-recognized course authorized by IIT Guwahati and delivered via Coursera, focusing on designing effective user interfaces and interactions using human-centered design principles, usability guidelines, and modern UX practices.',
        color: 'blue',
    },
    {
        id: '4',
        title: 'UDAAN 2.0 – 24 Hrs Hackathon',
        issuer: 'Unstop / MIT Arts Design & Technology University, Pune',
        date: '2024',
        image: 'https://i.postimg.cc/qqYd2vfT/image.png',
        skills: [
            'Hackathon Participation',
            'Team Collaboration',
            'Problem Solving',
            'Rapid Prototyping',
            'UI/UX Design',
            'Web Development'
        ],
        credentialLink: 'https://unstop.com/certificate-preview/12c33534-78d6-4279-b44d-63b08277a9ad?utm_campaign=site-emails',
        description:
            'Certificate of participation awarded for taking part in UDAAN 2.0 – a 24-hour national hackathon organized by MIT Arts Design & Technology University, Pune. The event focused on uplifting developers, fostering innovation, and building practical solutions through teamwork and rapid development.',
        color: 'purple',
    },

    {
        id: '5',
        title: 'User Research Methods and Practices',
        issuer: 'Indian Institute of Technology Guwahati / Coursera',
        date: 'Jan 2026',
        image: 'https://i.postimg.cc/htBghw1R/image.png',
        skills: [
            'User Research',
            'Qualitative Research',
            'Quantitative Research',
            'User Interviews',
            'Usability Testing',
            'UX Research Methods'
        ],
        credentialLink: 'https://coursera.org/verify/84FL75A3TYEN',
        description:
            'A professional course authorized by IIT Guwahati and delivered through Coursera, focusing on core user research methodologies, qualitative and quantitative research techniques, usability testing, and evidence-based user-centered design practices.',
        color: 'blue',
    },
    {
        id: '6',
        title: 'Prompt Engineering for ChatGPT',
        issuer: 'Vanderbilt University / Coursera',
        date: 'Dec 2025',
        image: 'https://i.postimg.cc/6pTcr1Qx/image.png',
        skills: [
            'Prompt Engineering',
            'Generative AI',
            'Large Language Models (LLMs)',
            'AI Prompt Design',
            'Human-AI Interaction',
            'Applied Artificial Intelligence'
        ],
        credentialLink: 'https://coursera.org/verify/6EDNPSUZC2KR',
        description:
            'An applied AI course authorized by Vanderbilt University and delivered through Coursera, focusing on effective prompt engineering techniques for ChatGPT, optimizing human–AI interaction, and leveraging large language models for practical problem-solving and productivity.',
        color: 'purple',
    },

    {
        id: '7',
        title: 'Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate',
        issuer: 'Oracle University',
        date: 'Dec 2025',
        image: 'https://i.postimg.cc/NM6yNZGB/image.png',
        skills: [
            'Artificial Intelligence Fundamentals',
            'Machine Learning Basics',
            'Oracle Cloud Infrastructure (OCI)',
            'AI Use Cases',
            'Cloud Computing Concepts',
            'Responsible AI'
        ],
        credentialLink: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=C90C11D7526E7760FB4F5B981EDCB45E32C8A05F8C528CC63CDBF382D3FB2563',
        description:
            'An industry-recognized certification issued by Oracle University validating foundational knowledge of artificial intelligence concepts, machine learning basics, and AI use cases on Oracle Cloud Infrastructure, including responsible AI principles and cloud-based AI services.',
        color: 'blue',
    },


    {
        id: '8',
        title: 'Foundations and Advanced Practices in UX Design',
        issuer: 'Coursera / Indian Institute of Technology Guwahati',
        date: 'Jan 2026',
        image: 'https://i.postimg.cc/hvTtBhX8/image.png',
        skills: [
            'UX Design',
            'User Research',
            'User-Centered Design',
            'Interaction Design',
            'Usability Testing',
            'Design Thinking'
        ],
        credentialLink: 'https://coursera.org/verify/specialization/USSSP07GJRIO',
        description:
            'A specialization certificate offered by IIT Guwahati via Coursera, covering foundational to advanced UX design practices, including user research methods, interface design, usability principles, and human-centered design techniques.',
        color: 'purple',
    },
    {
        id: '9',
        title: 'Foundations of Data Science',
        issuer: 'Google / Coursera',
        date: 'Dec 2025',
        image: 'https://i.postimg.cc/cHK6Twn8/image.png',
        skills: [
            'Data Science Fundamentals',
            'Data Analysis',
            'Statistical Thinking',
            'Data-Driven Decision Making',
            'Analytical Problem Solving',
            'Data Ethics'
        ],
        credentialLink: 'https://coursera.org/verify/FX3L8X5GPCM1',
        description:
            'An industry-recognized course authorized by Google and delivered through Coursera, covering foundational data science concepts including data analysis, statistical thinking, ethical data use, and applying data-driven approaches to real-world problems.',
        color: 'blue',
    },
    {
        id: '10',
        title: 'AWS Cloud Practitioner Essentials',
        issuer: 'Amazon Web Services (AWS)',
        date: 'Dec 2025',
        image: 'https://i.postimg.cc/1zTchxZ8/image.png',
        skills: [
            'Cloud Computing Fundamentals',
            'AWS Core Services',
            'Cloud Security Basics',
            'AWS Pricing & Billing',
            'Cloud Architecture Concepts',
            'DevOps & Cloud Operations'
        ],
        credentialLink: 'https://i.postimg.cc/1zTchxZ8/image.png',
        description:
            'A foundational cloud certification issued by AWS Training & Certification, covering core cloud computing concepts, AWS global infrastructure, key AWS services, security fundamentals, pricing models, and best practices for operating in the AWS Cloud.',
        color: 'purple',
    },

    {
        id: '11',
        title: 'Hardware and Operating System Foundations II',
        issuer: 'Illinois Institute of Technology / Coursera',
        date: 'Jan 2026',
        image: 'https://i.postimg.cc/BQJ06myp/image.png',
        skills: [
            'Operating Systems',
            'Computer Hardware',
            'Memory Management',
            'Process Management',
            'System-Level Computing',
            'OS Fundamentals'
        ],
        credentialLink: 'https://coursera.org/verify/W7HJO078PEXN',
        description:
            'An advanced course authorized by Illinois Institute of Technology and offered through Coursera, focusing on hardware–software interaction, operating system fundamentals, memory and process management, and core system-level computing concepts.',
        color: 'blue',
    },

    {
        id: '12',
        title: 'The Bits and Bytes of Computer Networking',
        issuer: 'Google / Coursera',
        date: 'Dec 2025',
        image: 'https://i.postimg.cc/cCSZYnMW/image.png',
        skills: [
            'Computer Networking',
            'TCP/IP',
            'Network Protocols',
            'OSI Model',
            'IP Addressing',
            'Network Troubleshooting'
        ],
        credentialLink: 'https://coursera.org/verify/FL3LHK9BZV4Q',
        description:
            'An industry-recognized course authorized by Google and delivered through Coursera, covering the fundamentals of computer networking including TCP/IP, network protocols, the OSI model, IP addressing, and practical networking concepts.',
        color: 'purple',
    },
    {
        id: '13',
        title: 'Python 101 for Data Science',
        issuer: 'IBM SkillsBuild / IBM Developer Skills Network',
        date: 'Dec 2025',
        image: 'https://i.postimg.cc/L5N1sHRp/image.png',
        skills: [
            'Python Programming',
            'Data Science Fundamentals',
            'Data Types & Control Flow',
            'Data Analysis Basics',
            'Problem Solving',
            'Computational Thinking'
        ],
        credentialLink: 'https://courses.yl-ptech.skillsnetwork.site/certificates/acb243ddd5a3464f8b8ba74e7b5a98ab',
        description:
            'A foundational data science course issued by IBM SkillsBuild and delivered through the IBM Developer Skills Network, covering Python programming essentials, data handling, control structures, and core concepts required for entry-level data science and analytics roles.',
        color: 'blue',
    },


    {
        id: '14',
        title: 'Introduction to Internet of Things',
        issuer: 'Indian Institute of Technology Bombay / Coursera',
        date: 'Jan 2026',
        image: 'https://i.postimg.cc/kXPHswdT/image.png',
        skills: [
            'Internet of Things (IoT)',
            'Embedded Systems',
            'Sensors & Actuators',
            'IoT Architecture',
            'Smart Devices',
            'Connected Systems'
        ],
        credentialLink: 'https://coursera.org/verify/B1OSRZOG2CU3',
        description:
            'An introductory course authorized by IIT Bombay and delivered through Coursera, covering core Internet of Things concepts including IoT architecture, embedded systems, sensors, actuators, and real-world applications of connected devices.',
        color: 'purple',
    },
    {
        id: '15',
        title: 'Object Oriented Programming in Java',
        issuer: 'IBM / Coursera',
        date: 'Dec 2025',
        image: 'https://i.postimg.cc/6QXhk60Z/image.png',
        skills: [
            'Object-Oriented Programming (OOP)',
            'Java Programming',
            'Classes & Objects',
            'Inheritance & Polymorphism',
            'Encapsulation & Abstraction',
            'Software Design Principles'
        ],
        credentialLink: 'https://coursera.org/verify/3ODXYHMNZ07S',
        description:
            'A foundational programming course authorized by IBM and delivered through Coursera, focusing on object-oriented programming concepts in Java, including classes, objects, inheritance, polymorphism, and best practices for building scalable software.',
        color: 'blue',
    },

    {
        id: '16',
        title: 'Master Data Science & Machine Learning',
        issuer: 'GUVI / HCL',
        date: 'Dec 2025',
        image: 'https://i.postimg.cc/6qsHhfG8/image.png',
        skills: [
            'Data Science Fundamentals',
            'Machine Learning Basics',
            'Deep Learning Overview',
            'Large Language Models (LLMs)',
            'AI Career Foundations',
            'Industry Trends in AI'
        ],
        credentialLink: 'https://www.guvi.in/share-certificate/0d109X7e2ZaRz56w20',
        description:
            'A certificate of participation awarded by GUVI in collaboration with HCL for attending the webinar “Master Data Science & Machine Learning – Foundations to Deep Learning and LLMs,” covering key concepts, industry applications, and emerging trends in AI and machine learning.',
        color: 'purple',
    },


    {
        id: '17',
        title: 'Programming with Generative AI',
        issuer: 'Indian Institute of Technology Guwahati / Coursera',
        date: 'Jan 2026',
        image: 'https://i.postimg.cc/3RBkqncx/image.png',
        skills: [
            'Generative AI',
            'Prompt Engineering',
            'AI-Assisted Programming',
            'Large Language Models (LLMs)',
            'Python Programming',
            'Applied Artificial Intelligence'
        ],
        credentialLink: 'https://coursera.org/verify/WAJNP00GTFLY',
        description:
            'An advanced course authorized by IIT Guwahati and delivered via Coursera, focusing on programming with Generative AI, prompt engineering, and leveraging large language models to enhance software development and problem-solving workflows.',
        color: 'blue',
    },
    {
        id: '18',
        title: 'UX Design: An Introduction',
        issuer: 'Indian Institute of Technology Guwahati / Coursera',
        date: 'Dec 2025',
        image: 'https://i.postimg.cc/KjBrzRmS/image.png',
        skills: [
            'User Experience (UX)',
            'Design Thinking',
            'Human-Centered Design',
            'Usability Principles',
            'Interaction Design Basics',
            'UX Fundamentals'
        ],
        credentialLink: 'https://coursera.org/verify/LRU5TMQ3ODHL',
        description:
            'A foundational UX course authorized by IIT Guwahati and delivered through Coursera, introducing core user experience design concepts, design thinking approaches, usability principles, and human-centered design methodologies.',
        color: 'purple',
    },

    {
        id: '19',
        title: 'Advanced C++ Training',
        issuer: 'Spoken Tutorial Project / IIT Bombay',
        date: 'Apr 2025',
        image: 'https://i.postimg.cc/VkXVZTFb/image.png',
        skills: [
            'C++ Programming',
            'Object-Oriented Programming',
            'Advanced C++ Concepts',
            'STL Basics',
            'Memory Management',
            'Problem Solving'
        ],
        credentialLink: 'https://i.postimg.cc/VkXVZTFb/image.png',
        description:
            'An advanced C++ programming training conducted under the Spoken Tutorial Project by IIT Bombay, involving a supervised online examination. The course focuses on advanced C++ concepts, object-oriented programming principles, and practical problem-solving skills, validated through a formal assessment.',
        color: 'blue',
    },

    {
        id: '20',
        title: 'Foundations of Coding: Full-Stack',
        issuer: 'Microsoft / Coursera',
        date: 'Jan 2026',
        image: 'https://i.postimg.cc/FRd9yGQ1/image.png',
        skills: [
            'Full-Stack Development',
            'Programming Fundamentals',
            'Web Development Basics',
            'Frontend & Backend Concepts',
            'Problem Solving',
            'Software Development Foundations'
        ],
        credentialLink: 'https://coursera.org/verify/WIUU0E14F4GU',
        description:
            'A foundational full-stack development course authorized by Microsoft and delivered through Coursera, covering core programming concepts, web development fundamentals, and the essential skills required to build end-to-end software applications.',
        color: 'blue',
    },
    {
        id: '21',
        title: 'Foundations of User Experience (UX) Design',
        issuer: 'Google / Coursera',
        date: 'Jan 2026',
        image: 'https://i.postimg.cc/JzYVpJxB/image.png',
        skills: [
            'User Experience (UX)',
            'UX Research Fundamentals',
            'Human-Centered Design',
            'Design Thinking',
            'Usability Principles',
            'Product Design Basics'
        ],
        credentialLink: 'https://coursera.org/verify/9SXRWHLCW1QY',
        description:
            'An industry-recognized course authorized by Google and delivered through Coursera, covering the foundations of user experience design, including human-centered design principles, UX research basics, usability, and designing intuitive digital products.',
        color: 'blue',
    },
    {
        id: '22',
        title: 'AI For Everyone',
        issuer: 'DeepLearning.AI / Coursera',
        date: 'Dec 2025',
        image: 'https://i.postimg.cc/XNsnHQWK/image.png',
        skills: [
            'Artificial Intelligence Fundamentals',
            'AI Concepts & Terminology',
            'Machine Learning Basics',
            'AI Ethics',
            'Business Applications of AI',
            'Human-AI Collaboration'
        ],
        credentialLink: 'https://coursera.org/verify/073S4M4YO09E',
        description:
            'A foundational AI literacy course authorized by DeepLearning.AI and delivered through Coursera, designed to explain core artificial intelligence concepts, real-world AI applications, ethical considerations, and how organizations can effectively adopt AI technologies.',
        color: 'purple',
    },

    {
        id: '23',
        title: 'C Training',
        issuer: 'Spoken Tutorial Project / IIT Bombay',
        date: 'Dec 2024',
        image: 'https://i.postimg.cc/FzD9Sz7p/image.png',
        skills: [
            'C Programming',
            'Programming Fundamentals',
            'Control Structures',
            'Functions & Arrays',
            'Pointers Basics',
            'Problem Solving'
        ],
        credentialLink: 'https://i.postimg.cc/FzD9Sz7p/image.png',
        description:
            'A certified C programming training conducted under the Spoken Tutorial Project by IIT Bombay, involving a proctored online examination and hands-on learning. The course covers core C programming concepts and fundamental problem-solving techniques, validated with a perfect score.',
        color: 'blue',
    },

    {
        id: '24',
        title: 'Foundations: Data, Data, Everywhere',
        issuer: 'Google / Coursera',
        date: 'Jan 2026',
        image: 'https://i.postimg.cc/RZyp3TGK/image.png',
        skills: [
            'Data Analytics Fundamentals',
            'Data-Driven Decision Making',
            'Data Lifecycle',
            'Spreadsheets & Data Tools',
            'Analytical Thinking',
            'Data Ethics'
        ],
        credentialLink: 'https://coursera.org/verify/AF1N8EJ46A2D',
        description:
            'An industry-recognized course authorized by Google and delivered through Coursera, introducing the fundamentals of data analytics, data-driven thinking, the data lifecycle, and ethical considerations for working with data.',
        color: 'purple',
    },
    {
        id: '25',
        title: 'Introduction to Front-End Development',
        issuer: 'Meta / Coursera',
        date: 'Jan 2026',
        image: 'https://i.postimg.cc/66M020pt/image.png',
        skills: [
            'Front-End Development',
            'HTML5',
            'CSS3',
            'JavaScript Fundamentals',
            'Web Development Basics',
            'Responsive Design'
        ],
        credentialLink: 'https://coursera.org/verify/HC7LCYHPA3IX',
        description:
            'A foundational course authorized by Meta and delivered through Coursera, introducing core front-end development concepts including HTML, CSS, JavaScript basics, responsive design principles, and modern web development workflows.',
        color: 'blue',
    },







];

// Marquee Component
const MarqueeContainer = ({
    children,
    direction = 'left',
    speed = 20,
    pauseOnHover = false
}: {
    children: React.ReactNode,
    direction?: 'left' | 'right',
    speed?: number,
    pauseOnHover?: boolean
}) => {
    const controls = useAnimationControls();
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const startAnimation = async () => {
            if (isHovered && pauseOnHover) {
                controls.stop();
                return;
            }

            // Calculate X values based on direction
            // For infinite loop, we translate -50% (since content is duplicated)
            // left: 0 -> -50%
            // right: -50% -> 0

            const target = direction === 'left' ? '-50%' : '0%';
            const initial = direction === 'left' ? '0%' : '-50%';

            await controls.start({
                x: [initial, target],
                transition: {
                    duration: speed,
                    ease: "linear",
                    repeat: Infinity,
                    repeatType: "loop",
                }
            });
        };

        startAnimation();
    }, [controls, direction, speed, isHovered, pauseOnHover]);

    return (
        <div
            className="flex overflow-hidden select-none w-full"
            onMouseEnter={pauseOnHover ? () => setIsHovered(true) : undefined}
            onMouseLeave={pauseOnHover ? () => setIsHovered(false) : undefined}
        >
            <motion.div
                animate={controls}
                className="flex min-w-max flex-shrink-0 items-center py-4"
            >
                {children}
                {children} {/* Duplicate interactive children for seamless loop */}
            </motion.div>
        </div>
    );
};

export default function CertificationsSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [selectedCert, setSelectedCert] = useState<CertificationData | null>(null);

    // Popup State
    const [hoveredCert, setHoveredCert] = useState<CertificationData | null>(null);
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const [isMobile, setIsMobile] = useState(false);

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

    const featuredIds = ['8', '7', '10', '16', '20', '2'];
    const featuredCerts = featuredIds
        .map(id => certifications.find(cert => cert.id === id))
        .filter((cert): cert is CertificationData => cert !== undefined);

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

    return (
        <section
            id="certifications"
            ref={sectionRef}
            className="min-h-[80vh] flex items-center justify-center py-20 relative overflow-hidden"
        >
            <div className="w-full relative z-10">

                {/* Header */}
                <div className="container mx-auto max-w-7xl px-4 text-center space-y-4 mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isVisible ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold"
                    >
                        <span className="gradient-text">Certifications</span> & Milestones
                    </motion.h2>

                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={isVisible ? { scaleX: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-24 h-1 bg-gradient-to-r from-primary via-secondary to-accent mx-auto rounded-full"
                    />

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isVisible ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-muted-foreground text-lg max-w-2xl mx-auto"
                    >
                        Verified credentials that strengthen my technical foundation
                    </motion.p>
                </div>

                {/* Featured Certifications Grid */}
                <div className="container mx-auto max-w-7xl px-4 mb-20">
                    <motion.div
                        initial="hidden"
                        animate={isVisible ? "visible" : "hidden"}
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.15
                                }
                            }
                        }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center"
                    >
                        {featuredCerts.map((cert, index) => (
                            <CertificationCard
                                key={`featured-${cert.id}`}
                                index={index}
                                certification={cert}
                                onClick={() => {
                                    setSelectedCert(cert);
                                    setHoveredCert(null);
                                }}
                                onMouseEnter={(e) => {
                                    if (!isMobile) {
                                        setHoveredCert(cert);
                                        setCursorPos({ x: e.clientX, y: e.clientY });
                                    }
                                }}
                                onMouseLeave={() => !isMobile && setHoveredCert(null)}
                                onMouseMove={handleMouseMove}
                            />
                        ))}
                    </motion.div>
                </div>

                {/* Dual Marquee Container */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="space-y-8"
                >
                    {/* Row 1: Left to Right -> Direction Right */}
                    <MarqueeContainer direction="right" speed={40}>
                        {certifications.map((cert, index) => (
                            <CertificationCard
                                key={`${cert.id}-row1-${index}`}
                                index={index}
                                certification={cert}
                                onClick={() => {
                                    setSelectedCert(cert);
                                    setHoveredCert(null);
                                }}
                                className="mr-8"
                                disableAnimation={true}
                                onMouseEnter={(e) => {
                                    if (!isMobile) {
                                        setHoveredCert(cert);
                                        setCursorPos({ x: e.clientX, y: e.clientY });
                                    }
                                }}
                                onMouseLeave={() => !isMobile && setHoveredCert(null)}
                                onMouseMove={handleMouseMove}
                            />
                        ))}
                    </MarqueeContainer>

                    {/* Row 2: Right to Left -> Direction Left */}
                    <MarqueeContainer direction="left" speed={40}>
                        {certifications.map((cert, index) => (
                            <CertificationCard
                                key={`${cert.id}-row2-${index}`}
                                index={index}
                                certification={cert}
                                onClick={() => {
                                    setSelectedCert(cert);
                                    setHoveredCert(null);
                                }}
                                className="mr-8"
                                disableAnimation={true}
                                onMouseEnter={(e) => {
                                    if (!isMobile) {
                                        setHoveredCert(cert);
                                        setCursorPos({ x: e.clientX, y: e.clientY });
                                    }
                                }}
                                onMouseLeave={() => !isMobile && setHoveredCert(null)}
                                onMouseMove={handleMouseMove}
                            />
                        ))}
                    </MarqueeContainer>
                </motion.div>

            </div>

            {/* Decorative Background Elements */}
            <div className="absolute top-1/4 -left-64 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

            {/* Modal */}
            <CertificationModal
                certification={selectedCert}
                isOpen={!!selectedCert}
                onClose={() => setSelectedCert(null)}
            />

            <CertificationHoverPopup
                certification={!selectedCert ? hoveredCert : null}
                isOpen={!!hoveredCert && !selectedCert}
                onClose={() => setHoveredCert(null)}
                cursorPos={cursorPos}
                isMobile={isMobile}
            />

        </section>
    );
}
