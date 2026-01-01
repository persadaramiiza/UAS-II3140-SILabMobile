import svgPaths from "./svg-covqc297zp";
import clsx from "clsx";
import imgContainer from "figma:asset/3e850e92b43284db0fac35330dbde26d5a67894a.png";

function Container2({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="basis-0 grow h-[71.987px] min-h-px min-w-px relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[3.991px] items-start relative size-full">{children}</div>
    </div>
  );
}
type Wrapper5Props = {
  additionalClassNames?: string;
};

function Wrapper5({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper5Props>) {
  return (
    <div className={clsx("relative rounded-[2.34832e+07px] shrink-0 size-[39.99px]", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-0 pr-[0.011px] py-0 relative size-full">{children}</div>
    </div>
  );
}
type Wrapper4Props = {
  additionalClassNames?: string;
};

function Wrapper4({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper4Props>) {
  return (
    <div className={clsx("relative rounded-[2.34832e+07px] shrink-0 size-[47.995px]", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-0 pr-[0.011px] py-0 relative size-full">{children}</div>
    </div>
  );
}
type Wrapper3Props = {
  additionalClassNames?: string;
};

function Wrapper3({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper3Props>) {
  return (
    <div className={clsx("relative rounded-[2.34832e+07px] shrink-0 size-[31.996px]", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-0 pr-[0.011px] py-0 relative size-full">{children}</div>
    </div>
  );
}
type Wrapper2Props = {
  additionalClassNames?: string;
};

function Wrapper2({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper2Props>) {
  return (
    <div className={clsx("relative rounded-[2.34832e+07px] shrink-0 size-[55.999px]", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-0 pr-[0.011px] py-0 relative size-full">{children}</div>
    </div>
  );
}

function Icon2({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[15.998px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9982 15.9982">
        {children}
      </svg>
    </div>
  );
}
type Wrapper1Props = {
  additionalClassNames?: string;
};

function Wrapper1({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper1Props>) {
  return (
    <div className={additionalClassNames}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">{children}</div>
    </div>
  );
}
type WrapperProps = {
  additionalClassNames?: string;
};

function Wrapper({ children, additionalClassNames = "" }: React.PropsWithChildren<WrapperProps>) {
  return <Wrapper1 additionalClassNames={clsx("relative shrink-0", additionalClassNames)}>{children}</Wrapper1>;
}

function Container1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="bg-white h-[105.383px] relative rounded-[16px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e8e8e8] border-[0.7px] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="size-full">
        <div className="content-stretch flex flex-col items-start pb-[0.7px] pt-[16.698px] px-[16.698px] relative size-full">{children}</div>
      </div>
    </div>
  );
}

function Icon1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[18px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">{children}</g>
      </svg>
    </div>
  );
}
type ContainerProps = {
  additionalClassNames?: string;
};

function Container({ children, additionalClassNames = "" }: React.PropsWithChildren<ContainerProps>) {
  return (
    <div className={clsx("relative shrink-0 w-full", additionalClassNames)}>
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[11.996px] items-start px-[23.992px] py-0 relative size-full">{children}</div>
      </div>
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
type ParagraphText2Props = {
  text: string;
};

function ParagraphText2({ text }: ParagraphText2Props) {
  return (
    <div className="h-[20.001px] relative shrink-0 w-full">
      <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#999] text-[12px] text-nowrap top-[-0.9px]">{text}</p>
    </div>
  );
}
type ParagraphText1Props = {
  text: string;
};

function ParagraphText1({ text }: ParagraphText1Props) {
  return (
    <div className="h-[20.001px] relative shrink-0 w-full">
      <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#6b6b6b] text-[14px] text-nowrap top-[-0.3px]">{text}</p>
    </div>
  );
}
type HeadingTextProps = {
  text: string;
};

function HeadingText({ text }: HeadingTextProps) {
  return (
    <div className="h-[24.003px] relative shrink-0 w-full">
      <p className="absolute font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[24px] left-0 text-[#111] text-[16px] text-nowrap top-[-0.6px]">{text}</p>
    </div>
  );
}
type ParagraphTextProps = {
  text: string;
};

function ParagraphText({ text }: ParagraphTextProps) {
  return (
    <div className="h-[35.999px] relative shrink-0 w-full">
      <p className="absolute font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[36px] left-0 text-[#0f2a71] text-[24px] text-nowrap top-[-0.9px]">{text}</p>
    </div>
  );
}
type TextTextProps = {
  text: string;
  additionalClassNames?: string;
};

function TextText({ text, additionalClassNames = "" }: TextTextProps) {
  return (
    <Wrapper1 additionalClassNames={clsx("h-[20.996px] relative shrink-0", additionalClassNames)}>
      <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[21px] left-0 text-[#6b6b6b] text-[14px] text-nowrap top-[0.4px]">{text}</p>
    </Wrapper1>
  );
}

export default function A1HomePage() {
  return (
    <div className="relative size-full" data-name="A1 - Home Page">
      <div className="absolute bg-white content-stretch flex flex-col gap-[0.7px] h-[852px] items-start left-0 overflow-clip top-0 w-[393px]" data-name="Finalize SILab Suite Design">
        <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[393.318px]" data-name="Container">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
            <div className="content-stretch flex flex-col gap-[7.994px] h-[162.967px] items-start pb-0 pt-[47.995px] px-[23.992px] relative shrink-0 w-[393.318px]" data-name="Container">
              <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgContainer} />
              <div className="h-[53.987px] relative shrink-0 w-full" data-name="Container">
                <div className="absolute content-stretch flex flex-col gap-[3.991px] h-[53.987px] items-start left-0 top-0 w-[108.062px]" data-name="Container">
                  <div className="h-[20.001px] relative shrink-0 w-full" data-name="Paragraph">
                    <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[20px] left-0 text-[14px] text-[rgba(255,255,255,0.8)] text-nowrap top-[-0.3px]">Welcome back,</p>
                  </div>
                  <div className="h-[29.995px] relative shrink-0 w-full" data-name="Heading 1">
                    <p className="absolute font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[30px] left-0 text-[24px] text-nowrap text-white top-[-0.7px]">Assistant</p>
                  </div>
                </div>
                <div className="absolute bg-[rgba(255,255,255,0.1)] left-[305.34px] rounded-[2.34832e+07px] size-[39.99px] top-0" data-name="Button">
                  <div className="absolute left-[9.99px] size-[19.99px] top-[9.99px]" data-name="Icon">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9896 19.9896">
                      <g clipPath="url(#clip0_28_8607)" id="Icon">
                        <path d={svgPaths.p231b1d00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6658" />
                        <path d={svgPaths.p168300} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6658" />
                      </g>
                      <defs>
                        <clipPath id="clip0_28_8607">
                          <rect fill="white" height="19.9896" width="19.9896" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div className="absolute bg-[#fbbc04] content-stretch flex items-center justify-center left-[23.99px] rounded-[2.34832e+07px] size-[19.99px] top-[-3.99px]" data-name="Text">
                    <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[16.5px] relative shrink-0 text-[11px] text-center text-nowrap text-white">3</p>
                  </div>
                </div>
              </div>
              <div className="h-[20.996px] relative shrink-0 w-full" data-name="Paragraph">
                <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[21px] left-0 text-[14px] text-[rgba(255,255,255,0.7)] text-nowrap top-[0.4px]">Manage your lab activities</p>
              </div>
            </div>
            <div className="bg-[#fafafa] content-stretch flex flex-col gap-[24px] items-center px-0 py-[32px] relative shrink-0 w-[393px]" data-name="AssistantHome">
              <div className="h-[230.766px] relative shrink-0 w-[345.334px]" data-name="Container">
                <div className="absolute bg-white content-stretch flex flex-col gap-[7.994px] h-[109.385px] items-start left-0 pb-[0.7px] pt-[16.698px] px-[16.698px] rounded-[16px] top-0 w-[166.664px]" data-name="Container">
                  <div aria-hidden="true" className="absolute border-[#e8e8e8] border-[0.7px] border-solid inset-0 pointer-events-none rounded-[16px]" />
                  <div className="content-stretch flex gap-[7.994px] h-[31.996px] items-center relative shrink-0 w-full" data-name="Container">
                    <Wrapper3 additionalClassNames="bg-[rgba(15,42,113,0.1)]">
                      <Icon2>
                        <g clipPath="url(#clip0_28_8637)" id="Icon">
                          <path d={svgPaths.p3f026fc0} id="Vector" stroke="var(--stroke-0, #0F2A71)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33318" />
                          <path d={svgPaths.p3645180} id="Vector_2" stroke="var(--stroke-0, #0F2A71)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33318" />
                          <path d={svgPaths.p13fb2600} id="Vector_3" stroke="var(--stroke-0, #0F2A71)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33318" />
                          <path d={svgPaths.p3fa493b0} id="Vector_4" stroke="var(--stroke-0, #0F2A71)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33318" />
                        </g>
                        <defs>
                          <clipPath id="clip0_28_8637">
                            <rect fill="white" height="15.9982" width="15.9982" />
                          </clipPath>
                        </defs>
                      </Icon2>
                    </Wrapper3>
                    <TextText text="Students" additionalClassNames="w-[61.018px]" />
                  </div>
                  <ParagraphText text="42" />
                </div>
                <div className="absolute bg-white content-stretch flex flex-col gap-[7.994px] h-[109.385px] items-start left-[178.66px] pb-[0.7px] pt-[16.698px] px-[16.698px] rounded-[16px] top-0 w-[166.675px]" data-name="Container">
                  <div aria-hidden="true" className="absolute border-[#e8e8e8] border-[0.7px] border-solid inset-0 pointer-events-none rounded-[16px]" />
                  <div className="content-stretch flex gap-[7.994px] h-[31.996px] items-center relative shrink-0 w-full" data-name="Container">
                    <Wrapper3 additionalClassNames="bg-[rgba(251,188,4,0.1)]">
                      <Icon2>
                        <g clipPath="url(#clip0_28_8618)" id="Icon">
                          <path d={svgPaths.p35df4a80} id="Vector" stroke="var(--stroke-0, #FBBC04)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33318" />
                          <path d={svgPaths.p5bc1500} id="Vector_2" stroke="var(--stroke-0, #FBBC04)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33318" />
                          <path d="M6.66607 5.99933H5.33273" id="Vector_3" stroke="var(--stroke-0, #FBBC04)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33318" />
                          <path d="M10.6661 8.66571H5.33273" id="Vector_4" stroke="var(--stroke-0, #FBBC04)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33318" />
                          <path d="M10.6661 11.3321H5.33273" id="Vector_5" stroke="var(--stroke-0, #FBBC04)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33318" />
                        </g>
                        <defs>
                          <clipPath id="clip0_28_8618">
                            <rect fill="white" height="15.9982" width="15.9982" />
                          </clipPath>
                        </defs>
                      </Icon2>
                    </Wrapper3>
                    <TextText text="Assignments" additionalClassNames="w-[85.765px]" />
                  </div>
                  <ParagraphText text="3" />
                </div>
                <div className="absolute bg-white content-stretch flex flex-col gap-[7.994px] h-[109.385px] items-start left-0 pb-[0.7px] pt-[16.698px] px-[16.698px] rounded-[16px] top-[121.38px] w-[166.664px]" data-name="Container">
                  <div aria-hidden="true" className="absolute border-[#e8e8e8] border-[0.7px] border-solid inset-0 pointer-events-none rounded-[16px]" />
                  <div className="content-stretch flex gap-[7.994px] h-[31.996px] items-center relative shrink-0 w-full" data-name="Container">
                    <Wrapper3 additionalClassNames="bg-[rgba(52,87,213,0.1)]">
                      <Icon2>
                        <g clipPath="url(#clip0_28_8643)" id="Icon">
                          <path d={svgPaths.p1bd93800} id="Vector" stroke="var(--stroke-0, #3457D5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33318" />
                          <path d={svgPaths.p3fec8380} id="Vector_2" stroke="var(--stroke-0, #3457D5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33318" />
                          <path d="M7.99911 7.33253H10.6658" id="Vector_3" stroke="var(--stroke-0, #3457D5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33318" />
                          <path d="M7.99911 10.6655H10.6658" id="Vector_4" stroke="var(--stroke-0, #3457D5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33318" />
                          <path d="M5.33274 7.33253H5.3394" id="Vector_5" stroke="var(--stroke-0, #3457D5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33318" />
                          <path d="M5.33274 10.6655H5.3394" id="Vector_6" stroke="var(--stroke-0, #3457D5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33318" />
                        </g>
                        <defs>
                          <clipPath id="clip0_28_8643">
                            <rect fill="white" height="15.9982" width="15.9982" />
                          </clipPath>
                        </defs>
                      </Icon2>
                    </Wrapper3>
                    <TextText text="Quizzes" additionalClassNames="w-[51.822px]" />
                  </div>
                  <ParagraphText text="2" />
                </div>
                <div className="absolute bg-white content-stretch flex flex-col gap-[7.994px] h-[109.385px] items-start left-[178.66px] pb-[0.7px] pt-[16.698px] px-[16.698px] rounded-[16px] top-[121.38px] w-[166.675px]" data-name="Container">
                  <div aria-hidden="true" className="absolute border-[#e8e8e8] border-[0.7px] border-solid inset-0 pointer-events-none rounded-[16px]" />
                  <div className="content-stretch flex gap-[7.994px] h-[31.996px] items-center relative shrink-0 w-full" data-name="Container">
                    <Wrapper3 additionalClassNames="bg-[rgba(249,115,22,0.1)]">
                      <Icon2>
                        <g clipPath="url(#clip0_28_8625)" id="Icon">
                          <path d={svgPaths.p64a96c0} id="Vector" stroke="var(--stroke-0, #F97316)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33318" />
                          <path d={svgPaths.p3ba53940} id="Vector_2" stroke="var(--stroke-0, #F97316)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33318" />
                        </g>
                        <defs>
                          <clipPath id="clip0_28_8625">
                            <rect fill="white" height="15.9982" width="15.9982" />
                          </clipPath>
                        </defs>
                      </Icon2>
                    </Wrapper3>
                    <TextText text="To Grade" additionalClassNames="w-[59.914px]" />
                  </div>
                  <ParagraphText text="12" />
                </div>
              </div>
              <Container additionalClassNames="h-[288.766px]">
                <div className="h-[26.004px] relative shrink-0 w-full" data-name="Heading 2">
                  <p className="absolute font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[26px] left-0 text-[#111] text-[18px] text-nowrap top-[0.4px]">Quick Actions</p>
                </div>
                <div className="h-[250.766px] relative shrink-0 w-full" data-name="Container">
                  <div className="absolute bg-white content-stretch flex flex-col gap-[7.994px] h-[129.385px] items-center left-0 pb-[36.699px] pt-[16.698px] px-[0.7px] rounded-[16px] top-0 w-[166.664px]" data-name="Button">
                    <div aria-hidden="true" className="absolute border-[#e8e8e8] border-[0.7px] border-solid inset-0 pointer-events-none rounded-[16px]" />
                    <Wrapper4 additionalClassNames="bg-[rgba(15,42,113,0.08)]">
                      <Icon>
                        <path d={svgPaths.p36cfae00} id="Vector" stroke="var(--stroke-0, #0F2A71)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                        <path d={svgPaths.p3aac7300} id="Vector_2" stroke="var(--stroke-0, #0F2A71)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                        <path d="M9.99729 8.99695H7.99729" id="Vector_3" stroke="var(--stroke-0, #0F2A71)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                        <path d="M15.9946 12.9956H7.99729" id="Vector_4" stroke="var(--stroke-0, #0F2A71)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                        <path d="M15.9946 16.9942H7.99729" id="Vector_5" stroke="var(--stroke-0, #0F2A71)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                      </Icon>
                    </Wrapper4>
                    <Wrapper additionalClassNames="h-[20.001px] w-[129.101px]">
                      <p className="absolute font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[20px] left-[65px] text-[#111] text-[14px] text-center text-nowrap top-[-0.3px] translate-x-[-50%]">Create Assignment</p>
                    </Wrapper>
                  </div>
                  <div className="absolute bg-white content-stretch flex flex-col gap-[7.994px] h-[129.385px] items-center left-[178.66px] px-[0.7px] py-[16.698px] rounded-[16px] top-0 w-[166.675px]" data-name="Button">
                    <div aria-hidden="true" className="absolute border-[#e8e8e8] border-[0.7px] border-solid inset-0 pointer-events-none rounded-[16px]" />
                    <div className="basis-0 bg-[rgba(251,188,4,0.08)] grow min-h-px min-w-px relative rounded-[2.34832e+07px] shrink-0 w-[47.995px]" data-name="Container">
                      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-0 pr-[0.011px] py-0 relative size-full">
                        <Icon>
                          <path d={svgPaths.p3fbf4300} id="Vector" stroke="var(--stroke-0, #FBBC04)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                          <path d={svgPaths.peaac500} id="Vector_2" stroke="var(--stroke-0, #FBBC04)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                        </Icon>
                      </div>
                    </div>
                    <Wrapper additionalClassNames="h-[40.001px] w-[133.278px]">
                      <p className="absolute font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[20px] left-[67.13px] text-[#111] text-[14px] text-center top-[-0.3px] translate-x-[-50%] w-[105px]">New Announcement</p>
                    </Wrapper>
                  </div>
                  <div className="absolute bg-white content-stretch flex flex-col gap-[7.994px] h-[109.385px] items-center left-0 px-[0.7px] py-[16.698px] rounded-[16px] top-[141.38px] w-[166.664px]" data-name="Button">
                    <div aria-hidden="true" className="absolute border-[#e8e8e8] border-[0.7px] border-solid inset-0 pointer-events-none rounded-[16px]" />
                    <Wrapper4 additionalClassNames="bg-[rgba(52,87,213,0.08)]">
                      <Icon>
                        <path d={svgPaths.p176aa380} id="Vector" stroke="var(--stroke-0, #3457D5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                        <path d={svgPaths.p25149f00} id="Vector_2" stroke="var(--stroke-0, #3457D5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                        <path d="M11.9959 10.9963H15.9946" id="Vector_3" stroke="var(--stroke-0, #3457D5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                        <path d="M11.9959 15.9946H15.9946" id="Vector_4" stroke="var(--stroke-0, #3457D5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                        <path d="M7.99729 10.9963H8.00729" id="Vector_5" stroke="var(--stroke-0, #3457D5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                        <path d="M7.99729 15.9946H8.00729" id="Vector_6" stroke="var(--stroke-0, #3457D5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                      </Icon>
                    </Wrapper4>
                    <Wrapper additionalClassNames="h-[20.001px] w-[79.477px]">
                      <p className="absolute font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[20px] left-[40px] text-[#111] text-[14px] text-center text-nowrap top-[-0.3px] translate-x-[-50%]">Create Quiz</p>
                    </Wrapper>
                  </div>
                  <div className="absolute bg-white content-stretch flex flex-col gap-[7.994px] h-[109.385px] items-center left-[178.66px] px-[0.7px] py-[16.698px] rounded-[16px] top-[141.38px] w-[166.675px]" data-name="Button">
                    <div aria-hidden="true" className="absolute border-[#e8e8e8] border-[0.7px] border-solid inset-0 pointer-events-none rounded-[16px]" />
                    <Wrapper4 additionalClassNames="bg-[rgba(16,185,129,0.08)]">
                      <Icon>
                        <path d={svgPaths.p8c10b0} id="Vector" stroke="var(--stroke-0, #10B981)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                        <path d={svgPaths.p96b75c0} id="Vector_2" stroke="var(--stroke-0, #10B981)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                      </Icon>
                    </Wrapper4>
                    <Wrapper additionalClassNames="h-[20.001px] w-[130.151px]">
                      <p className="absolute font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[20px] left-[65.5px] text-[#111] text-[14px] text-center text-nowrap top-[-0.3px] translate-x-[-50%]">Grade Submissions</p>
                    </Wrapper>
                  </div>
                </div>
              </Container>
              <Container additionalClassNames="h-[379.135px]">
                <div className="h-[26.999px] relative shrink-0 w-full" data-name="Heading 2">
                  <p className="absolute font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[27px] left-0 text-[#111] text-[18px] text-nowrap top-[-0.6px]">Recent Activity</p>
                </div>
                <div className="content-stretch flex flex-col gap-[11.996px] h-[340.14px] items-start relative shrink-0 w-full" data-name="Container">
                  <Container1>
                    <div className="content-stretch flex gap-[11.996px] h-[71.987px] items-start relative shrink-0 w-full" data-name="Container">
                      <Wrapper5 additionalClassNames="bg-[#0f2a71]">
                        <Icon1>
                          <path d={svgPaths.p278d4f80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49995" />
                          <path d={svgPaths.p3116900} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49995" />
                          <path d="M7.5 6.75H6" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49995" />
                          <path d="M11.9998 9.74965H5.99979" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49995" />
                          <path d="M11.9998 12.7495H5.99979" id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49995" />
                        </Icon1>
                      </Wrapper5>
                      <Container2>
                        <HeadingText text="Database ERD Assignment" />
                        <ParagraphText1 text="Submitted by 8 students" />
                        <ParagraphText2 text="2 hours ago" />
                      </Container2>
                    </div>
                  </Container1>
                  <Container1>
                    <div className="content-stretch flex gap-[11.996px] h-[71.987px] items-start relative shrink-0 w-full" data-name="Container">
                      <Wrapper5 additionalClassNames="bg-[#3457d5]">
                        <Icon1>
                          <path d={svgPaths.p22c79200} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49995" />
                          <path d={svgPaths.p173d700} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49995" />
                          <path d="M8.99968 8.24971H11.9997" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49995" />
                          <path d="M8.99968 11.9996H11.9997" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49995" />
                          <path d="M5.99979 8.24971H6.00729" id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49995" />
                          <path d="M5.99979 11.9996H6.00729" id="Vector_6" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49995" />
                        </Icon1>
                      </Wrapper5>
                      <Container2>
                        <HeadingText text="UML Diagrams Quiz" />
                        <ParagraphText1 text="Completed by 15 students" />
                        <ParagraphText2 text="5 hours ago" />
                      </Container2>
                    </div>
                  </Container1>
                  <Container1>
                    <div className="content-stretch flex gap-[11.996px] h-[71.987px] items-start relative shrink-0 w-full" data-name="Container">
                      <Wrapper5 additionalClassNames="bg-[#fbbc04]">
                        <Icon1>
                          <path d={svgPaths.p2a4e9380} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49995" />
                          <path d={svgPaths.p2ac55e70} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49995" />
                        </Icon1>
                      </Wrapper5>
                      <Container2>
                        <HeadingText text="Lab Session Schedule" />
                        <ParagraphText1 text="Published" />
                        <ParagraphText2 text="1 day ago" />
                      </Container2>
                    </div>
                  </Container1>
                </div>
              </Container>
            </div>
          </div>
        </div>
        <div className="bg-[rgba(255,255,255,0.8)] h-[79.991px] relative shrink-0 w-[393.318px]" data-name="BottomNav">
          <div aria-hidden="true" className="absolute border-[0.7px_0px_0px] border-black border-solid inset-0 pointer-events-none" />
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pb-0 pl-[30.52px] pr-[30.531px] pt-[0.7px] relative size-full">
            <Wrapper2 additionalClassNames="bg-[#0f2a71]">
              <Icon>
                <path d={svgPaths.p1def1100} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                <path d={svgPaths.p33cbaa00} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
              </Icon>
            </Wrapper2>
            <Wrapper2>
              <Icon>
                <path d={svgPaths.p36cfae00} id="Vector" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                <path d={svgPaths.p1f3dfc40} id="Vector_2" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                <path d="M9.99729 8.99695H7.99729" id="Vector_3" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                <path d="M15.9946 12.9956H7.99729" id="Vector_4" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                <path d="M15.9946 16.9942H7.99729" id="Vector_5" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
              </Icon>
            </Wrapper2>
            <Wrapper2>
              <Icon>
                <path d={svgPaths.p3fbf4300} id="Vector" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                <path d={svgPaths.peaac500} id="Vector_2" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
              </Icon>
            </Wrapper2>
            <Wrapper2>
              <Icon>
                <path d={svgPaths.p20112b40} id="Vector" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                <path d={svgPaths.p26bbb480} id="Vector_2" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                <path d="M11.9959 10.9963H15.9946" id="Vector_3" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                <path d="M11.9959 15.9946H15.9946" id="Vector_4" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                <path d="M7.9973 10.9963H8.0073" id="Vector_5" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                <path d="M7.9973 15.9946H8.0073" id="Vector_6" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
              </Icon>
            </Wrapper2>
            <Wrapper2>
              <Icon>
                <path d={svgPaths.p4d52ae0} id="Vector" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                <path d={svgPaths.p1fa5b180} id="Vector_2" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
              </Icon>
            </Wrapper2>
          </div>
        </div>
      </div>
    </div>
  );
}