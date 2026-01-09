import { motion } from 'motion/react';
import { ExternalLink, Award } from 'lucide-react';
import type { CertificationData } from './CertificationModal';

interface CertificationCardProps {
    certification: CertificationData;
    onClick: () => void;
    index: number;
    className?: string;
    disableAnimation?: boolean;
    onMouseEnter?: (e: React.MouseEvent) => void;
    onMouseLeave?: () => void;
    onMouseMove?: (e: React.MouseEvent) => void;
}

export default function CertificationCard({
    certification,
    onClick,
    index,
    className = "",
    disableAnimation = false,
    onMouseEnter,
    onMouseLeave,
    onMouseMove
}: CertificationCardProps) {
    const getGlowClass = (color: string) => {
        switch (color) {
            case 'blue': return 'neon-border-blue hover-glow-blue';
            case 'purple': return 'neon-border-purple hover-glow-purple';
            case 'cyan': return 'neon-border-cyan hover-glow-blue'; // Reusing blue glow for cyan or define custom if needed
            default: return 'neon-border-blue hover-glow-blue';
        }
    };

    const animationProps = disableAnimation ? {} : {
        initial: { opacity: 0, y: 50, scale: 0.9 },
        whileInView: { opacity: 1, y: 0, scale: 1 },
        viewport: { once: true, margin: "-50px" },
        transition: { duration: 0.5, delay: index * 0.1 }
    };

    return (
        <motion.div
            layout
            {...animationProps}
            whileHover={{ y: -10, scale: 1.02 }}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onMouseMove={onMouseMove}
            className={`
        relative flex-shrink-0 w-[300px] md:w-[350px] aspect-[4/3] rounded-3xl 
        glass-card ${getGlowClass(certification.color)} 
        cursor-pointer group overflow-hidden ${className}
      `}
        >
            {/* Background Image / Certificate Preview */}
            <div className="absolute inset-0 z-0">
                <img
                    src={certification.image}
                    alt={certification.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 z-10 p-6 flex flex-col justify-end">

                {/* Top Badge (Issuer) */}
                <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-black/80 px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/10 backdrop-blur-md shadow-lg">
                        <Award size={14} className="text-primary" />
                        <span className="text-xs font-bold uppercase tracking-wider text-white">{certification.issuer}</span>
                    </div>
                </div>

                {/* Text Content */}
                <div className="space-y-2 transform transition-transform duration-300 group-hover:-translate-y-2">
                    <h3 className="text-xl font-bold text-white leading-tight drop-shadow-md">
                        {certification.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{certification.date}</p>
                </div>

                {/* View Details Hint (Fades in on hover) */}
                <div className="absolute bottom-6 right-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <div className="w-10 h-10 rounded-full glass-card flex items-center justify-center neon-border-blue text-primary">
                        <ExternalLink size={18} />
                    </div>
                </div>
            </div>

            {/* Decorative Glow */}
            <div className={`absolute -bottom-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-${certification.color}-500/20`} />
        </motion.div>
    );
}
