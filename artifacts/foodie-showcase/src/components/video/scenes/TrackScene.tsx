import { motion } from 'framer-motion';
import { Bike, Check, Clock3, MapPin, PackageCheck, Sparkles } from 'lucide-react';
import { SceneFrame } from './SceneFrame';

const biryani = 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=600';

export function TrackScene() {
  return (
    <SceneFrame background="var(--mint)" scene="04" label="Foodie delivery tracking">
      <div className="scene-pad h-full">
        <div className="mb-[3%] flex items-start justify-between"><div><motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="eyebrow mb-[3%] text-[var(--coral)]">04 / GOOD THINGS ARE MOVING</motion.p><motion.h2 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .1 }} className="display title">From our kitchen<br /><em className="font-normal">to your mood.</em></motion.h2></div><div className="eyebrow flex items-center gap-2 rounded-full border border-[var(--ink)]/20 px-3 py-2 text-[var(--ink)]/65"><Clock3 size="clamp(10px,1vw,15px)" /> 28 min away</div></div>
        <div className="grid grid-cols-[.92fr_1.08fr] items-end gap-[7%]">
          <div className="relative mx-auto h-[29vw] max-h-[470px] min-h-[230px] w-[min(23vw,360px)]">
            <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: .25, duration: .65 }} className="absolute inset-0 overflow-hidden rounded-[clamp(24px,3vw,43px)] border-[clamp(6px,1vw,13px)] border-[var(--ink)] bg-[var(--cream)] shadow-[12px_14px_0_var(--coral)]">
              <div className="flex h-[10%] items-center justify-between bg-[var(--ink)] px-[7%] text-[var(--cream)]"><span className="mono text-[clamp(7px,.8vw,12px)]">9:41</span><span className="flex gap-1"><span className="tiny-dot text-[var(--yellow)]" /><span className="tiny-dot text-[var(--cream)]" /></span></div>
              <div className="px-[9%] py-[9%]"><div className="eyebrow text-[var(--coral)]">ORDER #FDE204</div><div className="mt-[5%] flex items-center gap-3"><img src={biryani} alt="Kongu Chicken Biryani" className="h-[clamp(35px,5vw,72px)] w-[clamp(35px,5vw,72px)] rounded-[25%] object-cover" /><div><h3 className="display text-[clamp(13px,1.5vw,22px)] font-bold leading-none">Kongu Chicken<br />Biryani</h3><p className="fine mt-1 text-[var(--ink)]/55">Junior Kuppanna · ₹280</p></div></div><div className="relative my-[10%]"><div className="absolute left-[6px] top-3 bottom-3 w-px bg-[var(--coral)]/25" /><div className="relative mb-[11%] flex items-center gap-3"><span className="grid h-3 w-3 place-items-center rounded-full bg-[var(--coral)] text-[var(--cream)]"><Check size={8} /></span><span className="fine font-bold">Order confirmed</span></div><div className="relative mb-[11%] flex items-center gap-3"><span className="grid h-3 w-3 place-items-center rounded-full bg-[var(--coral)] text-[var(--cream)]"><Check size={8} /></span><span className="fine font-bold">Being prepared</span></div><div className="relative flex items-center gap-3"><span className="pulse-ring grid h-3 w-3 place-items-center rounded-full border-2 border-[var(--coral)] bg-[var(--cream)]" /><span className="fine font-bold text-[var(--coral)]">On the way</span></div></div><div className="shimmer relative overflow-hidden rounded-[10px] bg-[var(--yellow)] px-[5%] py-[4%] text-[var(--ink)]"><span className="fine font-bold">Almost at your door.</span></div></div>
            </motion.div>
          </div>
          <div className="relative h-[28vw] max-h-[450px] min-h-[215px] overflow-hidden rounded-[clamp(20px,3vw,42px)] bg-[var(--ink)] p-[7%] text-[var(--cream)]">
            <div className="absolute inset-0 opacity-30"><svg className="h-full w-full" viewBox="0 0 600 360" preserveAspectRatio="none"><path d="M-20 300C50 260 70 325 150 270S260 180 330 235s65 75 130 18 75-100 170-80" fill="none" stroke="var(--mint)" strokeWidth="2" className="dash-line" /><path d="M0 90c72 30 84-23 155 16s105 5 155 45 98 15 150 41 78-18 170 18" fill="none" stroke="var(--yellow)" strokeWidth="1" className="dash-line" /></svg></div>
            <div className="relative flex h-full flex-col justify-between"><div className="flex items-center justify-between"><span className="eyebrow text-[var(--yellow)]">LIVE DELIVERY VIEW</span><span className="flex items-center gap-2 text-[var(--cream)]/55"><span className="tiny-dot animate-pulse text-[var(--coral)]" /> updating</span></div><div className="relative flex items-center justify-center"><div className="pulse-ring absolute h-[clamp(75px,10vw,155px)] w-[clamp(75px,10vw,155px)] rounded-full border border-[var(--yellow)]/50" /><div className="grid h-[clamp(42px,5.5vw,85px)] w-[clamp(42px,5.5vw,85px)] place-items-center rounded-full bg-[var(--coral)] text-[var(--cream)] shadow-[0_0_0_8px_rgba(239,101,77,.18)]"><Bike size="clamp(21px,2.7vw,41px)" /></div></div><div className="flex items-end justify-between"><div className="flex items-center gap-2"><MapPin size="clamp(13px,1.5vw,23px)" className="text-[var(--coral)]" /><div><div className="fine font-bold">Heading to RS Puram</div><div className="fine text-[var(--cream)]/55">Your rider is on the way</div></div></div><Sparkles size="clamp(18px,2.2vw,32px)" className="text-[var(--yellow)]" /></div></div>
          </div>
        </div>
        <div className="absolute bottom-[11%] left-[6.1%] flex items-center gap-2 text-[var(--ink)]/60"><PackageCheck size="clamp(13px,1.4vw,21px)" /><span className="eyebrow tracking-[.1em]">Packed with care · delivered with a smile</span></div>
      </div>
    </SceneFrame>
  );
}
