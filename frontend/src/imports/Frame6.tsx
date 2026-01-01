import img31 from "figma:asset/a00b1dd9baefaa1e5be49afe583112751ee604fc.png";
import imgLogo1 from "figma:asset/20619c80be32ed6ee7d8acd2e7300f68a2e4b115.png";

export default function Frame() {
  return (
    <div className="relative size-full" style={{ backgroundImage: "linear-gradient(167.726deg, rgb(17, 17, 17) 4.56%, rgb(15, 42, 113) 121.64%)" }}>
      <div className="absolute h-[1174px] left-0 top-0 w-[660px]" data-name="3 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={img31} />
      </div>
      <div className="absolute h-[127px] left-[113px] top-[399px] w-[111px]" data-name="logo 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover opacity-60 pointer-events-none size-full" src={imgLogo1} />
      </div>
    </div>
  );
}