import svgPaths from "./svg-qyqn7vif5p";
import clsx from "clsx";
import imgImageSiLabSuiteLogo from "figma:asset/c7331baf757474afb91e9105f759afebcb9348c1.png";
import imgProfileScreen from "figma:asset/0296d46b7d60abc44c4ad89aa86a77476cfa9aab.png";
type Wrapper1Props = {
  additionalClassNames?: string;
};

function Wrapper1({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper1Props>) {
  return (
    <div className={clsx("relative rounded-[2.34832e+07px] shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-0 pr-[0.011px] py-0 relative size-full">{children}</div>
    </div>
  );
}

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[19.99px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9896 19.9896">
        {children}
      </svg>
    </div>
  );
}

function Icon1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[23.992px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.9919 23.9919">
        <g id="Icon">{children}</g>
      </svg>
    </div>
  );
}

function Icon({ children }: React.PropsWithChildren<{}>) {
  return (
    <Wrapper>
      <g id="Icon">{children}</g>
    </Wrapper>
  );
}
type HeadingTextProps = {
  text: string;
  additionalClassNames?: string;
};

function HeadingText({ text, additionalClassNames = "" }: HeadingTextProps) {
  return (
    <div className={clsx("h-[23.992px] relative shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#111] text-[16px] text-nowrap top-[-0.6px]">{text}</p>
      </div>
    </div>
  );
}

export default function Component17Profile() {
  return (
    <div className="relative size-full" data-name="17 - Profile">
      <div className="absolute bg-white content-stretch flex flex-col gap-[0.7px] h-[852px] items-start left-0 overflow-clip top-0 w-[393px]" data-name="Finalize SILab Suite Design">
        <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[393.318px]" data-name="Container">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
            <div className="absolute bg-white content-stretch flex flex-col gap-[23.992px] h-[771px] items-start left-0 overflow-x-clip overflow-y-auto pb-0 pt-[82.692px] px-[23.992px] top-0 w-[393px]" data-name="ProfileScreen">
              <div className="bg-white h-[365.991px] relative rounded-[16px] shrink-0 w-full" data-name="Container">
                <div aria-hidden="true" className="absolute border-[#e8e8e8] border-[0.7px] border-solid inset-0 pointer-events-none rounded-[16px]" />
                <div className="size-full">
                  <div className="content-stretch flex flex-col gap-[15.998px] items-start pb-[0.7px] pt-[24.692px] px-[24.692px] relative size-full">
                    <div className="content-stretch flex flex-col gap-[15.998px] h-[175.948px] items-center relative shrink-0 w-full" data-name="Container">
                      <Wrapper1 additionalClassNames="bg-[#0f2a71] size-[95.989px]">
                        <div className="relative shrink-0 size-[39.99px]" data-name="Icon">
                          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 39.9901 39.9901">
                            <g id="Icon">
                              <path d={svgPaths.p13b04f80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33251" />
                              <path d={svgPaths.p13da6400} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33251" />
                            </g>
                          </svg>
                        </div>
                      </Wrapper1>
                      <HeadingText text="Persada R" additionalClassNames="w-[75.311px]" />
                      <div className="bg-[#dbeafe] h-[31.975px] relative rounded-[999px] shrink-0 w-[85.59px]" data-name="Container">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center px-[11.996px] py-0 relative size-full">
                          <div className="basis-0 grow h-[23.992px] min-h-px min-w-px relative shrink-0" data-name="Text">
                            <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                              <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#1447e6] text-[16px] text-nowrap top-[-0.6px]">Student</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex flex-col gap-[11.996px] h-[159.96px] items-center px-0 py-[15.998px] relative shrink-0 w-full" data-name="Container">
                <div className="relative shrink-0 size-[63.993px]" data-name="Image (SILab Suite Logo)">
                  <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageSiLabSuiteLogo} />
                </div>
                <HeadingText text="SILab Suite" additionalClassNames="w-[84.365px]" />
                <div className="h-[23.992px] relative shrink-0 w-[97.564px]" data-name="Paragraph">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                    <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#6b6b6b] text-[16px] text-nowrap top-[-0.6px]">Version 1.0.0</p>
                  </div>
                </div>
              </div>
              <div className="bg-white h-[162.355px] relative rounded-[16px] shrink-0 w-full" data-name="Container">
                <div className="overflow-clip relative rounded-[inherit] size-full">
                  <div className="absolute content-stretch flex h-[79.98px] items-center justify-between left-[0.7px] px-[15.998px] py-0 top-[0.7px] w-[343.934px]" data-name="Button">
                    <div className="h-[47.984px] relative shrink-0 w-[247.289px]" data-name="Container">
                      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[11.996px] items-center relative size-full">
                        <Wrapper>
                          <g clipPath="url(#clip0_25_6989)" id="Icon">
                            <path d={svgPaths.p2ce56700} id="Vector" stroke="var(--stroke-0, #001740)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6658" />
                            <path d={svgPaths.p34f4b180} id="Vector_2" stroke="var(--stroke-0, #001740)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6658" />
                          </g>
                          <defs>
                            <clipPath id="clip0_25_6989">
                              <rect fill="white" height="19.9896" width="19.9896" />
                            </clipPath>
                          </defs>
                        </Wrapper>
                        <div className="h-[47.984px] relative shrink-0 w-[215.303px]" data-name="Container">
                          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
                            <div className="h-[23.992px] relative shrink-0 w-full" data-name="Paragraph">
                              <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#111] text-[16px] text-nowrap top-[-0.6px]">Notifications</p>
                            </div>
                            <div className="h-[23.992px] relative shrink-0 w-full" data-name="Paragraph">
                              <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#6b6b6b] text-[16px] text-nowrap top-[-0.6px]">Manage notification settings</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Icon>
                      <path d={svgPaths.p322b00c4} id="Vector" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6658" />
                    </Icon>
                  </div>
                  <div className="absolute bg-[#e8e8e8] h-[0.995px] left-[16.7px] top-[80.68px] w-[311.938px]" data-name="Container" />
                  <div className="absolute h-[79.98px] left-[0.7px] top-[81.68px] w-[343.934px]" data-name="Button">
                    <div className="absolute content-stretch flex gap-[11.996px] h-[47.984px] items-center left-[16px] top-[16px] w-[191.333px]" data-name="Container">
                      <Icon>
                        <path d={svgPaths.pb345000} id="Vector" stroke="var(--stroke-0, #001740)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6658" />
                      </Icon>
                      <div className="h-[47.984px] relative shrink-0 w-[159.348px]" data-name="Container">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                          <div className="absolute h-[23.992px] left-0 top-0 w-[159.348px]" data-name="Paragraph">
                            <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#111] text-[16px] text-nowrap top-[-0.6px]">Dark Mode</p>
                          </div>
                          <div className="absolute h-[23.992px] left-0 top-[23.99px] w-[159.348px]" data-name="Paragraph">
                            <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#6b6b6b] text-[16px] text-nowrap top-[-0.6px]">Switch to dark theme</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute bg-[#e8e8e8] content-stretch flex flex-col h-[23.992px] items-start left-[279.94px] pb-0 pl-[3.991px] pr-[28.005px] pt-[3.991px] rounded-[2.34832e+07px] top-[27.99px] w-[47.995px]" data-name="Container">
                      <div className="bg-white h-[15.998px] rounded-[2.34832e+07px] shrink-0 w-full" data-name="Container" />
                    </div>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#e8e8e8] border-[0.7px] border-solid inset-0 pointer-events-none rounded-[16px]" />
              </div>
              <div className="bg-[#f3f3f3] h-[135.968px] relative rounded-[12px] shrink-0 w-full" data-name="Container">
                <div className="size-full">
                  <div className="content-stretch flex flex-col items-start pb-0 pt-[15.998px] px-[15.998px] relative size-full">
                    <div className="h-[103.972px] relative shrink-0 w-full" data-name="Paragraph">
                      <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[26px] left-0 text-[#6b6b6b] text-[16px] top-[-0.2px] w-[311px]">SILab Suite is a comprehensive virtual laboratory platform for Information Systems education at ITB. Design. Model. Learn — All in One Lab.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#fef2f2] h-[47.995px] relative rounded-[12px] shrink-0 w-full" data-name="Button">
                <div aria-hidden="true" className="absolute border-[#ffc9c9] border-[0.7px] border-solid inset-0 pointer-events-none rounded-[12px]" />
                <div className="absolute left-[128.82px] size-[18px] top-[14.99px]" data-name="Icon">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
                    <g id="Icon">
                      <path d={svgPaths.p26a51800} id="Vector" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49995" />
                      <path d="M15.7498 8.99968H6.74976" id="Vector_2" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49995" />
                      <path d={svgPaths.p3d8d0000} id="Vector_3" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49995" />
                    </g>
                  </svg>
                </div>
                <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[24px] left-[185.81px] text-[#e7000b] text-[16px] text-center text-nowrap top-[11.4px] translate-x-[-50%]">Log Out</p>
              </div>
              <div className="h-[23.992px] relative shrink-0 w-full" data-name="Paragraph">
                <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[24px] left-[172.72px] text-[#9a9a9a] text-[16px] text-center text-nowrap top-[-0.6px] translate-x-[-50%]">© 2025 LabSI ITB. All rights reserved.</p>
              </div>
            </div>
            <div className="absolute content-stretch flex flex-col h-[58.7px] items-start left-0 pb-[0.7px] pt-[15.998px] px-[23.992px] top-0 w-[393.318px]" data-name="ProfileScreen">
              <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgProfileScreen} />
              <div aria-hidden="true" className="absolute border-[#e8e8e8] border-[0px_0px_0.7px] border-solid inset-0 pointer-events-none" />
              <div className="content-stretch flex h-[26.004px] items-start relative shrink-0 w-full" data-name="Heading 2">
                <p className="basis-0 font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold grow leading-[26px] min-h-px min-w-px relative shrink-0 text-[20px] text-white">Profile</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[rgba(255,255,255,0.8)] h-[79.991px] relative shrink-0 w-[393.318px]" data-name="BottomNav">
          <div aria-hidden="true" className="absolute border-[0.7px_0px_0px] border-black border-solid inset-0 pointer-events-none" />
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pb-0 pl-[30.52px] pr-[30.531px] pt-[0.7px] relative size-full">
            <Wrapper1 additionalClassNames="size-[55.999px]">
              <Icon1>
                <path d={svgPaths.p1def1100} id="Vector" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                <path d={svgPaths.p33cbaa00} id="Vector_2" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
              </Icon1>
            </Wrapper1>
            <Wrapper1 additionalClassNames="size-[55.999px]">
              <Icon1>
                <path d={svgPaths.p36cfae00} id="Vector" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                <path d={svgPaths.p1f3dfc40} id="Vector_2" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                <path d="M9.99729 8.99695H7.99729" id="Vector_3" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                <path d="M15.9946 12.9956H7.99729" id="Vector_4" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                <path d="M15.9946 16.9942H7.99729" id="Vector_5" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
              </Icon1>
            </Wrapper1>
            <Wrapper1 additionalClassNames="size-[55.999px]">
              <Icon1>
                <path d={svgPaths.p176aa380} id="Vector" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                <path d={svgPaths.p25149f00} id="Vector_2" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                <path d="M11.9959 10.9963H15.9946" id="Vector_3" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                <path d="M11.9959 15.9946H15.9946" id="Vector_4" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                <path d="M7.99729 10.9963H8.00729" id="Vector_5" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                <path d="M7.99729 15.9946H8.00729" id="Vector_6" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
              </Icon1>
            </Wrapper1>
            <Wrapper1 additionalClassNames="size-[55.999px]">
              <Icon1>
                <path d={svgPaths.p1009ca00} id="Vector" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
              </Icon1>
            </Wrapper1>
            <Wrapper1 additionalClassNames="bg-[#0f2a71] size-[55.999px]">
              <Icon1>
                <path d={svgPaths.p4d52ae0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                <path d={svgPaths.p1fa5b180} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
              </Icon1>
            </Wrapper1>
          </div>
        </div>
      </div>
    </div>
  );
}