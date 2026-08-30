import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

export function SceneFrame({ children, background, tint = 'var(--ink)', scene, label }: { children: ReactNode; background: string; tint?: string; scene: string; label: string }) {
  return (
    <motion.section
      className="scene"
      style={{ background, color: tint }}
      initial={{ opacity: 0, scale: 1.025 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: .975 }}
      transition={{ duration: .72, ease: [0.22, .8, .25, 1] }}
      aria-label={label}
    >
      {children}
      <div className="safe-line" />
      <div className="absolute bottom-[4.2%] left-[6.1%] right-[6.1%] z-20 flex items-center justify-between">
        <span className="mono text-[clamp(7px,.7vw,11px)] font-bold tracking-[.17em] opacity-60">FOODIE / COIMBATORE</span>
        <span className="mono text-[clamp(7px,.7vw,11px)] font-bold tracking-[.17em] opacity-60">{scene} / 05</span>
      </div>
    </motion.section>
  );
}
