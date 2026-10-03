'use client';
import DitherVeil from './react-bits/dither-veil';
import { useSettings } from './site-shell';
import { useTheme, useMobileEffectsDisabled } from '@/lib/preferences';
export function HeroArt() {
  const { playing } = useSettings();
  const dark = useTheme() === 'dark';
  const mobileEffectsDisabled = useMobileEffectsDisabled();
  return (
    <div className="hero-art magnetic-art veil-art" aria-hidden="true">
      {mobileEffectsDisabled ? (
        <div className="veil-static" />
      ) : (
        <DitherVeil
          src="/veil-form.svg"
          pattern="bayer"
          pixelSize={3}
          inkColor={dark ? '#df9275' : '#7d4937'}
          paperColor={dark ? '#252520' : '#f5f4ee'}
          rimColor="#b65a40"
          revealRadius={130}
          softness={0.65}
          linger={0.8}
          wander={playing}
          clickBurst={playing}
          className="dither-veil"
        />
      )}
    </div>
  );
}
