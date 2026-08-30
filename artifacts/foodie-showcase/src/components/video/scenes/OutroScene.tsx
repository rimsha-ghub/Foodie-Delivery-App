import { motion } from 'framer-motion';
import { ArrowUpRight, Heart, MapPin, Sparkles, Utensils } from 'lucide-react';
import { SceneFrame } from './SceneFrame';

const friends = 'https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=1000';
const dessert = 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=700';

export function OutroScene() {
  return (
    <SceneFrame background="var(--yellow)" scene="05" label="Foodie final message">
      <div className="scene-pad relative h-full">
        <motion.div initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55 }} className="flex items-center justify-between text-[var(--ink)]"><div className="flex items-center gap-2"><span className="grid h-[clamp(24px,3.2vw,48px)] w-[clamp(24px,3.2vw,48px)] rotate-[-7deg] place-items-center rounded-[30%] bg-[var(--coral)] text-[var(--cream)]"><Utensils size="clamp(13px,1.5vw,23px)" /></span><span className="display text-[clamp(18px,2.6vw,42px)] font-bold tracking-[-.06em]">foodie<span className="text-[var(--coral)]">.</span></span></div><div className="eyebrow flex items-center gap-2"><MapPin size="clamp(10px,1vw,15px)" /> MADE FOR COIMBATORE</div></motion.div>
        <div className="grid h-[78%] grid-cols-[1.08fr_.92fr] items-center gap-[5%]">
          <div className="relative z-10">
            <motion.div initial={{ scale: .6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: .15, type: 'spring', stiffness: 220, damping: 20 }} className="mb-[5%] flex w-fit items-center gap-2 rounded-full bg-[var(--ink)] px-3 py-2 text-[var(--cream)]"><Sparkles size="clamp(12px,1.3vw,20px)" className="text-[var(--yellow)]" /><span className="eyebrow tracking-[.1em]">THE TABLE IS SET</span></motion.div>
            <motion.h2 initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .25, duration: .75 }} className="display huge max-w-[700px] text-[var(--ink)]">Good food.<br /><em className="font-normal">Great company.</em></motion.h2>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .55 }} className="fine mt-[5%] max-w-[340px] text-[var(--ink)]/65">The next story starts with a craving.</motion.p>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .75 }} className="mt-[7%] flex items-center gap-3"><div className="rounded-full bg-[var(--coral)] px-[5%] py-[3%] text-[var(--cream)] shadow-[6px_7px_0_var(--ink)]"><span className="eyebrow tracking-[.1em]">Order something wonderful</span><ArrowUpRight size="clamp(13px,1.4vw,22px)" className="ml-2 inline" /></div></motion.div>
          </div>
          <div className="relative h-[31vw] max-h-[500px] min-h-[250px]">
            <motion.div initial={{ opacity: 0, rotate: 13, scale: .8 }} animate={{ opacity: 1, rotate: 7, scale: 1 }} transition={{ delay: .25, duration: .8 }} className="absolute right-[1%] top-[1%] h-[85%] w-[76%] overflow-hidden rounded-[47%_53%_54%_46%/40%_55%_45%_60%] border-[clamp(7px,1.1vw,14px)] border-[var(--cream)] shadow-[11px_13px_0_var(--coral)]"><img src={friends} alt="friends sharing a meal" className="h-full w-full object-cover" /></motion.div>
            <motion.div animate={{ y: [0, -10, 0], rotate: [-9, -5, -9] }} transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut' }} className="absolute bottom-[0%] left-[0%] z-10 h-[42%] w-[42%] overflow-hidden rounded-full border-[clamp(5px,.9vw,10px)] border-[var(--cream)] shadow-[7px_8px_0_var(--ink)]"><img src={dessert} alt="dessert ready to share" className="h-full w-full object-cover" /></motion.div>
            <div className="absolute right-[0%] bottom-[6%] flex items-center gap-2 rounded-[15px] border border-[var(--ink)]/20 bg-[var(--cream)] px-3 py-2 text-[var(--ink)] shadow-[5px_6px_0_var(--ink)]"><Heart size="clamp(14px,1.5vw,22px)" fill="var(--coral)" className="text-[var(--coral)]" /><span className="fine font-bold leading-none">Send this<br />to a foodie</span></div>
          </div>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="absolute bottom-[10%] left-[6.1%] text-[var(--ink)]/65"><span className="eyebrow tracking-[.12em]">foodie.in · discover your happy place</span></motion.div>
      </div>
    </SceneFrame>
  );
}
