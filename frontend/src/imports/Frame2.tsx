import imgElementPaper from "figma:asset/be073e5aa3e2ca42e0dd11c29ef94997023107e0.png";

export default function Frame() {
  return (
    <div className="relative size-full" style={{ backgroundImage: "linear-gradient(167.726deg, rgb(17, 17, 17) 4.56%, rgb(15, 42, 113) 121.64%)" }}>
      <div className="absolute flex h-[735.456px] items-center justify-center left-[-99px] top-[175px] w-[668.345px]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[324.689deg]">
          <div className="h-[644.481px] relative w-[362.521px]" data-name="Element Paper">
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgElementPaper} />
          </div>
        </div>
      </div>
    </div>
  );
}