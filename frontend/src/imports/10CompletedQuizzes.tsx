import svgPaths from "./svg-oj9r1jk9zc";
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

function ContainerBackgroundImage2({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="bg-white h-[246.338px] relative rounded-[16px] shrink-0 w-full">
      <div className="overflow-clip relative rounded-[inherit] size-full">{children}</div>
      <div aria-hidden="true" className="absolute border-[#e8e8e8] border-[0.7px] border-solid inset-0 pointer-events-none rounded-[16px]" />
    </div>
  );
}
type ContainerBackgroundImage1Props = {
  additionalClassNames?: string;
};

function ContainerBackgroundImage1({ children, additionalClassNames = "" }: React.PropsWithChildren<ContainerBackgroundImage1Props>) {
  return (
    <div className={clsx("h-[23.992px] relative shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.994px] items-center relative size-full">{children}</div>
    </div>
  );
}
type ContainerBackgroundImageProps = {
  additionalClassNames?: string;
};

function ContainerBackgroundImage({ children, additionalClassNames = "" }: React.PropsWithChildren<ContainerBackgroundImageProps>) {
  return (
    <div className={clsx("h-[23.992px] relative shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[5.992px] items-center relative size-full">{children}</div>
    </div>
  );
}

function BackgroundImage1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="h-[23.992px] relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">{children}</div>
    </div>
  );
}
type BackgroundImageProps = {
  additionalClassNames?: string;
};

function BackgroundImage({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImageProps>) {
  return (
    <div className={clsx("basis-0 grow h-[39.979px] min-h-px min-w-px relative rounded-[8px] shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">{children}</div>
    </div>
  );
}

function IconBackgroundImage2({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[23.992px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.9919 23.9919">
        <g id="Icon">{children}</g>
      </svg>
    </div>
  );
}
type ButtonBackgroundImageAndTextProps = {
  text: string;
};

function ButtonBackgroundImageAndText({ text }: ButtonBackgroundImageAndTextProps) {
  return (
    <div className="absolute bg-white border-[#e8e8e8] border-[0.7px] border-solid h-[47.995px] left-[12px] rounded-[12px] top-[164.95px] w-[299.942px]">
      <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[24px] left-[149.63px] text-[#0f2a71] text-[16px] text-center text-nowrap top-[10.7px] translate-x-[-50%]">{text}</p>
    </div>
  );
}
type TextBackgroundImageAndText2Props = {
  text: string;
  additionalClassNames?: string;
};

function TextBackgroundImageAndText2({ text, additionalClassNames = "" }: TextBackgroundImageAndText2Props) {
  return (
    <BackgroundImage1 additionalClassNames={additionalClassNames}>
      <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#00a63e] text-[16px] text-nowrap top-[-0.6px]">{text}</p>
    </BackgroundImage1>
  );
}

function IconBackgroundImage1() {
  return (
    <div className="relative shrink-0 size-[18px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_26_7979)" id="Icon">
          <path d={svgPaths.pa641000} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49995" />
          <path d="M6.75 8.25L9 10.5L16.5 3" id="Vector_2" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49995" />
        </g>
        <defs>
          <clipPath id="clip0_26_7979">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}
type TextBackgroundImageAndText1Props = {
  text: string;
  additionalClassNames?: string;
};

function TextBackgroundImageAndText1({ text, additionalClassNames = "" }: TextBackgroundImageAndText1Props) {
  return (
    <BackgroundImage1 additionalClassNames={additionalClassNames}>
      <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#6b6b6b] text-[16px] top-[-0.6px] w-[146px]">{text}</p>
    </BackgroundImage1>
  );
}
type TextBackgroundImageAndTextProps = {
  text: string;
  additionalClassNames?: string;
};

function TextBackgroundImageAndText({ text, additionalClassNames = "" }: TextBackgroundImageAndTextProps) {
  return (
    <BackgroundImage1 additionalClassNames={additionalClassNames}>
      <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#6b6b6b] text-[16px] text-nowrap top-[-0.6px]">{text}</p>
    </BackgroundImage1>
  );
}

function IconBackgroundImage() {
  return (
    <div className="relative shrink-0 size-[15.998px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9982 15.9982">
        <g clipPath="url(#clip0_12_1154)" id="Icon">
          <path d={svgPaths.p2698ec00} id="Vector" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33318" />
          <path d={svgPaths.p251b0b00} id="Vector_2" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33318" />
        </g>
        <defs>
          <clipPath id="clip0_12_1154">
            <rect fill="white" height="15.9982" width="15.9982" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}
type HeadingBackgroundImageAndTextProps = {
  text: string;
};

function HeadingBackgroundImageAndText({ text }: HeadingBackgroundImageAndTextProps) {
  return (
    <div className="absolute h-[23.992px] left-[12px] top-[28.99px] w-[299.942px]">
      <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#111] text-[16px] text-nowrap top-[-0.6px]">{text}</p>
    </div>
  );
}
type ParagraphBackgroundImageAndTextProps = {
  text: string;
};

function ParagraphBackgroundImageAndText({ text }: ParagraphBackgroundImageAndTextProps) {
  return (
    <div className="absolute h-[20.996px] left-[12px] top-0 w-[299.942px]">
      <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[21px] left-0 text-[#6b6b6b] text-[14px] text-nowrap top-[0.4px]">{text}</p>
    </div>
  );
}

export default function Component10CompletedQuizzes() {
  return (
    <div className="relative size-full" data-name="10 - Completed Quizzes">
      <div className="absolute bg-white content-stretch flex flex-col gap-[0.7px] h-[852px] items-start left-0 overflow-clip top-0 w-[393px]" data-name="10 - Completed Quizzes">
        <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[393.318px]" data-name="Container">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
            <div className="absolute bg-white content-stretch flex flex-col gap-[11.996px] h-[771.731px] items-start left-0 pb-0 pt-[136.646px] px-[23.992px] top-0 w-[393.318px]" data-name="QuizList">
              <ContainerBackgroundImage2>
                <div className="absolute h-[212.941px] left-[16.7px] top-[16.7px] w-[311.938px]" data-name="Container">
                  <ParagraphBackgroundImageAndText text="Database Systems" />
                  <HeadingBackgroundImageAndText text="Database Normalization Quiz" />
                  <div className="absolute content-stretch flex gap-[15.998px] h-[23.992px] items-center left-[12px] top-[64.98px] w-[299.942px]" data-name="Container">
                    <ContainerBackgroundImage additionalClassNames="w-[106.421px]">
                      <IconBackgroundImage />
                      <TextBackgroundImageAndText text="20 minutes" additionalClassNames="w-[84.431px]" />
                    </ContainerBackgroundImage>
                    <TextBackgroundImageAndText1 text="3 attempts allowed" additionalClassNames="w-[145.416px]" />
                  </div>
                  <div className="absolute bg-[#f0fdf4] content-stretch flex h-[47.984px] items-center justify-between left-[12px] px-[11.996px] py-0 rounded-[12px] top-[100.96px] w-[299.942px]" data-name="Container">
                    <ContainerBackgroundImage1 additionalClassNames="w-[114.459px]">
                      <IconBackgroundImage1 />
                      <div className="h-[23.992px] relative shrink-0 w-[88.466px]" data-name="Text">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                          <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#008236] text-[16px] top-[-0.6px] w-[89px]">Score: 85%</p>
                        </div>
                      </div>
                    </ContainerBackgroundImage1>
                    <TextBackgroundImageAndText2 text="Dec 20, 2025" additionalClassNames="w-[103.152px]" />
                  </div>
                  <ButtonBackgroundImageAndText text="Review Answers" />
                </div>
                <div className="absolute bg-[#10b981] h-[244.938px] left-[0.7px] rounded-bl-[16px] rounded-tl-[16px] top-[0.7px] w-[3.991px]" data-name="Container" />
              </ContainerBackgroundImage2>
              <ContainerBackgroundImage2>
                <div className="absolute h-[212.941px] left-[16.7px] top-[16.7px] w-[311.938px]" data-name="Container">
                  <ParagraphBackgroundImageAndText text="Enterprise Architecture" />
                  <HeadingBackgroundImageAndText text="Enterprise Architecture Concepts" />
                  <div className="absolute content-stretch flex gap-[15.998px] h-[23.992px] items-center left-[12px] top-[64.98px] w-[299.942px]" data-name="Container">
                    <ContainerBackgroundImage additionalClassNames="w-[106.903px]">
                      <IconBackgroundImage />
                      <TextBackgroundImageAndText text="40 minutes" additionalClassNames="w-[84.912px]" />
                    </ContainerBackgroundImage>
                    <TextBackgroundImageAndText1 text="2 attempts allowed" additionalClassNames="w-[145.274px]" />
                  </div>
                  <div className="absolute bg-[#f0fdf4] content-stretch flex h-[47.984px] items-center justify-between left-[12px] px-[11.996px] py-0 rounded-[12px] top-[100.96px] w-[299.942px]" data-name="Container">
                    <ContainerBackgroundImage1 additionalClassNames="w-[113.704px]">
                      <IconBackgroundImage1 />
                      <div className="basis-0 grow h-[23.992px] min-h-px min-w-px relative shrink-0" data-name="Text">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                          <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#008236] text-[16px] top-[-0.6px] w-[88px]">Score: 92%</p>
                        </div>
                      </div>
                    </ContainerBackgroundImage1>
                    <TextBackgroundImageAndText2 text="Dec 18, 2025" additionalClassNames="w-[97.826px]" />
                  </div>
                  <ButtonBackgroundImageAndText text="Review Answers" />
                </div>
                <div className="absolute bg-[#10b981] h-[244.938px] left-[0.7px] rounded-bl-[16px] rounded-tl-[16px] top-[0.7px] w-[3.991px]" data-name="Container" />
              </ContainerBackgroundImage2>
            </div>
            <div className="absolute bg-white content-stretch flex flex-col gap-[15.998px] h-[119.948px] items-start left-0 pb-[0.7px] pt-[15.998px] px-[23.992px] top-0 w-[393.318px]" data-name="QuizList">
              <div aria-hidden="true" className="absolute border-[0px_0px_0.7px] border-black border-solid inset-0 pointer-events-none" />
              <div className="h-[23.992px] relative shrink-0 w-full" data-name="HEADING QUIZ">
                <div className="absolute h-[52px] left-[-28.99px] rounded-bl-[30px] top-[-20px] w-[404px]" style={{ backgroundImage: "linear-gradient(42.8103deg, rgb(15, 42, 113) 45.385%, rgb(251, 188, 4) 122.33%)" }} />
                <p className="absolute font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[24px] left-0 text-[16px] text-nowrap text-white top-[-0.6px]">Quizzes</p>
              </div>
              <div className="bg-[#f3f3f3] h-[47.962px] relative rounded-[12px] shrink-0 w-full" data-name="Container">
                <div className="size-full">
                  <div className="content-stretch flex gap-[3.991px] items-start pb-0 pt-[3.991px] px-[3.991px] relative size-full">
                    <BackgroundImage>
                      <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[24px] left-[54.94px] text-[#6b6b6b] text-[16px] text-center text-nowrap top-[7.39px] translate-x-[-50%]">Upcoming</p>
                    </BackgroundImage>
                    <BackgroundImage>
                      <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[24px] left-[55.12px] text-[#6b6b6b] text-[16px] text-center text-nowrap top-[7.39px] translate-x-[-50%]">Active</p>
                    </BackgroundImage>
                    <BackgroundImage additionalClassNames="bg-white shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]">
                      <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[24px] left-[54.94px] text-[#0f2a71] text-[16px] text-center text-nowrap top-[7.39px] translate-x-[-50%]">Completed</p>
                    </BackgroundImage>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[rgba(255,255,255,0.8)] h-[79.991px] relative shrink-0 w-[393.318px]" data-name="BottomNav">
          <div aria-hidden="true" className="absolute border-[0.7px_0px_0px] border-black border-solid inset-0 pointer-events-none" />
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pb-0 pl-[30.52px] pr-[30.531px] pt-[0.7px] relative size-full">
            <ButtonBackgroundImage>
              <IconBackgroundImage2>
                <path d={svgPaths.p1def1100} id="Vector" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                <path d={svgPaths.p33cbaa00} id="Vector_2" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
              </IconBackgroundImage2>
            </ButtonBackgroundImage>
            <ButtonBackgroundImage>
              <IconBackgroundImage2>
                <path d={svgPaths.p36cfae00} id="Vector" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                <path d={svgPaths.p1f3dfc40} id="Vector_2" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                <path d="M9.99729 8.99695H7.99729" id="Vector_3" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                <path d="M15.9946 12.9956H7.99729" id="Vector_4" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                <path d="M15.9946 16.9942H7.99729" id="Vector_5" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
              </IconBackgroundImage2>
            </ButtonBackgroundImage>
            <ButtonBackgroundImage additionalClassNames="bg-[#0f2a71]">
              <IconBackgroundImage2>
                <path d={svgPaths.p176aa380} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                <path d={svgPaths.p25149f00} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                <path d="M11.9959 10.9963H15.9946" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                <path d="M11.9959 15.9946H15.9946" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                <path d="M7.99729 10.9963H8.00729" id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                <path d="M7.99729 15.9946H8.00729" id="Vector_6" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
              </IconBackgroundImage2>
            </ButtonBackgroundImage>
            <ButtonBackgroundImage>
              <IconBackgroundImage2>
                <path d={svgPaths.p1009ca00} id="Vector" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
              </IconBackgroundImage2>
            </ButtonBackgroundImage>
            <ButtonBackgroundImage>
              <IconBackgroundImage2>
                <path d={svgPaths.p4d52ae0} id="Vector" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                <path d={svgPaths.p1fa5b180} id="Vector_2" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
              </IconBackgroundImage2>
            </ButtonBackgroundImage>
          </div>
        </div>
      </div>
    </div>
  );
}