'use client';
import { motion } from 'motion/react';
import { ArrowRight } from '@phosphor-icons/react';
import SpecularButton from './react-bits/specular-button';
import DotGrid from './react-bits/dot-grid';
import { useTheme, useMobileEffectsDisabled } from '@/lib/preferences';
import { HeroArt } from './hero-art';
import { useSettings } from './site-shell';
export function Hero() {
  const { playing } = useSettings();
  const dark = useTheme() === 'dark';
  const mobileEffectsDisabled = useMobileEffectsDisabled();
  const startReading = () => {
    const target = document.getElementById('reading');
    if (!target) return;
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY,
      behavior: 'instant',
    });
    const heading = target.querySelector('h2');
    heading?.setAttribute('tabindex', '-1');
    heading?.focus({ preventScroll: true });
  };
  return (
    <section className="hero">
      <div className="hero-dot-background">
        <DotGrid
          dotSize={1.6}
          gap={16.4}
          baseColor={dark ? '#515147' : '#c8c5b9'}
          activeColor={dark ? '#df9275' : '#b65a40'}
          proximity={140}
          speedTrigger={220}
          shockRadius={180}
          shockStrength={1.5}
          disabled
        />
      </div>
      <motion.div
        className="hero-copy"
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="intro">
          <span className="intro-line" />
          一个开发者的数字花园
        </div>
        <h1 className="hero-title">
          <span>为知识留白</span>
          <span>让思考成形</span>
        </h1>
        <SpecularButton
          staticMode={mobileEffectsDisabled}
          size="md"
          radius={10}
          tint={dark ? '#31312a' : '#303029'}
          tintOpacity={0.95}
          textColor="#f5f4ee"
          lineColor={dark ? '#df9275' : '#dfab8a'}
          baseColor="#b65a40"
          intensity={2}
          followMouse={playing}
          autoAnimate={playing}
          onClick={startReading}
          className="reading-specular"
        >
          开始阅读 <ArrowRight size={19} />
        </SpecularButton>
      </motion.div>
      <HeroArt />
      <div className="hero-bottom">
        <div className="hero-quote">
          <span className="quote-cn">我唯一知道的就是我一无所知。</span>
        </div>
        <span lang="el">ἓν οἶδα ὅτι οὐδὲν οἶδα</span>
      </div>
    </section>
  );
}
