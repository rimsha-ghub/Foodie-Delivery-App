import { AnimatePresence } from 'framer-motion';
import { useVideoPlayer } from '@/lib/video';
import { CityScene } from './scenes/CityScene';
import { IntroScene } from './scenes/IntroScene';
import { MenuScene } from './scenes/MenuScene';
import { OutroScene } from './scenes/OutroScene';
import { TrackScene } from './scenes/TrackScene';

const SCENE_DURATIONS = {
  intro: 4800,
  city: 4400,
  menu: 4600,
  tracking: 4600,
  outro: 5200,
};

export default function VideoTemplate() {
  const { currentScene } = useVideoPlayer({
    durations: SCENE_DURATIONS,
    loop: true,
  });

  return (
    <main className="showcase-shell" aria-label="Foodie showcase video">
      <div className="video-stage">
        <AnimatePresence mode="popLayout" initial={false}>
          {currentScene === 0 && <IntroScene key="intro" />}
          {currentScene === 1 && <CityScene key="city" />}
          {currentScene === 2 && <MenuScene key="menu" />}
          {currentScene === 3 && <TrackScene key="tracking" />}
          {currentScene === 4 && <OutroScene key="outro" />}
        </AnimatePresence>
      </div>
    </main>
  );
}
