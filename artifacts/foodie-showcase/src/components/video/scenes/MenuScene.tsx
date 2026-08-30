import { motion } from 'framer-motion';
import { Check, Heart, Plus, Star } from 'lucide-react';
import { SceneFrame } from './SceneFrame';

const dosa = 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=900';
const burger = 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=900';
const sandwich = 'https://images.pexels.com/photos/1603901/pexels-photo-1603901.jpeg?auto=compress&cs=tinysrgb&w=900';

function DishCard({ image, title, place, price, delay }: { image: string; title: string; place: string; price: string; delay: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: .55 }} className="paper-card relative overflow-hidden rounded-[clamp(13px,1.5vw,23px)] shadow-[7px_8px_0_var(--ink)]">
      <div className="relative h-[clamp(105px,14vw,220px)] overflow-hidden"><img src={image} alt={title} className="h-full w-full object-cover" /><span className="absolute right-[4%] top-[6%] grid h-[clamp(20px,2.6vw,38px)] w-[clamp(20px,2.6vw,38px)] place-items-center rounded-full bg-[var(--cream)]/90 text-[var(--coral)]"><Heart size="clamp(10px,1.2vw,18px)" /></span></div>
      <div className="p-[7%]"><div className="flex items-start justify-between gap-2"><div><h3 className="display text-[clamp(13px,1.65vw,25px)] font-bold leading-none">{title}</h3><p className="fine mt-1 text-[var(--ink)]/55">{place}</p></div><span className="mono whitespace-nowrap text-[clamp(10px,1.05vw,16px)] font-bold text-[var(--coral)]">{price}</span></div><div className="mt-[6%] flex items-center justify-between border-t border-[var(--ink)]/10 pt-[5%]"><span className="flex items-center gap-1 text-[clamp(8px,.9vw,13px)] font-bold"><Star size="clamp(10px,1vw,15px)" fill="var(--yellow)" className="text-[var(--yellow)]" /> 4.8</span><span className="grid h-[clamp(20px,2.5vw,37px)] w-[clamp(20px,2.5vw,37px)] place-items-center rounded-[28%] bg-[var(--coral)] text-[var(--cream)]"><Plus size="clamp(11px,1.1vw,17px)" /></span></div></div>
    </motion.div>
  );
}

export function MenuScene() {
  return (
    <SceneFrame background="var(--coral)" tint="var(--cream)" scene="03" label="Foodie menu discovery">
      <div className="scene-pad h-full">
        <div className="flex items-start justify-between">
          <div><motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="eyebrow mb-[3%] text-[var(--yellow)]">03 / PICK YOUR MOOD</motion.p><motion.h2 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .1, duration: .6 }} className="display title">The good stuff,<br /><em className="font-normal">right this way.</em></motion.h2></div>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: .35, type: 'spring' }} className="hidden rotate-[8deg] rounded-[12px] border border-[var(--cream)]/35 bg-[var(--cream)] px-4 py-3 text-[var(--ink)] shadow-[6px_7px_0_var(--yellow)] sm:block"><div className="eyebrow text-[var(--coral)]">first order</div><div className="display text-3xl font-bold">30% off</div><div className="mono text-[9px] font-bold tracking-[.12em]">HELLOFOOD</div></motion.div>
        </div>
        <div className="mt-[6%] grid grid-cols-3 gap-[2.5%]">
          <DishCard image={dosa} title="Ghee Roast Dosa" place="Sree Annapoorna" price="₹110" delay={.28} />
          <DishCard image={burger} title="The Biggy Smash" place="Biggy Burger" price="₹299" delay={.4} />
          <DishCard image={sandwich} title="Club Sandwich" place="Bird on Tree" price="₹245" delay={.52} />
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .8 }} className="mt-[4.5%] flex items-center justify-between border-t border-[var(--cream)]/25 pt-[2.5%]"><div className="flex items-center gap-2"><span className="grid h-[clamp(23px,3vw,42px)] w-[clamp(23px,3vw,42px)] place-items-center rounded-full bg-[var(--yellow)] text-[var(--ink)]"><Check size="clamp(12px,1.4vw,20px)" /></span><span className="fine font-semibold">Handpicked for your hungry side</span></div><span className="eyebrow hidden text-[var(--cream)]/65 sm:block">Swipe less. Savour more.</span></motion.div>
      </div>
    </SceneFrame>
  );
}
