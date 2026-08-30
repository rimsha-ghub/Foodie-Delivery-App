import { motion } from 'framer-motion';
import { ArrowUpRight, MapPin, Sparkles, Utensils } from 'lucide-react';
import { SceneFrame } from './SceneFrame';

const salad = 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=900';
const biryani = 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1000';
const breakfast = 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=700';

export function IntroScene() {
  return (
    <SceneFrame background="var(--cream)" scene="01" label="Foodie introduction">
      <div className="scene-pad relative h-full">
        <motion.div initial={{ y: -18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: .6, delay: .12 }} className="flex items-center justify-between">
          <div className="flex items-center gap-2"><span className="grid h-[clamp(24px,3.2vw,48px)] w-[clamp(24px,3.2vw,48px)] rotate-[-7deg] place-items-center rounded-[30%] bg-[var(--coral)] text-[var(--cream)] shadow-[4px_4px_0_var(--yellow)]"><Utensils size="clamp(13px,1.5vw,23px)" /></span><span className="display text-[clamp(18px,2.6vw,42px)] font-bold tracking-[-.06em]">foodie<span className="text-[var(--coral)]">.</span></span></div>
          <div className="eyebrow flex items-center gap-2 text-[var(--ink)]/65"><MapPin size="clamp(10px,1vw,15px)" /> RS Puram, Coimbatore</div>
        </motion.div>

        <div className="relative mt-[10%] grid grid-cols-[.93fr_1.07fr] items-center gap-[4%]">
          <div className="relative z-10">
            <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .25, duration: .55 }} className="eyebrow mb-[3%] flex items-center gap-2 text-[var(--coral)]"><span className="tiny-dot" /> LOCAL FLAVOURS / BIG FEELINGS</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .34, duration: .75, ease: [.2, .8, .25, 1] }} className="display huge max-w-[650px] text-[var(--ink)]">Good Food.<br /><span className="text-[var(--coral)]">Great Mood.</span><br /><em className="font-normal">Delivered.</em></motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .7, duration: .5 }} className="fine mt-[6%] max-w-[330px] text-[var(--ink)]/65">A better way to meet the best meals in Coimbatore — warm, quick and exactly when you need them.</motion.p>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .88, duration: .45 }} className="mt-[7%] inline-flex items-center gap-3 rounded-full bg-[var(--ink)] px-[4%] py-[2.2%] text-[var(--cream)]"><span className="eyebrow tracking-[.1em]">Find your next favourite</span><ArrowUpRight size="clamp(12px,1.2vw,19px)" className="text-[var(--yellow)]" /></motion.div>
          </div>

          <div className="relative h-[31vw] max-h-[510px] min-h-[250px]">
            <motion.div initial={{ scale: .82, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1, delay: .18, ease: [.2, .8, .25, 1] }} className="absolute right-[4%] top-[3%] h-[81%] w-[76%] rounded-[49%_51%_40%_60%/43%_42%_58%_57%] bg-[var(--yellow)]" />
            <motion.div animate={{ rotate: [-4, -1, -4], y: [0, -7, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} className="absolute right-[2%] top-[3%] z-10 h-[41%] w-[41%] overflow-hidden rounded-[43%_57%_51%_49%/55%_40%_60%_45%] border-[clamp(5px,1vw,12px)] border-[var(--cream)] shadow-[0_18px_40px_rgba(20,60,61,.2)]"><img src={salad} alt="colourful salad" className="h-full w-full object-cover" /></motion.div>
            <motion.div animate={{ rotate: [5, 8, 5], y: [0, 9, 0] }} transition={{ duration: 5.4, repeat: Infinity, ease: 'easeInOut' }} className="absolute bottom-[6%] left-[5%] z-10 h-[70%] w-[67%] overflow-hidden rounded-[53%_47%_42%_58%/46%_54%_46%_54%] border-[clamp(7px,1.1vw,14px)] border-[var(--cream)] shadow-[0_24px_50px_rgba(20,60,61,.22)]"><img src={biryani} alt="biryani in a serving bowl" className="h-full w-full object-cover" /></motion.div>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.05, type: 'spring', stiffness: 260, damping: 18 }} className="absolute bottom-[8%] right-[0%] z-20 flex items-center gap-2 rounded-[15px] border border-[var(--ink)]/15 bg-[var(--cream)] px-[3%] py-[2.3%] shadow-[8px_9px_0_var(--coral)]"><Sparkles size="clamp(13px,1.4vw,22px)" className="text-[var(--coral)]" /><span className="fine font-bold leading-none">Made for<br />sharing</span></motion.div>
            <div className="absolute bottom-[1%] left-[1%] h-[15%] w-[25%] overflow-hidden rounded-[30%] border-[5px] border-[var(--cream)] opacity-80"><img src={breakfast} alt="south Indian breakfast" className="h-full w-full object-cover" /></div>
          </div>
        </div>
      </div>
    </SceneFrame>
  );
}
