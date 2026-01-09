import { motion, AnimatePresence } from 'motion/react';
import { Monitor, Smartphone } from 'lucide-react';

interface DesktopModeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function DesktopModeModal({ isOpen, onClose }: DesktopModeModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-md"
                        onClick={onClose}
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-md glass-card neon-border-blue rounded-3xl p-8 text-center space-y-6 shadow-2xl overflow-hidden"
                    >
                        {/* Decorative Pulse */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-primary/20 rounded-full blur-[60px] -z-10 animate-pulse" />

                        <div className="w-20 h-20 mx-auto rounded-full glass-card flex items-center justify-center border border-white/10 relative">
                            <Monitor className="text-secondary w-10 h-10 absolute opacity-50 blur-sm" />
                            <Monitor className="text-cyan-400 w-10 h-10 relative z-10" />
                            <div className="absolute -bottom-2 -right-2 bg-yellow-500 rounded-full p-1.5 border-4 border-[#0f172a]">
                                <Smartphone className="w-4 h-4 text-black" />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h2 className="text-2xl font-bold">
                                <span className="gradient-text">✨ Best Viewed on Desktop</span>
                            </h2>
                            <p className="text-muted-foreground leading-relaxed text-sm">
                                This portfolio is carefully crafted for a desktop experience to showcase detailed visuals, animations, and interactions.
                            </p>
                            <div className="bg-white/5 rounded-xl p-4 text-xs text-start border border-white/5">
                                <p className="text-cyan-200 font-medium mb-1">We've enabled desktop view for you</p>
                                <p className="text-muted-foreground">You can pinch to zoom as needed. Thank you for exploring!</p>
                            </div>
                        </div>

                        <button
                            onClick={onClose}
                            className="w-full magnetic-btn glass-card neon-border-purple py-3.5 text-base font-semibold hover-glow-purple transition-all duration-300 hover:scale-[1.02]"
                        >
                            Continue Experience
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
