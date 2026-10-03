'use client';

import { createContext, useContext } from 'react';
import type { ReactNode, ButtonHTMLAttributes } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import Magnet from './react-bits/magnet';
import AnimatedContent from './react-bits/animated-content';
import AnimatedListItem from './react-bits/animated-list';
import ClickSpark from './react-bits/click-spark';
import { useMobileEffectsDisabled, useTheme } from '@/lib/preferences';

function useQuietEffects() {
  const reduce = useAnimationReduced();
  const mobile = useMobileEffectsDisabled();
  return reduce || mobile;
}
export function ListEntrance({ children, index = 0 }: { children: ReactNode; index?: number }) {
  const disabled = useQuietEffects();
  return disabled ? (
    <div className="list-entrance">{children}</div>
  ) : (
    <AnimatedContent
      className="list-entrance"
      distance={28}
      duration={0.65}
      delay={0.15 + Math.min(index, 4) * 0.12}
      animateOpacity
    >
      {children}
    </AnimatedContent>
  );
}
export function TopicSpotlight({ children }: { children: ReactNode }) {
  const disabled = useQuietEffects();
  return disabled ? (
    <div className="topic-spotlight">{children}</div>
  ) : (
    <AnimatedListItem>
      {children}
    </AnimatedListItem>
  );
}
export function SparkControls({ children }: { children: ReactNode }) {
  const disabled = useQuietEffects();
  const dark = useTheme() === 'dark';
  return disabled ? (
    <div className="header-tools">{children}</div>
  ) : (
    <ClickSpark
      className="header-tools"
      sparkColor={dark ? '#df9275' : '#b65a40'}
      sparkCount={6}
      sparkSize={8}
      sparkRadius={22}
      duration={450}
    >
      {children}
    </ClickSpark>
  );
}

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
