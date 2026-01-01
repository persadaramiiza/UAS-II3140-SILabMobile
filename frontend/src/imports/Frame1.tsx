import imgElementPaper from "figma:asset/be073e5aa3e2ca42e0dd11c29ef94997023107e0.png";

export default function Frame() {
  return (
    <div className="relative size-full" style={{ backgroundImage: "linear-gradient(167.726deg, rgb(17, 17, 17) 4.56%, rgb(15, 42, 113) 121.64%)" }}>
      <div className="absolute h-[890px] left-[-108px] top-[-274px] w-[501px]" data-name="Element Paper">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgElementPaper} />
      </div>
    </div>
  );
}