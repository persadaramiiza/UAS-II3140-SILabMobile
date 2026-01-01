import imgElementPaper from "figma:asset/be073e5aa3e2ca42e0dd11c29ef94997023107e0.png";

export default function Frame() {
  return (
    <div className="relative size-full" style={{ backgroundImage: "linear-gradient(167.726deg, rgb(17, 17, 17) 4.56%, rgb(15, 42, 113) 121.64%)" }}>
      <div className="absolute flex h-[429.727px] items-center justify-center left-[-61px] top-[230px] w-[679.73px]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[276.174deg]">
          <div className="h-[644.481px] relative w-[362.521px]" data-name="Element Paper">
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgElementPaper} />
          </div>
        </div>
      </div>
      <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[24px] left-[78px] text-[17px] text-white top-[298px] w-[238px]">
        <span>{`Hello, `}</span>
        <span className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold">IT explorers!</span>
      </p>
    </div>
  );
}