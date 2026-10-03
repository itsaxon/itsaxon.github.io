'use client';

// React Bits Magnet, TS-TW variant. Adapted to motion values to avoid pointer-driven React renders.
// Upstream: https://github.com/DavidHDev/react-bits/blob/main/src/ts-tailwind/Animations/Magnet/Magnet.tsx
// License: THIRD_PARTY_NOTICES.md
import { useRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

interface MagnetProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padding?: number;
  disabled?: boolean;
  magnetStrength?: number;
  wrapperClassName?: string;
  innerClassName?: string;
}
export default function Magnet({
  children,
  padding = 24,
  disabled = false,
  magnetStrength = 5,
  wrapperClassName = '',
  innerClassName = '',
  ...props
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0),
    y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });
  return (
    <div
      ref={ref}
      className={`relative inline-block ${wrapperClassName}`}
      {...props}
      onPointerMove={(event) => {
        if (disabled || event.pointerType !== 'mouse' || !ref.current) return;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const dx = event.clientX - left - width / 2,
          dy = event.clientY - top - height / 2;
        if (Math.abs(dx) < width / 2 + padding && Math.abs(dy) < height / 2 + padding) {
          x.set(dx / magnetStrength);
          y.set(dy / magnetStrength);
        }
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <motion.div
        className={`will-change-transform ${innerClassName}`}
        style={disabled ? undefined : { x: springX, y: springY }}
      >
        {children}
      </motion.div>
    </div>
  );
}
