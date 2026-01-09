
import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface TypewriterTextProps {
    text: string;
    speed?: number;
    className?: string;
    start?: boolean;
    delay?: number;
    showCursor?: boolean;
}

export default function TypewriterText({
    text,
    speed = 30,
    className = "",
    start = true,
    delay = 0,
    showCursor = true
}: TypewriterTextProps) {
    const [displayedText, setDisplayedText] = useState("");
    const [isStarted, setIsStarted] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (start) {
            const timeout = setTimeout(() => {
                setIsStarted(true);
            }, delay);
            return () => clearTimeout(timeout);
        } else {
            setIsStarted(false);
            setDisplayedText("");
            setCurrentIndex(0);
        }
    }, [start, delay]);

    useEffect(() => {
        if (!isStarted) return;

        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, speed);

            return () => clearTimeout(timeout);
        }
    }, [currentIndex, isStarted, text, speed]);

    return (
        <span className={className}>
            {displayedText}
            {showCursor && (
                <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    className="inline-block w-[3px] h-[1em] bg-cyan-400 ml-1 align-middle"
                />
            )}
        </span>
    );
}
