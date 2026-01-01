import svgPaths from "./svg-y6l5r2vdn5";
import clsx from "clsx";
import imgImage from "figma:asset/a00b1dd9baefaa1e5be49afe583112751ee604fc.png";
import imgImageSiLabSuiteLogo from "figma:asset/c7331baf757474afb91e9105f759afebcb9348c1.png";
import imgDesainTanpaJudul212 from "figma:asset/6fc1d61ea861ee21215ef9bb50320d83c9dccb1f.png";
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

function Icon1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[15.998px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9982 15.9982">
        {children}
      </svg>
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
type ParagraphTextProps = {
  text: string;
};

function ParagraphText({ text }: ParagraphTextProps) {
  return (
    <div className="h-[31.996px] relative shrink-0 w-full">
      <p className="absolute font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[32px] left-0 text-[#0f2a71] text-[32px] text-nowrap top-[-0.2px]">{text}</p>
    </div>
  );
}
type TextText4Props = {
  text: string;
  additionalClassNames?: string;
};

function TextText4({ text, additionalClassNames = "" }: TextText4Props) {
  return (
    <div className={clsx("h-[19.497px] relative shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[19.5px] left-0 text-[#0f2a71] text-[13px] text-nowrap top-[-0.6px]">{text}</p>
      </div>
    </div>
  );
}
type TextText3Props = {
  text: string;
  additionalClassNames?: string;
};

function TextText3({ text, additionalClassNames = "" }: TextText3Props) {
  return (
    <div className={clsx("absolute content-stretch flex h-[20.296px] items-start left-[16px] top-[101.36px]", additionalClassNames)}>
      <p className="font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#9a9a9a] text-[16px] text-nowrap">{text}</p>
    </div>
  );
}
type TextText2Props = {
  text: string;
  additionalClassNames?: string;
};

function TextText2({ text, additionalClassNames = "" }: TextText2Props) {
  return (
    <div className={clsx("h-[23.992px] relative shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#6b6b6b] text-[16px] text-nowrap top-[-0.6px]">{text}</p>
      </div>
    </div>
  );
}
type TextProps = {
  text: string;
};

function Text({ text }: TextProps) {
  return (
    <div className="absolute h-[23.992px] left-[16px] top-[16px] w-[311.938px]">
      <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#111] text-[16px] text-nowrap top-[-0.6px]">{text}</p>
    </div>
  );
}
type HeadingTextProps = {
  text: string;
};

function HeadingText({ text }: HeadingTextProps) {
  return (
    <div className="h-[23.992px] relative shrink-0 w-full">
      <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#111] text-[16px] text-nowrap top-[-0.6px]">{text}</p>
    </div>
  );
}
type TextText1Props = {
  text: string;
  additionalClassNames?: string;
};

function TextText1({ text, additionalClassNames = "" }: TextText1Props) {
  return (
    <div className={clsx("absolute content-stretch flex h-[18.896px] items-start top-0", additionalClassNames)}>
      <p className="font-['Plus_Jakarta_Sans:Bold_Italic',sans-serif] font-bold italic leading-[normal] relative shrink-0 text-[15px] text-nowrap text-white">{text}</p>
    </div>
  );
}
type TextTextProps = {
  text: string;
  additionalClassNames?: string;
};

function TextText({ text, additionalClassNames = "" }: TextTextProps) {
  return (
    <div className={clsx("absolute content-stretch flex h-[18.896px] items-start top-0", additionalClassNames)}>
      <p className="font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[15px] text-nowrap text-white">{text}</p>
    </div>
  );
}

export default function Component2HomePage() {
  return (
    <div className="relative size-full" data-name="2 - Home Page">
      <div className="absolute bg-white content-stretch flex flex-col gap-[0.7px] h-[852px] items-start left-0 overflow-clip top-0 w-[393px]" data-name="Finalize SILab Suite Design">
        <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[393.318px]" data-name="Container">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
            <div className="bg-white content-stretch flex flex-col gap-[15.998px] h-[1526.829px] items-start overflow-clip pb-0 pt-[-64.999px] px-0 relative shrink-0 w-full" data-name="StudentHomeDashboard">
              <div className="h-[221.996px] relative shrink-0 w-full" data-name="Container">
                <div className="absolute content-stretch flex flex-col h-[221.996px] items-start left-0 overflow-clip pb-0 pt-[-249.957px] px-0 rounded-bl-[20px] rounded-br-[20px] top-0 w-[393.318px]" data-name="Container">
                  <div className="h-[714.758px] relative shrink-0 w-full" data-name="Image">
                    <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage} />
                  </div>
                </div>
                <div className="absolute bg-[rgba(30,30,30,0.4)] h-[221.996px] left-0 rounded-bl-[20px] rounded-br-[20px] top-0 w-[393.318px]" data-name="Container" />
                <div className="absolute h-[55.999px] left-[317.33px] top-[92px] w-[53.998px]" data-name="Image (SILab Suite Logo)">
                  <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageSiLabSuiteLogo} />
                </div>
                <div className="absolute content-stretch flex flex-col gap-[7.994px] h-[201.678px] items-start left-0 pb-0 pt-[136.996px] px-[31.996px] top-0 w-[393.318px]" data-name="Container">
                  <div className="h-[37.792px] relative shrink-0 w-full" data-name="Paragraph">
                    <p className="absolute font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] left-0 text-[30px] text-white top-0 w-[269px]">Hi, Persada!</p>
                  </div>
                  <div className="h-[18.896px] relative shrink-0 w-full" data-name="Paragraph">
                    <TextText text="Are you" additionalClassNames="left-0 w-[55.485px]" />
                    <TextText1 text="ready" additionalClassNames="left-[55.49px] w-[42.308px]" />
                    <div className="absolute content-stretch flex h-[18.896px] items-start left-[97.79px] top-0 w-[20.449px]" data-name="Text">
                      <p className="basis-0 font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[15px] text-white">to</p>
                    </div>
                    <TextText1 text="explore" additionalClassNames="left-[118.24px] w-[55.934px]" />
                    <TextText text="today?" additionalClassNames="left-[174.18px] w-[52.008px]" />
                  </div>
                </div>
              </div>
              <div className="h-[1353.834px] relative shrink-0 w-full" data-name="Container">
                <div className="absolute content-stretch flex flex-col gap-[15.998px] h-[285.3px] items-start left-[23.99px] top-[363.99px] w-[345.334px]" data-name="Container">
                  <HeadingText text="Next Deadline" />
                  <div className="bg-[rgba(251,188,4,0.2)] h-[245.31px] relative rounded-[16px] shrink-0 w-full" data-name="Container">
                    <div aria-hidden="true" className="absolute border-[#fbbc04] border-[0.7px] border-solid inset-0 pointer-events-none rounded-[16px]" />
                    <div className="absolute bg-[#f3f3f3] h-[31.975px] left-[16.7px] rounded-[999px] top-[16.7px] w-[215.424px]" data-name="Container">
                      <div className="absolute h-[23.992px] left-[12px] top-[3.99px] w-[191.432px]" data-name="Text">
                        <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#6b6b6b] text-[16px] text-nowrap top-[-0.6px]">{`System Analysis & Design`}</p>
                      </div>
                    </div>
                    <div className="absolute h-[23.992px] left-[16.7px] top-[60.67px] w-[311.938px]" data-name="Heading 3">
                      <p className="absolute font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[24px] left-0 text-[#111] text-[16px] text-nowrap top-[-0.6px]">UML Class Diagram Assignment</p>
                    </div>
                    <div className="absolute content-stretch flex gap-[7.994px] h-[23.992px] items-center left-[16.7px] top-[96.66px] w-[311.938px]" data-name="Container">
                      <Icon1>
                        <g clipPath="url(#clip0_12_1154)" id="Icon">
                          <path d={svgPaths.p2698ec00} id="Vector" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33318" />
                          <path d={svgPaths.p251b0b00} id="Vector_2" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33318" />
                        </g>
                        <defs>
                          <clipPath id="clip0_12_1154">
                            <rect fill="white" height="15.9982" width="15.9982" />
                          </clipPath>
                        </defs>
                      </Icon1>
                      <TextText2 text="Tomorrow, 11:59 PM" additionalClassNames="w-[145.077px]" />
                    </div>
                    <div className="absolute bg-[#dcfce7] content-stretch flex h-[31.975px] items-center left-[16.7px] px-[11.996px] py-0 rounded-[999px] top-[132.64px] w-[71.527px]" data-name="Container">
                      <div className="basis-0 grow h-[23.992px] min-h-px min-w-px relative shrink-0" data-name="Text">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                          <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#008236] text-[16px] text-nowrap top-[-0.6px]">Active</p>
                        </div>
                      </div>
                    </div>
                    <div className="absolute bg-[#0f2a71] h-[47.995px] left-[16.7px] rounded-[12px] top-[180.62px] w-[311.938px]" data-name="Button">
                      <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[24px] left-[156.1px] text-[16px] text-center text-nowrap text-white top-[11.4px] translate-x-[-50%]">Open</p>
                    </div>
                  </div>
                </div>
                <div className="absolute content-stretch flex flex-col gap-[15.998px] h-[463.227px] items-start left-[23.99px] top-[673.28px] w-[345.334px]" data-name="Container">
                  <HeadingText text="Announcements" />
                  <div className="bg-white h-[423.236px] relative rounded-[16px] shrink-0 w-full" data-name="Container">
                    <div className="overflow-clip rounded-[inherit] size-full">
                      <div className="content-stretch flex flex-col items-start p-[0.7px] relative size-full">
                        <div className="h-[140.944px] relative shrink-0 w-full" data-name="Container">
                          <div className="absolute h-[139.949px] left-0 top-0 w-[343.934px]" data-name="Container">
                            <Text text="Lab Session Rescheduled" />
                            <div className="absolute h-[47.984px] left-[16px] top-[43.98px] w-[311.938px]" data-name="Paragraph">
                              <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#6b6b6b] text-[16px] top-[-0.6px] w-[300px]">{`Tomorrow's lab session will be moved to 2 PM`}</p>
                            </div>
                            <TextText3 text="2 hours ago" additionalClassNames="w-[87.635px]" />
                          </div>
                          <div className="absolute bg-[#e8e8e8] h-[0.995px] left-[16px] top-[139.95px] w-[311.938px]" data-name="Container" />
                        </div>
                        <div className="h-[140.944px] relative shrink-0 w-full" data-name="Container">
                          <div className="absolute h-[139.949px] left-0 top-0 w-[343.934px]" data-name="Container">
                            <Text text="New Quiz Available" />
                            <div className="absolute h-[47.984px] left-[16px] top-[43.98px] w-[311.938px]" data-name="Paragraph">
                              <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#6b6b6b] text-[16px] top-[-0.6px] w-[283px]">Requirements Engineering quiz is now available</p>
                            </div>
                            <TextText3 text="5 hours ago" additionalClassNames="w-[87.886px]" />
                          </div>
                          <div className="absolute bg-[#e8e8e8] h-[0.995px] left-[16px] top-[139.95px] w-[311.938px]" data-name="Container" />
                        </div>
                        <div className="h-[139.949px] relative shrink-0 w-full" data-name="Container">
                          <Text text="Assignment Deadline Extension" />
                          <div className="absolute h-[47.984px] left-[16px] top-[43.98px] w-[311.938px]" data-name="Paragraph">
                            <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#6b6b6b] text-[16px] top-[-0.6px] w-[288px]">ERD assignment deadline extended to next week</p>
                          </div>
                          <TextText3 text="1 day ago" additionalClassNames="w-[69.996px]" />
                        </div>
                      </div>
                    </div>
                    <div aria-hidden="true" className="absolute border-[#e8e8e8] border-[0.7px] border-solid inset-0 pointer-events-none rounded-[16px]" />
                  </div>
                </div>
                <div className="absolute content-stretch flex flex-col gap-[15.998px] h-[169.343px] items-start left-[23.99px] top-[1160.5px] w-[345.334px]" data-name="Container">
                  <HeadingText text="Progress" />
                  <div className="bg-white h-[129.353px] relative rounded-[16px] shrink-0 w-full" data-name="Container">
                    <div aria-hidden="true" className="absolute border-[#e8e8e8] border-[0.7px] border-solid inset-0 pointer-events-none rounded-[16px]" />
                    <div className="size-full">
                      <div className="content-stretch flex flex-col gap-[15.998px] items-start pb-[0.7px] pt-[16.698px] px-[16.698px] relative size-full">
                        <div className="content-stretch flex flex-col gap-[7.994px] h-[39.979px] items-start relative shrink-0 w-full" data-name="Container">
                          <div className="content-stretch flex h-[23.992px] items-center justify-between relative shrink-0 w-full" data-name="Container">
                            <TextText2 text="Tasks Completed" additionalClassNames="w-[132.076px]" />
                            <div className="h-[23.992px] relative shrink-0 w-[32.456px]" data-name="Text">
                              <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                                <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#111] text-[16px] top-[-0.6px] w-[33px]">8/12</p>
                              </div>
                            </div>
                          </div>
                          <div className="bg-[#f3f3f3] h-[7.994px] relative rounded-[2.34832e+07px] shrink-0 w-full" data-name="Container">
                            <div className="overflow-clip rounded-[inherit] size-full">
                              <div className="content-stretch flex flex-col items-start pl-0 pr-[103.983px] py-0 relative size-full">
                                <div className="bg-[#0f2a71] h-[7.994px] rounded-[2.34832e+07px] shrink-0 w-full" data-name="Container" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="content-stretch flex flex-col gap-[7.994px] h-[39.979px] items-start relative shrink-0 w-full" data-name="Container">
                          <div className="content-stretch flex h-[23.992px] items-center justify-between relative shrink-0 w-full" data-name="Container">
                            <TextText2 text="Average Quiz Score" additionalClassNames="w-[148.052px]" />
                            <div className="h-[23.992px] relative shrink-0 w-[53.495px]" data-name="Container">
                              <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[3.991px] items-center relative size-full">
                                <div className="relative shrink-0 size-[13.997px]" data-name="Icon">
                                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.9971 13.9971">
                                    <g clipPath="url(#clip0_12_1180)" id="Icon">
                                      <path d={svgPaths.p3264f280} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16642" />
                                      <path d={svgPaths.p38d53900} id="Vector_2" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16642" />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_12_1180">
                                        <rect fill="white" height="13.9971" width="13.9971" />
                                      </clipPath>
                                    </defs>
                                  </svg>
                                </div>
                                <div className="h-[23.992px] relative shrink-0 w-[35.507px]" data-name="Text">
                                  <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                                    <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#111] text-[16px] top-[-0.6px] w-[36px]">85%</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="bg-[#f3f3f3] h-[7.994px] relative rounded-[2.34832e+07px] shrink-0 w-full" data-name="Container">
                            <div className="overflow-clip rounded-[inherit] size-full">
                              <div className="content-stretch flex flex-col items-start pl-0 pr-[46.792px] py-0 relative size-full">
                                <div className="bg-[#00c950] h-[7.994px] rounded-[2.34832e+07px] shrink-0 w-full" data-name="Container" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute h-[339.998px] left-0 top-0 w-[393.318px]" data-name="Container">
                  <div className="absolute content-stretch flex flex-col h-[339.998px] items-start left-0 overflow-clip px-[23.992px] py-0 top-0 w-[393.318px]" data-name="Container">
                    <div className="h-[339.998px] shrink-0 w-full" data-name="Image (Exploration illustration)" />
                  </div>
                  <div className="absolute h-[92.884px] left-[23.99px] top-[231.12px] w-[345.334px]" data-name="Container">
                    <div className="absolute bg-white content-stretch flex flex-col gap-[7.994px] h-[92.884px] items-start left-0 pb-[0.7px] pt-[16.698px] px-[16.698px] rounded-[16px] top-0 w-[166.664px]" data-name="Container">
                      <div aria-hidden="true" className="absolute border-[#e8e8e8] border-[0.7px] border-solid inset-0 pointer-events-none rounded-[16px]" />
                      <div className="content-stretch flex gap-[7.994px] h-[19.497px] items-center relative shrink-0 w-full" data-name="Container">
                        <Icon1>
                          <g clipPath="url(#clip0_12_1168)" id="Icon">
                            <path d={svgPaths.p743d000} id="Vector" stroke="var(--stroke-0, #0F2A71)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33318" />
                            <path d={svgPaths.p101b22f0} id="Vector_2" stroke="var(--stroke-0, #0F2A71)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33318" />
                          </g>
                          <defs>
                            <clipPath id="clip0_12_1168">
                              <rect fill="white" height="15.9982" width="15.9982" />
                            </clipPath>
                          </defs>
                        </Icon1>
                        <TextText4 text="Due Soon" additionalClassNames="w-[60.494px]" />
                      </div>
                      <ParagraphText text="3" />
                    </div>
                    <div className="absolute bg-white content-stretch flex flex-col gap-[7.994px] h-[92.884px] items-start left-[178.66px] pb-[0.7px] pt-[16.698px] px-[16.698px] rounded-[16px] top-0 w-[166.675px]" data-name="Container">
                      <div aria-hidden="true" className="absolute border-[#e8e8e8] border-[0.7px] border-solid inset-0 pointer-events-none rounded-[16px]" />
                      <div className="content-stretch flex gap-[7.994px] h-[19.497px] items-center relative shrink-0 w-full" data-name="Container">
                        <Icon1>
                          <g clipPath="url(#clip0_12_1162)" id="Icon">
                            <path d="M5.33274 1.33318V3.99955" id="Vector" stroke="var(--stroke-0, #0F2A71)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33318" />
                            <path d="M10.6655 1.33318V3.99955" id="Vector_2" stroke="var(--stroke-0, #0F2A71)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33318" />
                            <path d={svgPaths.pcbfee00} id="Vector_3" stroke="var(--stroke-0, #0F2A71)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33318" />
                            <path d="M1.99978 6.66592H13.9984" id="Vector_4" stroke="var(--stroke-0, #0F2A71)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33318" />
                          </g>
                          <defs>
                            <clipPath id="clip0_12_1162">
                              <rect fill="white" height="15.9982" width="15.9982" />
                            </clipPath>
                          </defs>
                        </Icon1>
                        <TextText4 text="Quiz Today" additionalClassNames="w-[68.717px]" />
                      </div>
                      <ParagraphText text="1" />
                    </div>
                  </div>
                </div>
                <div className="absolute h-[342px] left-[7px] top-[-18px] w-[381px]" data-name="Desain tanpa judul (21) 2">
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <img alt="" className="absolute h-[198.14%] left-0 max-w-none top-[-27.55%] w-full" src={imgDesainTanpaJudul212} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[rgba(255,255,255,0.8)] h-[79.991px] relative shrink-0 w-[393.318px]" data-name="BottomNav">
          <div aria-hidden="true" className="absolute border-[0.7px_0px_0px] border-black border-solid inset-0 pointer-events-none" />
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pb-0 pl-[30.52px] pr-[30.531px] pt-[0.7px] relative size-full">
            <Button additionalClassNames="bg-[#0f2a71]">
              <Icon>
                <path d={svgPaths.p1def1100} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                <path d={svgPaths.p33cbaa00} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
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
            <Button>
              <Icon>
                <path d={svgPaths.p1009ca00} id="Vector" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
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