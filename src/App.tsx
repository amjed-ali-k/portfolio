import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
  easeIn,
  easeInOut,
} from "framer-motion";

import Layer5 from "./assets/vectors/layer-1.svg";
import Layer4 from "./assets/vectors/layer-2.svg";
import Layer3 from "./assets/vectors/layer-3.svg";
import Layer2 from "./assets/vectors/layer-4.svg";
import Layer1 from "./assets/vectors/layer-5.svg";
import { useRef } from "react";

function useParallax(progress: MotionValue<number>, speed: number) {
  return useTransform(progress, [0, 1], [0, speed], { ease: easeInOut });
}

function ParallaxSvg({
  src,
  speed,
  className,
  progress,
}: {
  src: string;
  speed: number;
  className?: string;
  progress: MotionValue<number>;
}) {
  const y = useParallax(progress, speed);
  return (
    <motion.div style={{ y: y }} className={"absolute w-full " + className}>
      <img className="w-full" src={src} alt="svg" />
    </motion.div>
  );
}

function Title({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="flex fixed flex-col w-full mt-12 top-0 left-0 items-center justify-center">
      <h1 className="text-6xl font-bold text-black">Parallax</h1>
      <h2 className="text-2xl font-bold text-black">Scroll down</h2>
    </div>
  );
}

function Header() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  return (
    <div className="overflow-hidden w-full">
      <div className="w-full relative overflow-hidden min-w-[800px]" ref={ref}>
        <div className="relative w-full h-fit">
          <ParallaxSvg src={Layer1} speed={500} progress={scrollYProgress} />
          <ParallaxSvg src={Layer2} speed={400} progress={scrollYProgress} />
          <Title progress={scrollYProgress} />
          <ParallaxSvg src={Layer3} speed={300} progress={scrollYProgress} />
          <ParallaxSvg src={Layer4} speed={200} progress={scrollYProgress} />
          <ParallaxSvg
            src={Layer5}
            speed={100}
            progress={scrollYProgress}
            className="relative"
          />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <main className="flex w-full flex-col bg-slate-200 items-center overflow-x-hidden justify-center">
      <Header />
      <div className="h-[5000px] bg-red-500 w-full"> adsf</div>
    </main>
  );
}

export default App;
