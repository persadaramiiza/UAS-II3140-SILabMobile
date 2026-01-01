import img21 from "figma:asset/e3d56f9eeaca9f22d72bb65fed91c4ea34b45060.png";
import imgLogo11 from "figma:asset/c7331baf757474afb91e9105f759afebcb9348c1.png";

export default function Frame() {
  return (
    <div className="bg-[#000002] relative size-full">
      <div className="absolute h-[849px] left-[calc(50%+0.5px)] top-[3px] translate-x-[-50%] w-[478px]" data-name="2 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={img21} />
      </div>
      <div className="absolute h-[134px] left-[132px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] top-[210px] w-[130px]" data-name="logo1 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgLogo11} />
      </div>
      <p className="absolute font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[24px] left-[197px] text-[20px] text-center text-white top-[363px] translate-x-[-50%] w-[238px]">
        <span className="text-[#fbbc04]">SILab</span>
        <span>{` Suite`}</span>
      </p>
      <p className="absolute font-['Plus_Jakarta_Sans:Italic',sans-serif] font-normal italic leading-[24px] left-[197px] text-[16px] text-center text-white top-[394px] translate-x-[-50%] w-[238px]">Design. Model. Learn</p>
      <div className="absolute flex h-[607.097px] items-center justify-center left-[-214.98px] top-[-230.76px] w-[689.796px]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[332.451deg]">
          <div className="bg-gradient-to-b from-[#0f2a71] h-[383.146px] to-[rgba(15,42,113,0)] w-[578.14px]" />
        </div>
      </div>
    </div>
  );
}