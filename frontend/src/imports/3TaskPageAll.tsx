import svgPaths from "./svg-5peggibobt";
import clsx from "clsx";
type ButtonBackgroundImageProps = {
  additionalClassNames?: string;
};

function ButtonBackgroundImage({ children, additionalClassNames = "" }: React.PropsWithChildren<ButtonBackgroundImageProps>) {
  return (
    <div className={clsx("relative rounded-[2.34832e+07px] shrink-0 size-[55.999px]", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-0 pr-[0.011px] py-0 relative size-full">{children}</div>
    </div>
  );
}
type BackgroundImage7Props = {
  additionalClassNames?: string;
};

function BackgroundImage7({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage7Props>) {
  return (
    <div className={clsx("h-[31.975px] relative rounded-[999px] shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[11.996px] pr-0 py-0 relative size-full">{children}</div>
    </div>
  );
}
type BackgroundImage6Props = {
  additionalClassNames?: string;
};

function BackgroundImage6({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage6Props>) {
  return (
    <div className={additionalClassNames}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">{children}</div>
    </div>
  );
}
type BackgroundImage5Props = {
  additionalClassNames?: string;
};

function BackgroundImage5({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage5Props>) {
  return <BackgroundImage6 additionalClassNames={clsx("h-[23.992px] relative shrink-0", additionalClassNames)}>{children}</BackgroundImage6>;
}
type BackgroundImage4Props = {
  additionalClassNames?: string;
};

function BackgroundImage4({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage4Props>) {
  return <BackgroundImage6 additionalClassNames={clsx("h-[39.979px] relative rounded-[999px] shrink-0", additionalClassNames)}>{children}</BackgroundImage6>;
}
type BackgroundImage3Props = {
  additionalClassNames?: string;
};

function BackgroundImage3({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage3Props>) {
  return <BackgroundImage6 additionalClassNames={clsx("basis-0 grow min-h-px min-w-px relative shrink-0", additionalClassNames)}>{children}</BackgroundImage6>;
}
type BackgroundImage2Props = {
  additionalClassNames?: string;
};

function BackgroundImage2({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage2Props>) {
  return (
    <div className={additionalClassNames}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[7.994px] items-end relative size-full">{children}</div>
    </div>
  );
}
type BackgroundImage1Props = {
  additionalClassNames?: string;
};

function BackgroundImage1({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage1Props>) {
  return <BackgroundImage2 additionalClassNames={clsx("h-[59.958px] relative shrink-0", additionalClassNames)}>{children}</BackgroundImage2>;
}

function BackgroundImage({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[13.997px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.9971 13.9971">
        {children}
      </svg>
    </div>
  );
}

function IconBackgroundImage3({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[23.992px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.9919 23.9919">
        <g id="Icon">{children}</g>
      </svg>
    </div>
  );
}

function IconBackgroundImage2() {
  return (
    <BackgroundImage>
      <g clipPath="url(#clip0_25_6513)" id="Icon">
        <path d={svgPaths.p378c8600} id="Vector" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16642" />
        <path d={svgPaths.p19885400} id="Vector_2" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16642" />
      </g>
      <defs>
        <clipPath id="clip0_25_6513">
          <rect fill="white" height="13.9971" width="13.9971" />
        </clipPath>
      </defs>
    </BackgroundImage>
  );
}
type HeadingBackgroundImageAndTextProps = {
  text: string;
  additionalClassNames?: string;
};

function HeadingBackgroundImageAndText({ text, additionalClassNames = "" }: HeadingBackgroundImageAndTextProps) {
  return (
    <div className={clsx("absolute h-[23.992px] left-0 overflow-clip top-[39.97px]", additionalClassNames)}>
      <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#111] text-[16px] text-nowrap top-[-0.6px]">{text}</p>
    </div>
  );
}
type ContainerBackgroundImage1Props = {
  additionalClassNames?: string;
};

function ContainerBackgroundImage1({ additionalClassNames = "" }: ContainerBackgroundImage1Props) {
  return (
    <BackgroundImage2 additionalClassNames={clsx("h-[59.958px] relative shrink-0 w-[104.967px]", additionalClassNames)}>
      <div className="bg-[#fef9c2] h-[31.975px] relative rounded-[999px] shrink-0 w-[104.967px]">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center px-[11.996px] py-0 relative size-full">
          <BackgroundImage3 additionalClassNames="h-[23.992px]">
            <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#a65f00] text-[16px] text-nowrap top-[-0.6px]">{"Submitted"}</p>
          </BackgroundImage3>
        </div>
      </div>
      <IconBackgroundImage1 />
    </BackgroundImage2>
  );
}

function ContainerBackgroundImage() {
  return (
    <BackgroundImage1 additionalClassNames="w-[71.527px]">
      <BackgroundImage7 additionalClassNames="bg-[#dbeafe] w-[71.527px]">
        <BackgroundImage5 additionalClassNames="w-[47.535px]">
          <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#1447e6] text-[16px] text-nowrap top-[-0.6px]">{"Active"}</p>
        </BackgroundImage5>
      </BackgroundImage7>
      <IconBackgroundImage1 />
    </BackgroundImage1>
  );
}

function IconBackgroundImage1() {
  return (
    <div className="relative shrink-0 size-[19.99px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9896 19.9896">
        <g id="Icon">
          <path d={svgPaths.p322b00c4} id="Vector" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6658" />
        </g>
      </svg>
    </div>
  );
}
type BackgroundImageAndTextProps = {
  text: string;
  additionalClassNames?: string;
};

function BackgroundImageAndText({ text, additionalClassNames = "" }: BackgroundImageAndTextProps) {
  return (
    <div className={clsx("absolute h-[23.992px] left-[7.99px] top-[3.99px]", additionalClassNames)}>
      <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#6b6b6b] text-[16px] text-nowrap top-[-0.6px]">{text}</p>
    </div>
  );
}
type TextBackgroundImageAndTextProps = {
  text: string;
  additionalClassNames?: string;
};

function TextBackgroundImageAndText({ text, additionalClassNames = "" }: TextBackgroundImageAndTextProps) {
  return (
    <BackgroundImage6 additionalClassNames={clsx("h-[23.992px] relative shrink-0", additionalClassNames)}>
      <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#6b6b6b] text-[16px] text-nowrap top-[-0.6px]">{text}</p>
    </BackgroundImage6>
  );
}

function IconBackgroundImage() {
  return (
    <BackgroundImage>
      <g clipPath="url(#clip0_25_6517)" id="Icon">
        <path d={svgPaths.p378c8600} id="Vector" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16642" />
        <path d={svgPaths.pa0adc0} id="Vector_2" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16642" />
      </g>
      <defs>
        <clipPath id="clip0_25_6517">
          <rect fill="white" height="13.9971" width="13.9971" />
        </clipPath>
      </defs>
    </BackgroundImage>
  );
}

export default function Component3TaskPageAll() {
  return (
    <div className="relative size-full" data-name="3 - Task Page All">
      <div className="absolute bg-white content-stretch flex flex-col gap-[0.7px] h-[852px] items-start left-0 overflow-clip top-0 w-[393px]" data-name="3 - Task Page">
        <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[393.318px]" data-name="Container">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
            <div className="absolute bg-white content-stretch flex flex-col gap-[11.996px] h-[771px] items-start left-0 overflow-x-clip overflow-y-auto pb-0 pt-[192.657px] px-[23.992px] top-0 w-[393px]" data-name="TasksList">
              <div className="bg-white h-[129.342px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
                <div aria-hidden="true" className="absolute border-[#e8e8e8] border-[0.7px] border-solid inset-0 pointer-events-none rounded-[16px]" />
                <div className="absolute content-stretch flex h-[95.946px] items-start justify-between left-[16.7px] top-[16.7px] w-[311.938px]" data-name="Container">
                  <BackgroundImage3 additionalClassNames="h-[95.946px]">
                    <div className="absolute bg-[#f3f3f3] h-[31.975px] left-0 rounded-[999px] top-0 w-[207.419px]" data-name="Container">
                      <div className="absolute h-[23.992px] left-[7.99px] top-[3.99px] w-[191.432px]" data-name="Text">
                        <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#6b6b6b] text-[16px] text-nowrap top-[-0.6px]">{`System Analysis & Design`}</p>
                      </div>
                    </div>
                    <div className="absolute h-[24px] left-[0.31px] overflow-clip top-[39.65px] w-[259px]" data-name="Heading 4">
                      <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#111] text-[16px] top-[-0.6px] w-[238px]">UML Class Diagram Assignment</p>
                    </div>
                    <div className="absolute content-stretch flex gap-[7.994px] h-[23.992px] items-center left-0 top-[71.95px] w-[228.415px]" data-name="Container">
                      <IconBackgroundImage />
                      <TextBackgroundImageAndText text="Tomorrow, 11:59 PM" additionalClassNames="w-[145.077px]" />
                    </div>
                  </BackgroundImage3>
                  <ContainerBackgroundImage />
                </div>
              </div>
              <div className="bg-white h-[129.342px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
                <div aria-hidden="true" className="absolute border-[#e8e8e8] border-[0.7px] border-solid inset-0 pointer-events-none rounded-[16px]" />
                <div className="absolute content-stretch flex h-[95.946px] items-start left-[16.7px] pl-0 pr-[41px] py-0 top-[16.7px] w-[311.938px]" data-name="Container">
                  <BackgroundImage3 additionalClassNames="h-[95.946px] mr-[-41px]">
                    <div className="absolute bg-[#f3f3f3] h-[31.975px] left-0 rounded-[999px] top-0 w-[179.578px]" data-name="Container">
                      <BackgroundImageAndText text="Software Engineering" additionalClassNames="w-[163.591px]" />
                    </div>
                    <div className="absolute h-[23.992px] left-0 overflow-clip top-[39.97px] w-[194.975px]" data-name="Heading 4">
                      <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#111] text-[16px] top-[-0.6px] w-[255px]">Requirements Engineering Report</p>
                    </div>
                    <div className="absolute content-stretch flex gap-[7.994px] h-[23.992px] items-center left-0 top-[71.95px] w-[194.975px]" data-name="Container">
                      <IconBackgroundImage />
                      <TextBackgroundImageAndText text="Dec 28, 2025" additionalClassNames="w-[101.49px]" />
                    </div>
                  </BackgroundImage3>
                  <ContainerBackgroundImage1 additionalClassNames="mr-[-41px]" />
                </div>
              </div>
              <div className="bg-white h-[161.327px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
                <div aria-hidden="true" className="absolute border-[#e8e8e8] border-[0.7px] border-solid inset-0 pointer-events-none rounded-[16px]" />
                <div className="absolute content-stretch flex h-[127.931px] items-start justify-between left-[16.7px] top-[16.7px] w-[311.938px]" data-name="Container">
                  <BackgroundImage3 additionalClassNames="h-[127.931px]">
                    <div className="absolute bg-[#f3f3f3] h-[31.975px] left-0 rounded-[999px] top-0 w-[157.872px]" data-name="Container">
                      <BackgroundImageAndText text="Database Systems" additionalClassNames="w-[141.884px]" />
                    </div>
                    <HeadingBackgroundImageAndText text="Database ERD Design" additionalClassNames="w-[217.075px]" />
                    <div className="absolute content-stretch flex gap-[7.994px] h-[23.992px] items-center left-0 top-[71.95px] w-[217.075px]" data-name="Container">
                      <IconBackgroundImage2 />
                      <TextBackgroundImageAndText text="Dec 25, 2025" additionalClassNames="w-[101.293px]" />
                    </div>
                    <div className="absolute h-[20.296px] left-0 top-[105.34px] w-[108.598px]" data-name="Text">
                      <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#0f2a71] text-[16px] top-[-2px] w-[109px]">Score: 95/100</p>
                    </div>
                  </BackgroundImage3>
                  <BackgroundImage1 additionalClassNames="w-[82.867px]">
                    <BackgroundImage7 additionalClassNames="bg-[#dcfce7] w-[82.867px]">
                      <BackgroundImage5 additionalClassNames="w-[58.875px]">
                        <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#008236] text-[16px] text-nowrap top-[-0.6px]">Graded</p>
                      </BackgroundImage5>
                    </BackgroundImage7>
                    <IconBackgroundImage1 />
                  </BackgroundImage1>
                </div>
              </div>
              <div className="bg-white h-[129.342px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
                <div aria-hidden="true" className="absolute border-[#e8e8e8] border-[0.7px] border-solid inset-0 pointer-events-none rounded-[16px]" />
                <div className="absolute content-stretch flex h-[95.946px] items-start justify-between left-[16.7px] top-[16.7px] w-[311.938px]" data-name="Container">
                  <BackgroundImage3 additionalClassNames="h-[95.946px]">
                    <div className="absolute bg-[#f3f3f3] h-[31.975px] left-0 rounded-[999px] top-0 w-[190.743px]" data-name="Container">
                      <BackgroundImageAndText text="Enterprise Architecture" additionalClassNames="w-[174.756px]" />
                    </div>
                    <HeadingBackgroundImageAndText text="Business Process Modeling" additionalClassNames="w-[228.415px]" />
                    <div className="absolute content-stretch flex gap-[7.994px] h-[23.992px] items-center left-0 top-[71.95px] w-[228.415px]" data-name="Container">
                      <IconBackgroundImage2 />
                      <TextBackgroundImageAndText text="Jan 5, 2026" additionalClassNames="w-[84.529px]" />
                    </div>
                  </BackgroundImage3>
                  <ContainerBackgroundImage />
                </div>
              </div>
              <div className="bg-white h-[129.342px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
                <div aria-hidden="true" className="absolute border-[#e8e8e8] border-[0.7px] border-solid inset-0 pointer-events-none rounded-[16px]" />
                <div className="absolute content-stretch flex h-[95.946px] items-start justify-between left-[16.7px] top-[16.7px] w-[311.938px]" data-name="Container">
                  <BackgroundImage3 additionalClassNames="h-[95.946px]">
                    <div className="absolute bg-[#f3f3f3] h-[31.975px] left-0 rounded-[999px] top-0 w-[154.657px]" data-name="Container">
                      <BackgroundImageAndText text="Interaction Design" additionalClassNames="w-[138.669px]" />
                    </div>
                    <div className="absolute h-[23.992px] left-0 overflow-clip top-[39.97px] w-[194.975px]" data-name="Heading 4">
                      <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#111] text-[16px] top-[-0.6px] w-[206px]">UI/UX Wireframe Prototype</p>
                    </div>
                    <div className="absolute content-stretch flex gap-[7.994px] h-[23.992px] items-center left-0 top-[71.95px] w-[194.975px]" data-name="Container">
                      <IconBackgroundImage2 />
                      <TextBackgroundImageAndText text="Dec 30, 2025" additionalClassNames="w-[103.294px]" />
                    </div>
                  </BackgroundImage3>
                  <ContainerBackgroundImage1 />
                </div>
              </div>
            </div>
            <div className="absolute bg-white content-stretch flex flex-col gap-[15.998px] h-[175.959px] items-start left-0 pb-[0.7px] pt-[15.998px] px-[23.992px] top-0 w-[393.318px]" data-name="TasksList">
              <div aria-hidden="true" className="absolute border-[0px_0px_0.7px] border-black border-solid inset-0 pointer-events-none" />
              <div className="h-[23.992px] relative shrink-0 w-full" data-name="HEADING TASK">
                <div className="absolute h-[52px] left-[-28.99px] rounded-bl-[30px] top-[-20px] w-[404px]" style={{ backgroundImage: "linear-gradient(42.8103deg, rgb(15, 42, 113) 45.385%, rgb(251, 188, 4) 122.33%)" }} />
                <p className="absolute font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[24px] left-0 text-[16px] text-nowrap text-white top-[-0.6px]">My Tasks</p>
              </div>
              <div className="h-[47.995px] relative shrink-0 w-full" data-name="Container">
                <div className="absolute bg-[#f3f3f3] h-[47.995px] left-0 rounded-[12px] top-0 w-[345.334px]" data-name="Text Input">
                  <div className="content-stretch flex items-center overflow-clip pl-[48px] pr-[16px] py-0 relative rounded-[inherit] size-full">
                    <p className="font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[16px] text-[rgba(17,17,17,0.5)] text-nowrap">Search tasks...</p>
                  </div>
                  <div aria-hidden="true" className="absolute border-[0.7px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[12px]" />
                </div>
                <div className="absolute left-[16px] size-[18px] top-[14.99px]" data-name="Icon">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
                    <g id="Icon">
                      <path d={svgPaths.p1ed1a4c0} id="Vector" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49995" />
                      <path d={svgPaths.p126da180} id="Vector_2" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49995" />
                    </g>
                  </svg>
                </div>
              </div>
              <div className="content-stretch flex gap-[7.994px] h-[47.973px] items-start overflow-x-auto overflow-y-clip relative shrink-0 w-full" data-name="Container">
                <BackgroundImage4 additionalClassNames="bg-[#0f2a71] w-[49.755px]">
                  <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[24px] left-[25px] text-[16px] text-center text-nowrap text-white top-[7.39px] translate-x-[-50%]">All</p>
                </BackgroundImage4>
                <BackgroundImage4 additionalClassNames="bg-[#f3f3f3] w-[79.532px]">
                  <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[24px] left-[40px] text-[#6b6b6b] text-[16px] text-center text-nowrap top-[7.39px] translate-x-[-50%]">Active</p>
                </BackgroundImage4>
                <BackgroundImage4 additionalClassNames="bg-[#f3f3f3] w-[112.972px]">
                  <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[24px] left-[56.5px] text-[#6b6b6b] text-[16px] text-center text-nowrap top-[7.39px] translate-x-[-50%]">Submitted</p>
                </BackgroundImage4>
                <BackgroundImage4 additionalClassNames="bg-[#f3f3f3] w-[90.872px]">
                  <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[24px] left-[45.5px] text-[#6b6b6b] text-[16px] text-center text-nowrap top-[7.39px] translate-x-[-50%]">Graded</p>
                </BackgroundImage4>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[rgba(255,255,255,0.8)] h-[79.991px] relative shrink-0 w-[393.318px]" data-name="BottomNav">
          <div aria-hidden="true" className="absolute border-[0.7px_0px_0px] border-black border-solid inset-0 pointer-events-none" />
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pb-0 pl-[30.52px] pr-[30.531px] pt-[0.7px] relative size-full">
            <ButtonBackgroundImage>
              <IconBackgroundImage3>
                <path d={svgPaths.p1def1100} id="Vector" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                <path d={svgPaths.p33cbaa00} id="Vector_2" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
              </IconBackgroundImage3>
            </ButtonBackgroundImage>
            <ButtonBackgroundImage additionalClassNames="bg-[#0f2a71]">
              <IconBackgroundImage3>
                <path d={svgPaths.p36cfae00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                <path d={svgPaths.p1f3dfc40} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                <path d="M9.99729 8.99695H7.99729" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                <path d="M15.9946 12.9956H7.99729" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                <path d="M15.9946 16.9942H7.99729" id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
              </IconBackgroundImage3>
            </ButtonBackgroundImage>
            <ButtonBackgroundImage>
              <IconBackgroundImage3>
                <path d={svgPaths.p176aa380} id="Vector" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                <path d={svgPaths.p25149f00} id="Vector_2" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                <path d="M11.9959 10.9963H15.9946" id="Vector_3" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                <path d="M11.9959 15.9946H15.9946" id="Vector_4" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                <path d="M7.99729 10.9963H8.00729" id="Vector_5" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                <path d="M7.99729 15.9946H8.00729" id="Vector_6" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
              </IconBackgroundImage3>
            </ButtonBackgroundImage>
            <ButtonBackgroundImage>
              <IconBackgroundImage3>
                <path d={svgPaths.p1009ca00} id="Vector" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
              </IconBackgroundImage3>
            </ButtonBackgroundImage>
            <ButtonBackgroundImage>
              <IconBackgroundImage3>
                <path d={svgPaths.p4d52ae0} id="Vector" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                <path d={svgPaths.p1fa5b180} id="Vector_2" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
              </IconBackgroundImage3>
            </ButtonBackgroundImage>
          </div>
        </div>
      </div>
    </div>
  );
}