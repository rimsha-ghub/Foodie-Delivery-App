import { motion } from 'framer-motion';
import { ArrowDownRight, Bike, Coffee, Leaf, MapPin, Soup, Utensils } from 'lucide-react';
import { SceneFrame } from './SceneFrame';

const kongu = 'https://images.pexels.com/photos/7625056/pexels-photo-7625056.jpeg?auto=compress&cs=tinysrgb&w=1000';
const coffee = 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=700';
const pizza = 'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=700';

export function CityScene() {
  return (
    <SceneFrame background="var(--ink)" tint="var(--cream)" scene="02" label="Coimbatore food neighbourhoods">
      <div className="scene-pad relative h-full">
        <div className="absolute left-[6.2%] top-[18%] h-[35%] w-[35%] rounded-full bg-[var(--coral)]/80 blur-[1px]" />
        <div className="relative grid h-full grid-cols-[.8fr_1.2fr] items-center gap-[6%]">
          <div>
            <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="eyebrow mb-[5%] text-[var(--yellow)]">02 / A CITY WITH A CRAVING</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .12, duration: .7 }} className="display title max-w-[560px]">Every corner<br /><em className="font-normal text-[var(--yellow)]">has a flavour.</em></motion.h2>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .3 }} className="fine mt-[7%] max-w-[330px] text-[var(--cream)]/65">From early filter coffee to late-night Kongu comfort, the city is always serving.</motion.p>
            <div className="mt-[9%] flex items-center gap-3 text-[var(--cream)]/70"><span className="grid h-[clamp(22px,3vw,42px)] w-[clamp(22px,3vw,42px)] place-items-center rounded-full border border-[var(--cream)]/30"><MapPin size="clamp(11px,1.2vw,19px)" /></span><span className="eyebrow tracking-[.1em]">6 neighbourhoods<br /><span className="text-[var(--yellow)]">one hungry city</span></span></div>
          </div>
          <div className="relative h-[34vw] max-h-[560px] min-h-[270px]">
            <motion.div initial={{ opacity: 0, x: 35, rotate: 3 }} animate={{ opacity: 1, x: 0, rotate: 3 }} transition={{ delay: .2, duration: .8 }} className="absolute right-[2%] top-[4%] h-[72%] w-[67%] overflow-hidden rounded-[45%_55%_48%_52%/51%_40%_60%_49%] border-[clamp(6px,1vw,12px)] border-[var(--cream)] shadow-[10px_12px_0_var(--coral)]"><img src={kongu} alt="Kongu style biryani" className="h-full w-full object-cover" /></motion.div>
            <motion.div initial={{ opacity: 0, y: 35, rotate: -7 }} animate={{ opacity: 1, y: 0, rotate: -7 }} transition={{ delay: .4, duration: .8 }} className="absolute bottom-[3%] left-[1%] h-[48%] w-[45%] overflow-hidden rounded-[44%_56%_52%_48%/52%_44%_56%_48%] border-[clamp(5px,.8vw,10px)] border-[var(--ink)] shadow-[8px_9px_0_var(--yellow)]"><img src={coffee} alt="fresh filter coffee" className="h-full w-full object-cover" /></motion.div>
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }} className="absolute bottom-[5%] right-[2%] flex items-center gap-2 rounded-[15px] bg-[var(--cream)] px-[3%] py-[2.5%] text-[var(--ink)]"><Bike size="clamp(14px,1.6vw,24px)" className="text-[var(--coral)]" /><span className="fine font-bold">Hot, fresh,<br />on its way.</span></motion.div>
            <div className="absolute left-[28%] top-[0%] grid h-[clamp(35px,5vw,73px)] w-[clamp(35px,5vw,73px)] place-items-center rounded-full bg-[var(--yellow)] text-[var(--ink)] rotate-[-12deg]"><ArrowDownRight size="clamp(17px,2vw,29px)" /></div>
            <div className="absolute right-[13%] bottom-[25%] flex gap-2 rounded-full border border-[var(--cream)]/30 bg-[var(--ink)]/70 px-3 py-2 text-[var(--cream)] backdrop-blur-sm"><Soup size="clamp(12px,1.2vw,18px)" /><span className="eyebrow tracking-[.08em]">Kongu · Brunch · More</span></div>
          </div>
        </div>
        <div className="absolute bottom-[11%] left-[6.1%] flex gap-2 opacity-60"><span className="flex items-center gap-1.5 text-[clamp(7px,.75vw,11px)]"><Utensils size="clamp(9px,1vw,14px)" /> LOCAL</span><span className="flex items-center gap-1.5 text-[clamp(7px,.75vw,11px)]"><Coffee size="clamp(9px,1vw,14px)" /> FRESH</span><span className="flex items-center gap-1.5 text-[clamp(7px,.75vw,11px)]"><Leaf size="clamp(9px,1vw,14px)" /> LOVINGLY</span></div>
        <img src={pizza} alt="" className="absolute -bottom-[15%] -right-[3%] h-[30%] w-[15%] rotate-[14deg] rounded-full object-cover opacity-35" />
      </div>
    </SceneFrame>
  );
}
