import { motion, AnimatePresence } from 'motion/react';
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import { Github, ExternalLink, X, Calendar, Layers } from 'lucide-react';

interface ProjectData {
    title: string;
    description: string;
    tags: string[];
    color: string;
    icon: string;
    image: string;
    // Extended fields
    category?: string;
    ghLink?: string;
    demoLink?: string;
    status?: string;
    year?: string;
}

interface ProjectHoverPopupProps {
    project: ProjectData | null;
    isOpen: boolean;
    onClose: () => void;
    cursorPos: { x: number; y: number };
    isMobile: boolean;
}

const ProjectHoverPopup = ({ project, isOpen, onClose, cursorPos, isMobile }: ProjectHoverPopupProps) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    if (!mounted) return null;

    // Determine portal target (body)
    const portalRoot = document.body;

    // Helper for color styles
    const getGlowColor = (color: string) => {
        switch (color) {
            case 'blue': return 'rgba(59, 130, 246, 0.4)';
            case 'purple': return 'rgba(168, 85, 247, 0.4)';
            case 'cyan': return 'rgba(34, 211, 238, 0.4)';
            default: return 'rgba(59, 130, 246, 0.4)';
        }
    };

    const glowColor = project ? getGlowColor(project.color) : 'transparent';

    return createPortal(
        <AnimatePresence>
            {isOpen && project && (
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
                            damping: 25,
                            stiffness: 300,
                            // Smooth movement for cursor follow on desktop
                            x: { type: 'spring', damping: 15, stiffness: 100, mass: 0.1 },
                            y: { type: 'spring', damping: 15, stiffness: 100, mass: 0.1 }
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
                    // Note: pointer-events-none on desktop to prevent flickering if cursor goes over popup,
                    // UNLESS we want interactions inside. 
                    // The prompt asks for "Action links", so we MUST allow pointer events.
                    // But if it follows cursor, cursor might cover it.
                    // Strategy: Offset popup slightly (handled in initial x/y). 
                    // If user wants to click buttons, they need to be able to move mouse TO it.
                    // Parallax usually implies it moves away or with cursor.
                    // Responsive fix: If we want clickable links on desktop, the popup cannot strictly "run away" from cursor
                    // or stick purely to cursor if that prevents hovering buttons.
                    // However, "Floating popup... follows cursor" usually implies a tooltip-like behavior (non-interactive) OR 
                    // a custom cursor/trail. 
                    // BUT requirements say "Primary button: Live Demo". 
                    // SO: It behaves like a tooltip that *can* be interacted with?
                    // Actually, for "On mouse leave: Popup faces out", if I move mouse INTO popup, I technically leave the card.
                    // This is tricky. 
                    // Solution: We track mouse on the *Grid Item*. If mouse moves into Popup, we must ensure Popup stays open.
                    // Implementation detail: The easiest robust way for "Action Links" in a hover popup 
                    // is usually "Stay open if hovered over popup too".
                    // For now, I will implement it such that on Desktop it follows cursor but allows interaction if we stop moving?
                    // Actually, standard "floating tooltip with actions" is bad UX if it moves *with* cursor constantly.
                    // The prompt says: "Popup slightly follows cursor movement (parallax feel)".
                    // Ill use a slight damping/lag so it feels organic, but maybe locking it or 
                    // relying on the user hovering the card area.
                    // Let's stick to the "slightly follows" request.
                    // IMPORTANT: If desktop, we allow pointer events only if we can ensure it doesn't close active hover.
                    // Simplified for reliability: On desktop, maybe just show it fixed relative to viewport or safely offset?
                    // Re-reading: "Desktop: ... Popup slightly follows cursor movement". 
                    // Interactive buttons inside a cursor-following element is very hard to click (it moves as you aim).
                    // Compromise: It follows cursor *within boundaries* or stabilizes when you stop?
                    // Or maybe "Parallax feel" applies to the content, but the card is static near the trigger?
                    // "Show a floating popup near the hovered card... slightly follows cursor".
                    // I will implement "follows cursor" for the *positioning*, but maybe standard CSS transform for the "parallax feel"?
                    // Let's try direct cursor following first.
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
                                    {project.category && (
                                        <span className="inline-block text-[10px] uppercase tracking-wider font-bold text-muted-foreground mb-1">
                                            {project.category}
                                        </span>
                                    )}
                                    <h3 className="text-lg font-bold text-foreground leading-tight truncate">
                                        {project.title}
                                    </h3>
                                </div>
                                {isMobile && (
                                    <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                                        <X size={18} />
                                    </button>
                                )}
                            </div>

                            {/* Body */}
                            <p className="text-xs text-muted-foreground line-clamp-3">
                                {project.description}
                            </p>

                            {/* Tech Stack */}
                            <div className="flex flex-wrap gap-1.5">
                                {project.tags.slice(0, 4).map((tag, i) => (
                                    <motion.span
                                        key={tag}
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/5 border border-white/5 text-muted-foreground"
                                    >
                                        {tag}
                                    </motion.span>
                                ))}
                                {project.tags.length > 4 && (
                                    <span className="text-[10px] px-2 py-0.5 text-muted-foreground">+{project.tags.length - 4}</span>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2 pt-2">
                                {project.demoLink && (
                                    <a
                                        href={project.demoLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 flex items-center justify-center gap-1.5 bg-primary/20 hover:bg-primary/30 text-primary text-xs font-semibold py-2 rounded-lg transition-colors"
                                        // If desktop and following cursor, clicking is hard.
                                        // Pointer events auto for links.
                                        style={{ pointerEvents: 'auto' }}
                                    >
                                        <ExternalLink size={14} />
                                        Live Demo
                                    </a>
                                )}
                                {project.ghLink && (
                                    <a
                                        href={project.ghLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 flex items-center justify-center gap-1.5 bg-white/5 hover:bg-white/10 text-foreground text-xs font-semibold py-2 rounded-lg transition-colors border border-white/10"
                                        style={{ pointerEvents: 'auto' }}
                                    >
                                        <Github size={14} />
                                        Code
                                    </a>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px] text-muted-foreground">
                                <div className="flex items-center gap-1.5">
                                    <Layers size={12} />
                                    <span>{project.status || 'Completed'}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Calendar size={12} />
                                    <span>{project.year || '2024'}</span>
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

export default ProjectHoverPopup;
