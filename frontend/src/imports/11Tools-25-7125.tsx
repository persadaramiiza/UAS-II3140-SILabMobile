import svgPaths from "./svg-ez2ntyhghb";
import clsx from "clsx";
import imgToolsHome from "figma:asset/26705343f1a706b1601b562869b52206a8a4c585.png";
type ButtonProps = {
  additionalClassNames?: string;
};

function Button({ children, additionalClassNames = "" }: React.PropsWithChildren<ButtonProps>) {
  return (
    <div className={clsx("relative rounded-[2.34832e+07px] shrink-0 size-[55.999px]", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-0 pr-[0.011px] py-0 relative size-full">{children}</div>
    </div>
  );
}

function Icon({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[23.992px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.9919 23.9919">
        <g id="Icon">{children}</g>
      </svg>
    </div>
  );
}
type HeadingTextProps = {
  text: string;
  additionalClassNames?: string;
};

function HeadingText({ text, additionalClassNames = "" }: HeadingTextProps) {
  return (
    <div className={clsx("absolute h-[23.992px] left-[19.99px]", additionalClassNames)}>
      <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#111] text-[16px] text-nowrap top-[-0.6px]">{text}</p>
    </div>
  );
}

export default function Component11Tools() {
  return (
    <div className="relative size-full" data-name="11 - Tools">
      <div className="absolute bg-white content-stretch flex flex-col gap-[0.7px] h-[852px] items-start left-0 overflow-clip top-0 w-[393px]" data-name="11-">
        <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[393.318px]" data-name="Container">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
            <div className="absolute bg-white content-stretch flex flex-col gap-[31.996px] h-[787.259px] items-start left-0 pb-0 pt-[108.663px] px-[23.992px] top-0 w-[393.318px]" data-name="ToolsHome">
              <div className="h-[446.671px] relative shrink-0 w-full" data-name="Container">
                <div className="absolute bg-white border-[#e8e8e8] border-[0.7px] border-solid h-[215.336px] left-0 rounded-[16px] top-0 w-[164.662px]" data-name="Button">
                  <div className="absolute bg-[#eff6ff] content-stretch flex items-center justify-center left-[19.99px] pl-0 pr-[0.011px] py-0 rounded-[12px] size-[47.995px] top-[19.99px]" data-name="Container">
                    <Icon>
                      <path d={svgPaths.p34b4ef00} id="Vector" stroke="var(--stroke-0, #0F2A71)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                      <path d="M2.99898 8.99695H20.9929" id="Vector_2" stroke="var(--stroke-0, #0F2A71)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                      <path d="M2.99898 14.9949H20.9929" id="Vector_3" stroke="var(--stroke-0, #0F2A71)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                      <path d="M8.99695 2.99898V20.9929" id="Vector_4" stroke="var(--stroke-0, #0F2A71)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                      <path d="M14.9949 2.99898V20.9929" id="Vector_5" stroke="var(--stroke-0, #0F2A71)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                    </Icon>
                  </div>
                  <HeadingText text="Requirements" additionalClassNames="top-[83.98px] w-[123.284px]" />
                  <div className="absolute h-[77.979px] left-[19.99px] top-[115.97px] w-[123.284px]" data-name="Paragraph">
                    <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[26px] left-0 text-[#6b6b6b] text-[16px] top-[-0.2px] w-[95px]">MoSCoW prioritization board</p>
                  </div>
                </div>
                <div className="absolute bg-white border-[#e8e8e8] border-[0.7px] border-solid h-[215.336px] left-[180.66px] rounded-[16px] top-0 w-[164.673px]" data-name="Button">
                  <div className="absolute bg-[#faf5ff] content-stretch flex items-center justify-center left-[19.99px] pl-0 pr-[0.011px] py-0 rounded-[12px] size-[47.995px] top-[20.98px]" data-name="Container">
                    <Icon>
                      <path d="M9.99661 11.9959H13.9952" id="Vector" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                      <path d="M9.99661 7.99729H13.9952" id="Vector_2" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                      <path d={svgPaths.p123d0400} id="Vector_3" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                      <path d={svgPaths.p950d300} id="Vector_4" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                      <path d={svgPaths.pe0b7360} id="Vector_5" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                    </Icon>
                  </div>
                  <div className="absolute h-[47.984px] left-[19.99px] top-[84.98px] w-[123.295px]" data-name="Heading 3">
                    <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#111] text-[16px] top-[-0.6px] w-[95px]">Enterprise Architecture</p>
                  </div>
                  <div className="absolute h-[51.986px] left-[19.99px] top-[140.95px] w-[123.295px]" data-name="Paragraph">
                    <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[26px] left-0 text-[#6b6b6b] text-[16px] top-[-0.2px] w-[112px]">{`Value stream & capabilities`}</p>
                  </div>
                </div>
                <div className="absolute bg-white border-[#e8e8e8] border-[0.7px] border-solid h-[215.336px] left-0 rounded-[16px] top-[231.33px] w-[164.662px]" data-name="Button">
                  <div className="absolute bg-[#f0fdf4] content-stretch flex items-center justify-center left-[19.99px] pl-0 pr-[0.011px] py-0 rounded-[12px] size-[47.995px] top-[32.98px]" data-name="Container">
                    <Icon>
                      <path d={svgPaths.p232fab00} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                      <path d={svgPaths.p2e440b00} id="Vector_2" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                    </Icon>
                  </div>
                  <HeadingText text="Diagram Viewer" additionalClassNames="top-[96.97px] w-[123.284px]" />
                  <div className="absolute h-[51.986px] left-[19.99px] top-[128.96px] w-[123.284px]" data-name="Paragraph">
                    <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[26px] left-0 text-[#6b6b6b] text-[16px] top-[-0.2px] w-[114px]">System modeling tools</p>
                  </div>
                </div>
                <div className="absolute bg-white border-[#e8e8e8] border-[0.7px] border-solid h-[215.336px] left-[180.66px] rounded-[16px] top-[231.33px] w-[164.673px]" data-name="Button">
                  <div className="absolute bg-[#fff7ed] content-stretch flex items-center justify-center left-[19.99px] pl-0 pr-[0.011px] py-0 rounded-[12px] size-[47.995px] top-[19.99px]" data-name="Container">
                    <Icon>
                      <path d={svgPaths.p32cb4130} id="Vector" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                      <path d={svgPaths.p160c4580} id="Vector_2" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                      <path d={svgPaths.p39a6ad40} id="Vector_3" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                    </Icon>
                  </div>
                  <HeadingText text="ERD Viewer" additionalClassNames="top-[83.98px] w-[123.295px]" />
                  <div className="absolute h-[77.979px] left-[19.99px] top-[115.97px] w-[123.295px]" data-name="Paragraph">
                    <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[26px] left-0 text-[#6b6b6b] text-[16px] top-[-0.2px] w-[90px]">Entity relationship design</p>
                  </div>
                </div>
              </div>
              <div className="bg-[#f3f3f3] h-[175.937px] relative rounded-[16px] shrink-0 w-full" data-name="Container">
                <div className="size-full">
                  <div className="content-stretch flex flex-col gap-[7.994px] items-start pb-0 pt-[19.99px] px-[19.99px] relative size-full">
                    <div className="h-[23.992px] relative shrink-0 w-full" data-name="Heading 4">
                      <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#111] text-[16px] text-nowrap top-[-0.6px]">About These Tools</p>
                    </div>
                    <div className="h-[103.972px] relative shrink-0 w-full" data-name="Paragraph">
                      <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[26px] left-0 text-[#6b6b6b] text-[16px] top-[-0.2px] w-[304px]">These interactive tools help you practice system analysis, design, and modeling techniques used in real-world software development projects.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute content-stretch flex flex-col gap-[3.991px] h-[91px] items-start left-0 pb-[0.7px] pt-[15.998px] px-[23.992px] top-0 w-[393px]" data-name="ToolsHome">
              <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
                <div className="absolute bg-white inset-0" />
                <div className="absolute inset-0 overflow-hidden">
                  <img alt="" className="absolute h-[893.02%] left-0 max-w-none top-0 w-full" src={imgToolsHome} />
                </div>
              </div>
              <div aria-hidden="true" className="absolute border-[0px_0px_0.7px] border-black border-solid inset-0 pointer-events-none" />
              <div className="h-[23.992px] relative shrink-0 w-full" data-name="Paragraph">
                <p className="absolute font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[24px] left-[0.01px] text-[16px] text-nowrap text-white top-0">Tools</p>
              </div>
              <p className="font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#b1b1b1] text-[14px] w-[160px]">System analysis and design tools</p>
            </div>
          </div>
        </div>
        <div className="bg-[rgba(255,255,255,0.8)] h-[79.991px] relative shrink-0 w-[393.318px]" data-name="BottomNav">
          <div aria-hidden="true" className="absolute border-[0.7px_0px_0px] border-black border-solid inset-0 pointer-events-none" />
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pb-0 pl-[30.52px] pr-[30.531px] pt-[0.7px] relative size-full">
            <Button>
              <Icon>
                <path d={svgPaths.p1def1100} id="Vector" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                <path d={svgPaths.p33cbaa00} id="Vector_2" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
              </Icon>
            </Button>
            <Button>
              <Icon>
                <path d={svgPaths.p36cfae00} id="Vector" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                <path d={svgPaths.p1f3dfc40} id="Vector_2" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                <path d="M9.99729 8.99695H7.99729" id="Vector_3" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                <path d="M15.9946 12.9956H7.99729" id="Vector_4" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                <path d="M15.9946 16.9942H7.99729" id="Vector_5" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
              </Icon>
            </Button>
            <Button>
              <Icon>
                <path d={svgPaths.p176aa380} id="Vector" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                <path d={svgPaths.p25149f00} id="Vector_2" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                <path d="M11.9959 10.9963H15.9946" id="Vector_3" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                <path d="M11.9959 15.9946H15.9946" id="Vector_4" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                <path d="M7.99729 10.9963H8.00729" id="Vector_5" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                <path d="M7.99729 15.9946H8.00729" id="Vector_6" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
              </Icon>
            </Button>
            <Button additionalClassNames="bg-[#0f2a71]">
              <Icon>
                <path d={svgPaths.p1009ca00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
              </Icon>
            </Button>
            <Button>
              <Icon>
                <path d={svgPaths.p4d52ae0} id="Vector" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                <path d={svgPaths.p1fa5b180} id="Vector_2" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
              </Icon>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}