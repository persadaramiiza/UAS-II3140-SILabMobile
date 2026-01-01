import img21 from "figma:asset/e3d56f9eeaca9f22d72bb65fed91c4ea34b45060.png";
import imgLogo11 from "figma:asset/c7331baf757474afb91e9105f759afebcb9348c1.png";

export default function IPhone16Pro() {
  return (
    <div className="bg-white relative size-full" data-name="iPhone 16 Pro - 1">
      <div className="absolute h-[902px] left-[-52px] top-[-14px] w-[507px]" data-name="2 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={img21} />
      </div>
      <div className="absolute h-[99px] left-[153px] top-[202px] w-[96px]" data-name="logo1 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgLogo11} />
      </div>
    </div>
  );
}