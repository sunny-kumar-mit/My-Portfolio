import { motion, AnimatePresence } from 'motion/react';
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import { X, ExternalLink, Calendar, Award, CheckCircle2, ZoomIn } from 'lucide-react';

export interface CertificationData {
    id: string;
    title: string;
    issuer: string;
    date: string;
    image: string;
    skills: string[];
    credentialLink?: string;
    description?: string;
    color: 'blue' | 'purple' | 'cyan';
}

interface CertificationModalProps {
    certification: CertificationData | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function CertificationModal({ certification, isOpen, onClose }: CertificationModalProps) {
    const [mounted, setMounted] = useState(false);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    if (!mounted) return null;

    const getGlowColor = (color: string) => {
        switch (color) {
            case 'blue': return 'rgba(59, 130, 246, 0.5)';
            case 'purple': return 'rgba(168, 85, 247, 0.5)';
            case 'cyan': return 'rgba(34, 211, 238, 0.5)';
            default: return 'rgba(59, 130, 246, 0.5)';
        }
    };

    const glowColor = certification ? getGlowColor(certification.color) : 'transparent';

    return createPortal(
        <AnimatePresence>
            {isOpen && certification && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
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
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-4xl glass-card rounded-3xl overflow-hidden flex flex-col md:flex-row border border-white/10 shadow-2xl"
                        style={{
                            boxShadow: `0 0 50px -12px ${glowColor}`
                        }}
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md border border-white/10 transition-colors"
                        >
                            <X size={20} />
                        </button>

                        {/* Left Side: Image */}
                        <div
                            className="w-full md:w-1/2 h-64 md:h-auto relative overflow-hidden bg-black/40 group cursor-zoom-in"
                            onClick={() => setIsLightboxOpen(true)}
                        >
                            {/* Ambient Blurred Background */}
                            <div
                                className="absolute inset-0 z-0 bg-cover bg-center blur-xl opacity-40 scale-110"
                                style={{ backgroundImage: `url(${certification.image})` }}
                            />

                            <motion.img
                                initial={{ scale: 1.1 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.8 }}
                                src={certification.image}
                                alt={certification.title}
                                className="w-full h-full object-contain relative z-10 shadow-lg"
                            />
                            {/* Hover Overlay with Zoom Icon */}
                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                                <div className="bg-white/10 backdrop-blur-md p-3 rounded-full border border-white/20">
                                    <ZoomIn className="text-white" size={24} />
                                </div>
                            </div>


                        </div>

                        {/* Right Side: Content */}
                        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between bg-background/40 backdrop-blur-sm">
                            <div className="space-y-6">
                                <div>
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="flex flex-wrap gap-2 mb-3"
                                    >
                                        <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider border border-primary/20 flex items-center gap-1">
                                            <Award size={12} />
                                            {certification.issuer}
                                        </span>
                                        <span className="px-3 py-1 rounded-full bg-white/10 text-muted-foreground text-xs font-bold uppercase tracking-wider border border-white/10 flex items-center gap-1">
                                            <Calendar size={12} />
                                            {certification.date}
                                        </span>
                                    </motion.div>

                                    <motion.h2
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="text-2xl md:text-3xl font-bold text-foreground leading-tight"
                                    >
                                        {certification.title}
                                    </motion.h2>
                                </div>

                                {/* Skills */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Skills & Competencies</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {certification.skills.map((skill, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-sm transition-colors flex items-center gap-1.5"
                                            >
                                                <CheckCircle2 size={12} className={`text-${certification.color}-400`} />
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* Description if available */}
                                {certification.description && (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                        className="text-muted-foreground leading-relaxed"
                                    >
                                        {certification.description}
                                    </motion.p>
                                )}
                            </div>

                            {/* Footer Actions */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="mt-8 pt-6 border-t border-white/10"
                            >
                                {certification.credentialLink && (
                                    <a
                                        href={certification.credentialLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl`}
                                        style={{
                                            background: `linear-gradient(135deg, rgba(var(--${certification.color}-500), 0.2), rgba(var(--${certification.color}-500), 0.1))`,
                                            border: `1px solid rgba(var(--${certification.color}-500), 0.3)`,
                                            color: 'white'
                                        }}
                                    >
                                        <ExternalLink size={18} />
                                        Verify Credential
                                    </a>
                                )}
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Lightbox Overlay */}
            {isLightboxOpen && certification && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[110] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
                    onClick={() => setIsLightboxOpen(false)}
                >
                    <button
                        onClick={() => setIsLightboxOpen(false)}
                        className="absolute top-4 right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                    >
                        <X size={24} />
                    </button>

                    <motion.img
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        src={certification.image}
                        alt={certification.title}
                        className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself
                    />
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
}
