'use client';

import { createContext, useContext } from 'react';
import type { ReactNode, ButtonHTMLAttributes } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import Magnet from './react-bits/magnet';

export const MotionPreference = createContext<boolean | null>(null);
export function useAnimationReduced() {
  const choice = useContext(MotionPreference);
  const system = useReducedMotion();
  return choice === null ? Boolean(system) : !choice;
}
export function Magnetic({
  children,
  onClick,
  className = '',
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  const reduce = useAnimationReduced();
  return (
    <Magnet disabled={reduce} wrapperClassName="magnet-button" magnetStrength={6}>
      <motion.button
        type="button"
        className={className}
        onClick={onClick}
        whileTap={reduce ? undefined : { scale: 0.96 }}
      >
        {children}
      </motion.button>
    </Magnet>
  );
}
export function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const reduce = useAnimationReduced();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
