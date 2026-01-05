import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import frame1 from "../assets/Frame 1.png";
import frame2 from "../assets/Frame 2.png";
import frame3 from "../assets/Frame 3.png";
import headerBg from "../assets/header-bg.png";
import splashFrame6 from "../assets/splash-frame6.png";
import imgLogo1 from "figma:asset/20619c80be32ed6ee7d8acd2e7300f68a2e4b115.png";
import imgLogo11 from "figma:asset/c7331baf757474afb91e9105f759afebcb9348c1.png";

export default function SplashScreen() {
  const [frame, setFrame] = useState(1);

  useEffect(() => {
    // Total 9.5 seconds - Frame 4 and Frame 6 hold longer
    const timer1 = setTimeout(() => setFrame(2), 900);   // Frame 1: 0-0.9s
    const timer2 = setTimeout(() => setFrame(3), 1800);  // Frame 2: 0.9-1.8s
    const timer3 = setTimeout(() => setFrame(4), 2700);  // Frame 3: 1.8-2.7s
    const timer4 = setTimeout(() => setFrame(5), 4500);  // Frame 4: 2.7-4.5s (hold 1.8s)
    const timer5 = setTimeout(() => setFrame(6), 5500);  // Frame 5: 4.5-5.5s
                                                         // Frame 6: 5.5-9.5s (hold 4s)
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, []);

  return (
    <div 
      className="relative w-full h-full overflow-hidden"
      style={{ 
        background: "linear-gradient(167.726deg, rgb(17, 17, 17) 4.56%, rgb(15, 42, 113) 121.64%)" 
      }}
    >
      {/* Frame 1: Multiple floating papers */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 1 }}
        animate={{ opacity: frame >= 2 ? 0 : 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <img 
          alt="" 
          className="absolute inset-0 w-full h-full object-cover pointer-events-none" 
          src={frame1} 
        />
      </motion.div>

      {/* Frame 2: Single rotating paper */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: frame === 2 ? 1 : frame > 2 ? 0 : 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <img 
          alt="" 
          className="absolute inset-0 w-full h-full object-cover pointer-events-none" 
          src={frame2} 
        />
      </motion.div>

      {/* Frame 3: Paper with text */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: frame === 3 ? 1 : frame > 3 ? 0 : 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <img 
          alt="" 
          className="absolute inset-0 w-full h-full object-cover pointer-events-none" 
          src={frame3} 
        />
      </motion.div>

      {/* Frame 4: Door scene with logo and text */}
      <motion.div
        className="absolute inset-0"
        style={{ 
          background: "linear-gradient(167.726deg, rgb(17, 17, 17) 4.56%, rgb(15, 42, 113) 121.64%)" 
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: frame === 4 ? 1 : frame > 4 ? 0 : 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <motion.div 
          className="absolute h-[925px] left-[-32px] top-[-33px] w-[520px]"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <img 
            alt="" 
            className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" 
            src={headerBg} 
          />
        </motion.div>
        
        <motion.div 
          className="absolute h-[89px] left-[58px] top-[280px] w-[78px]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: frame === 4 ? 0.6 : 0, scale: frame === 4 ? 1 : 0.8 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        >
          <img 
            alt="" 
            className="absolute inset-0 max-w-none object-50%-50% object-cover opacity-60 pointer-events-none size-full" 
            src={imgLogo1} 
          />
        </motion.div>
        
        <motion.p 
          className="absolute left-[50px] text-white top-[617px] w-[238px]"
          style={{ fontSize: '17px', lineHeight: '24px' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: frame === 4 ? 1 : 0, y: frame === 4 ? 0 : 10 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        >
          <span>Ready to dive into </span>
          <span style={{ fontWeight: 700, fontStyle: 'italic' }}>Information Systems?</span>
        </motion.p>
      </motion.div>

      {/* Frame 5: Door scene with bigger logo, NO text */}
      <motion.div
        className="absolute inset-0"
        style={{ 
          background: "linear-gradient(167.726deg, rgb(17, 17, 17) 4.56%, rgb(15, 42, 113) 121.64%)" 
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: frame === 5 ? 1 : frame > 5 ? 0 : 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="absolute h-[1174px] left-0 top-0 w-[660px]">
          <img 
            alt="" 
            className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" 
            src={headerBg} 
          />
        </div>
        
        <motion.div 
          className="absolute h-[127px] left-[113px] top-[399px] w-[111px]"
          initial={{ opacity: 0.6, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <img 
            alt="" 
            className="absolute inset-0 max-w-none object-50%-50% object-cover opacity-60 pointer-events-none size-full" 
            src={imgLogo1} 
          />
        </motion.div>
      </motion.div>

      {/* Frame 6: Final logo card with SILab Suite */}
      <motion.div
        className="absolute inset-0 bg-[#000002]"
        initial={{ opacity: 0 }}
        animate={{ opacity: frame === 6 ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="absolute h-[849px] left-[calc(50%+0.5px)] top-[3px] translate-x-[-50%] w-[478px]">
          <img 
            alt="" 
            className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" 
            src={splashFrame6} 
          />
        </div>
        
        <motion.div 
          className="absolute h-[134px] left-[132px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] top-[210px] w-[130px]"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <img 
            alt="" 
            className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" 
            src={imgLogo11} 
          />
        </motion.div>
        
        <motion.p 
          className="absolute left-[197px] text-center text-white top-[363px] translate-x-[-50%] w-[238px]"
          style={{ fontSize: '20px', fontWeight: 700, lineHeight: '24px' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        >
          <span className="text-[#fbbc04]">SILab</span>
          <span> Suite</span>
        </motion.p>
        
        <motion.p 
          className="absolute left-[197px] text-center text-white top-[394px] translate-x-[-50%] w-[238px]"
          style={{ fontSize: '16px', fontStyle: 'italic', lineHeight: '24px' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
        >
          Design. Model. Learn
        </motion.p>
        
        <div className="absolute flex h-[607.097px] items-center justify-center left-[-214.98px] top-[-230.76px] w-[689.796px]">
          <div className="flex-none rotate-[332.451deg]">
            <div className="bg-gradient-to-b from-[#0f2a71] h-[383.146px] to-[rgba(15,42,113,0)] w-[578.14px]" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}