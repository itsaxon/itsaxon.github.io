'use client';

// Adapted from React Bits Animated List (TS-TW).
import { useRef, type ReactNode } from 'react';
import { motion, useInView } from 'motion/react';

export default function AnimatedListItem({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.2, once: true });

  return (
    <motion.div
      ref={ref}
      className="topic-spotlight animated-topic"
      initial={{ scale: 0.94, opacity: 0, y: 16 }}
      animate={inView ? { scale: 1, opacity: 1, y: 0 } : { scale: 0.94, opacity: 0, y: 16 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.015 }}
    >
      {children}
    </motion.div>
  );
}
