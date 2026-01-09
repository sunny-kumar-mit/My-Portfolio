import { motion, AnimatePresence } from 'motion/react';
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import { Github, ExternalLink, X, Layers, CheckCircle2, ArrowRight, Award, Linkedin } from 'lucide-react';

interface ProjectData {
    title: string;
    description: string;
    tags: string[];
    color: string;
    icon: string;
    image: string;
    category?: string;
    ghLink?: string;
    demoLink?: string;
    certificateLink?: string;
    linkedinLink?: string;
    status?: string;
    year?: string;
    // Rich Content fields
    objective?: string;
    features?: string[];
    techStackDetails?: string[];
    howItWorks?: string[];
    useCases?: string[];
    futureEnhancements?: string[];
}

interface DetailedProjectModalProps {
    project: ProjectData | null;
    isOpen: boolean;
    onClose: () => void;
}

const TypewriterText = ({ text, delay }: { text: string; delay: number }) => {
    const [displayText, setDisplayText] = useState('');

    useEffect(() => {
        let currentText = '';
        let currentIndex = 0;
        setDisplayText(''); // Reset on text change

        const startTimeout = setTimeout(() => {
            const interval = setInterval(() => {
                if (currentIndex < text.length) {
                    currentText += text[currentIndex];
                    setDisplayText(currentText);
                    currentIndex++;
                } else {
                    clearInterval(interval);
                }
            }, 30); // Typing speed
            return () => clearInterval(interval);
        }, delay * 1000);

        return () => clearTimeout(startTimeout);
    }, [text, delay]);

    return <span>{displayText}</span>;
};

const DetailedProjectModal = ({ project, isOpen, onClose }: DetailedProjectModalProps) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    // Lock body scroll
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    if (!mounted) return null;

    const portalRoot = document.body;

    const getGlowColor = (color: string) => {
        switch (color) {
            case 'blue': return 'rgba(59, 130, 246, 0.6)';
            case 'purple': return 'rgba(168, 85, 247, 0.6)';
            case 'cyan': return 'rgba(34, 211, 238, 0.6)';
            default: return 'rgba(59, 130, 246, 0.6)';
        }
    };

    const getBorderColor = (color: string) => {
        switch (color) {
            case 'blue': return 'border-blue-500/30';
            case 'purple': return 'border-purple-500/30';
            case 'cyan': return 'border-cyan-400/30';
            default: return 'border-blue-500/30';
        }
    }

    const glowColor = project ? getGlowColor(project.color) : 'transparent';
    const borderColor = project ? getBorderColor(project.color) : 'border-white/10';

    return createPortal(
        <AnimatePresence>
            {isOpen && project && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className={`
                relative w-full max-w-5xl h-[100dvh] sm:h-[90vh] 
                glass-card rounded-none sm:rounded-3xl overflow-hidden flex flex-col
                border ${borderColor} shadow-2xl
            `}
                        style={{
                            boxShadow: `0 0 50px -12px ${glowColor}`
                        }}
                    >
                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto scrollbar-hide">

                            {/* Hero Section */}
                            <div className="relative h-64 sm:h-96 w-full overflow-hidden">
                                <motion.img
                                    initial={{ scale: 1.1 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 10, ease: 'linear' }} // Slow zoom effect
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover object-top"
                                />
                                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/90 to-transparent" />

                                {/* Hero Content */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.category && (
                                            <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider backdrop-blur-md border border-primary/20">
                                                {project.category}
                                            </span>
                                        )}
                                        <span className="px-3 py-1 rounded-full bg-white/10 text-foreground text-xs font-bold uppercase tracking-wider backdrop-blur-md border border-white/10">
                                            {project.status || 'Completed'}
                                        </span>
                                        <span className="px-3 py-1 rounded-full bg-white/10 text-foreground text-xs font-bold uppercase tracking-wider backdrop-blur-md border border-white/10">
                                            {project.year || '2024'}
                                        </span>
                                    </div>
                                    <h2 className="text-3xl sm:text-5xl font-bold text-white mb-2 leading-tight">
                                        {project.title}
                                    </h2>
                                </div>

                                {/* Close Button (Top Right) */}
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md border border-white/10 transition-colors z-10"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Main Content Grid */}
                            <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-3 gap-10">

                                {/* Left Column (Main Info) */}
                                <div className="lg:col-span-2 space-y-10">
                                    {/* Description */}
                                    <div>
                                        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-primary">
                                            <Layers size={20} />
                                            Project Overview
                                        </h3>
                                        <p className="text-muted-foreground leading-relaxed text-lg">
                                            {project.description}
                                        </p>
                                        {project.objective && (
                                            <p className="text-muted-foreground leading-relaxed text-lg mt-4">
                                                <strong className="text-foreground">Objective:</strong> {project.objective}
                                            </p>
                                        )}
                                    </div>

                                    {/* Key Features */}
                                    {project.features && (
                                        <div>
                                            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-purple-400">
                                                <CheckCircle2 size={20} />
                                                Key Features
                                            </h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {project.features.map((feature, i) => (
                                                    <motion.div
                                                        key={i}
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.1 * i }}
                                                        className="group flex gap-3 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-primary/30 hover:shadow-[0_0_15px_-5px_rgba(var(--primary),0.3)] hover:-translate-y-1 transition-all duration-300 cursor-default"
                                                    >
                                                        <div className="mt-1 min-w-[20px] text-primary group-hover:scale-110 transition-transform">✦</div>
                                                        <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                                                            <TypewriterText text={feature} delay={0.2 + (i * 0.1)} />
                                                        </span>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* How It Works */}
                                    {project.howItWorks && (
                                        <div>
                                            <h3 className="text-xl font-semibold mb-4 text-cyan-400">
                                                How It Works
                                            </h3>
                                            <ul className="space-y-3">
                                                {project.howItWorks.map((step, i) => (
                                                    <li key={i} className="flex gap-3 items-start">
                                                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-foreground mt-0.5">
                                                            {i + 1}
                                                        </span>
                                                        <span className="text-muted-foreground">{step}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Future Enhancements */}
                                    {project.futureEnhancements && (
                                        <div>
                                            <h3 className="text-xl font-semibold mb-4 text-emerald-400">
                                                Future Roadmap
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {project.futureEnhancements.map((item, i) => (
                                                    <span key={i} className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-300 text-sm border border-emerald-500/20">
                                                        {item}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Right Column (Sidebar) */}
                                <div className="space-y-8">
                                    {/* Tech Stack */}
                                    <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                                        <h3 className="text-lg font-semibold mb-4">Technology Stack</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {project.tags.map((tag) => (
                                                <span key={tag} className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium transition-colors">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Use Cases */}
                                    {project.useCases && (
                                        <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                                            <h3 className="text-lg font-semibold mb-4">Use Cases & Impact</h3>
                                            <ul className="space-y-3">
                                                {project.useCases.map((useCase, i) => (
                                                    <li key={i} className="text-sm text-muted-foreground flex gap-2">
                                                        <ArrowRight size={14} className="mt-1 text-primary shrink-0" />
                                                        {useCase}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Footer Padding for sticky bar */}
                            <div className="h-24" />
                        </div>

                        {/* Sticky Action Bar */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-background/80 backdrop-blur-xl border-t border-white/10 flex flex-col sm:flex-row gap-3 items-center justify-between z-20">
                            <div className="hidden sm:block text-sm text-muted-foreground">
                                Interested in this project? Let's discuss details.
                            </div>
                            <div className="flex w-full sm:w-auto gap-3 flex-wrap justify-center sm:justify-end">
                                {project.certificateLink && (
                                    <a
                                        href={project.certificateLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 sm:flex-none px-6 py-3 rounded-full bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/20 text-yellow-300 font-semibold flex items-center justify-center gap-2 transition-all hover:scale-105"
                                    >
                                        <Award size={18} />
                                        <span className="whitespace-nowrap">Certificate</span>
                                    </a>
                                )}
                                {project.linkedinLink && (
                                    <a
                                        href={project.linkedinLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 sm:flex-none px-6 py-3 rounded-full bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/20 text-blue-400 font-semibold flex items-center justify-center gap-2 transition-all hover:scale-105"
                                    >
                                        <Linkedin size={18} />
                                        <span className="whitespace-nowrap">LinkedIn Post</span>
                                    </a>
                                )}
                                {project.ghLink && (
                                    <a
                                        href={project.ghLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 sm:flex-none px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-foreground font-semibold flex items-center justify-center gap-2 transition-all hover:scale-105"
                                    >
                                        <Github size={18} />
                                        <span>Repository</span>
                                    </a>
                                )}
                                {project.demoLink && (
                                    <a
                                        href={project.demoLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`flex-1 sm:flex-none px-8 py-3 rounded-full font-semibold flex items-center justify-center gap-2 transition-all hover:scale-105 shadow-[0_0_20px_-5px_${glowColor}]`}
                                        style={{
                                            background: project.color === 'white' ? 'white' : `rgba(var(--${project.color}-500), 1)`, // Simplified/Custom color handling needed, defaulting to generic class logic
                                            backgroundColor: project.color === 'blue' ? '#3b82f6' : project.color === 'purple' ? '#a855f7' : '#06b6d4',
                                            color: 'white'
                                        }}
                                    >
                                        <ExternalLink size={18} />
                                        <span className="whitespace-nowrap">Live Demo</span>
                                    </a>
                                )}
                            </div>
                        </div>

                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        portalRoot
    );
};

export default DetailedProjectModal;
