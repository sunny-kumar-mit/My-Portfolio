import { motion, AnimatePresence } from 'motion/react';
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import { ExternalLink, Award, Calendar, X } from 'lucide-react';
import type { CertificationData } from './CertificationModal';

interface CertificationHoverPopupProps {
    certification: CertificationData | null;
    isOpen: boolean;
    onClose: () => void;
    cursorPos: { x: number; y: number };
    isMobile: boolean;
}

const CertificationHoverPopup = ({ certification, isOpen, onClose, cursorPos, isMobile }: CertificationHoverPopupProps) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    if (!mounted) return null;

    const portalRoot = document.body;

    const getGlowColor = (color: string) => {
        switch (color) {
            case 'blue': return 'rgba(59, 130, 246, 0.4)';
            case 'purple': return 'rgba(168, 85, 247, 0.4)';
            case 'cyan': return 'rgba(34, 211, 238, 0.4)';
            default: return 'rgba(59, 130, 246, 0.4)';
        }
    };

    const glowColor = certification ? getGlowColor(certification.color) : 'transparent';

    return createPortal(
        <AnimatePresence>
            {isOpen && certification && (
                <>
                    {/* Mobile Backdrop */}
                    {isMobile && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={onClose}
                            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
                        />
                    )}

                    {/* Popup Card */}
                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: 0.92,
                            x: isMobile ? '-50%' : cursorPos.x + 20,
                            y: isMobile ? '-50%' : cursorPos.y + 20
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            x: isMobile ? '-50%' : cursorPos.x + 20,
                            y: isMobile ? '-50%' : cursorPos.y + 20,
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0.95,
                            transition: { duration: 0.2 }
                        }}
                        transition={{
                            type: 'spring',
                            damping: 20,
                            stiffness: 150,
                            x: { type: 'spring', damping: 20, stiffness: 150, mass: 0.5 },
                            y: { type: 'spring', damping: 20, stiffness: 150, mass: 0.5 }
                        }}
                        style={{
                            position: 'fixed',
                            left: isMobile ? '50%' : 0,
                            top: isMobile ? '50%' : 0,
                            zIndex: 61,
                        }}
                        className={`
              w-[90vw] max-w-[380px] 
              glass-card rounded-2xl overflow-hidden border border-white/10
              shadow-[0_0_30px_rgba(0,0,0,0.5)]
              ${isMobile ? '' : 'pointer-events-none'} 
            `}
                    >
                        {/* Glow Effect */}
                        <div
                            className="absolute inset-0 opacity-20 pointer-events-none"
                            style={{
                                background: `radial-gradient(circle at 50% 50%, ${glowColor}, transparent 70%)`
                            }}
                        />

                        {/* Content */}
                        <div className="relative p-5 space-y-4 bg-background/80 backdrop-blur-xl">
                            {/* Header */}
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex-1 min-w-0">
                                    <span className="inline-block text-[10px] uppercase tracking-wider font-bold text-muted-foreground mb-1">
                                        {certification.issuer}
                                    </span>
                                    <h3 className="text-lg font-bold text-foreground leading-tight truncate">
                                        {certification.title}
                                    </h3>
                                </div>
                                {isMobile && (
                                    <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                                        <X size={18} />
                                    </button>
                                )}
                            </div>

                            {/* Description */}
                            <p className="text-xs text-muted-foreground line-clamp-3">
                                {certification.description}
                            </p>

                            {/* Skills Tag Cloud */}
                            <div className="flex flex-wrap gap-1.5">
                                {certification.skills.slice(0, 4).map((skill, i) => (
                                    <motion.span
                                        key={skill}
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/5 border border-white/5 text-muted-foreground"
                                    >
                                        {skill}
                                    </motion.span>
                                ))}
                                {certification.skills.length > 4 && (
                                    <span className="text-[10px] px-2 py-0.5 text-muted-foreground">+{certification.skills.length - 4}</span>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2 pt-2">
                                <a
                                    href={certification.credentialLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 flex items-center justify-center gap-1.5 bg-primary/20 hover:bg-primary/30 text-primary text-xs font-semibold py-2 rounded-lg transition-colors"
                                    style={{ pointerEvents: 'auto' }}
                                >
                                    <ExternalLink size={14} />
                                    Verify Credential
                                </a>
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px] text-muted-foreground">
                                <div className="flex items-center gap-1.5">
                                    <Award size={12} />
                                    <span>Verified</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Calendar size={12} />
                                    <span>{certification.date}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>,
        portalRoot
    );
};

export default CertificationHoverPopup;
