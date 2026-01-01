import img31 from "figma:asset/a00b1dd9baefaa1e5be49afe583112751ee604fc.png";
import imgLogo12 from "figma:asset/c7331baf757474afb91e9105f759afebcb9348c1.png";

export default function IPhone16Pro() {
  return (
    <div className="bg-white relative size-full" data-name="iPhone 16 Pro - 2">
      <div className="absolute h-[222px] left-0 rounded-bl-[20px] rounded-br-[20px] top-[-35px] w-[402px]" data-name="3 1">
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-bl-[20px] rounded-br-[20px]">
          <img alt="" className="absolute h-[321.97%] left-0 max-w-none top-[-112.6%] w-full" src={img31} />
        </div>
      </div>
      <div className="absolute bg-[rgba(30,30,30,0.4)] h-[222px] left-0 rounded-bl-[20px] rounded-br-[20px] top-[-35px] w-[402px]" data-name="3 2" />
      <div className="absolute h-[56px] left-[326px] top-[27px] w-[54px]" data-name="logo1 2">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgLogo12} />
      </div>
      <p className="absolute font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] left-[32px] text-[30px] text-nowrap text-white top-[92px]">Hi, Student!</p>
      <p className="absolute font-['Plus_Jakarta_Sans:Italic',sans-serif] font-normal italic leading-[normal] left-[32px] text-[15px] text-nowrap text-white top-[130px]">
        <span>{`Are you `}</span>
        <span className="font-['Plus_Jakarta_Sans:Bold_Italic',sans-serif] font-bold">ready</span>
        <span>{` to `}</span>
        <span className="font-['Plus_Jakarta_Sans:Bold_Italic',sans-serif] font-bold">explore</span>
        <span>{` today?`}</span>
      </p>
    </div>
  );
}