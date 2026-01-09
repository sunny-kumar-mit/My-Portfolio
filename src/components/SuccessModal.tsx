
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Sparkles } from 'lucide-react';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
    // Auto-close after 5 seconds
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                onClose();
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [isOpen, onClose]);

    // Handle Escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
                    onClick={onClose} // Close on backdrop click
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                        className="w-full max-w-lg p-8 text-center relative rounded-3xl border border-cyan-500/50 bg-black/80 shadow-[0_0_50px_rgba(6,182,212,0.25)] backdrop-blur-xl"
                        onClick={(e) => e.stopPropagation()}
                        role="dialog"
                        aria-modal="true"
                    >
                        {/* Decorative Background Elements */}
                        <div className="absolute -top-20 -left-20 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

                        <div className="relative z-10 flex flex-col items-center gap-6">
                            {/* Icon */}
                            <div className="w-20 h-20 rounded-full bg-cyan-500/10 flex items-center justify-center mb-2 shadow-[0_0_20px_rgba(6,182,212,0.2)] ring-1 ring-cyan-500/30">
                                <CheckCircle2 className="w-10 h-10 text-cyan-400" strokeWidth={2.5} />
                            </div>

                            {/* Title */}
                            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
                                <Sparkles className="w-6 h-6 text-yellow-400 fill-yellow-400/20" />
                                Message Sent Successfully!
                            </h2>

                            {/* Message */}
                            <div className="space-y-4 text-gray-300 leading-relaxed">
                                <p>
                                    Thank you for reaching out! <br />
                                    Your message just landed safely in my inbox, and I truly appreciate you taking the time to connect.
                                </p>
                                <p>
                                    I’ll review your message and get back to you as soon as possible.
                                    Until then, feel free to explore more of my work — exciting things are always in progress 🚀
                                </p>
                            </div>

                            {/* Footer text */}
                            <p className="text-cyan-400 font-medium italic">
                                Have a great day! 😊
                            </p>

                            {/* Close Button */}
                            <Button
                                onClick={onClose}
                                className="mt-4 px-10 py-6 text-lg rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-all duration-300"
                            >
                                Got it
                            </Button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
