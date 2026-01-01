import svgPaths from "./svg-uc02f73iy7";
import clsx from "clsx";
import imgDesainTanpaJudul231 from "figma:asset/d2c142b27d0f791305df796d3a05ac00499fa40f.png";
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
type BackgroundImage1Props = {
  additionalClassNames?: string;
};

function BackgroundImage1({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage1Props>) {
  return (
    <div className={clsx("h-[23.992px] relative shrink-0", additionalClassNames)}>
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

function IconBackgroundImage({ children }: React.PropsWithChildren<{}>) {
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
    <BackgroundImage>
      <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[24px] left-[54.94px] text-[#6b6b6b] text-[16px] text-center text-nowrap top-[7.39px] translate-x-[-50%]">{text}</p>
    </BackgroundImage>
  );
}

export default function Component7ActiveQuizzes() {
  return (
    <div className="relative size-full" data-name="7 - Active Quizzes">
      <div className="absolute bg-white content-stretch flex flex-col gap-[0.7px] h-[852px] items-start left-0 overflow-clip top-0 w-[393px]" data-name="7 - Active Quizzes">
        <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[393.318px]" data-name="Container">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
            <div className="absolute bg-white border-[#e8e8e8] border-[0.7px] border-solid h-[771.731px] left-0 rounded-[16px] top-0 w-[393.318px]" data-name="QuizList" />
            <div className="absolute bg-white content-stretch flex flex-col h-[81px] items-start left-0 pb-[0.7px] pt-[15.998px] px-[23.992px] top-[392px] w-[393px]" data-name="QuizList">
              <div aria-hidden="true" className="absolute border-[0px_0px_0.7px] border-black border-solid inset-0 pointer-events-none" />
              <div className="bg-[#f3f3f3] h-[47.962px] relative rounded-[12px] shrink-0 w-full" data-name="Container">
                <div className="size-full">
                  <div className="content-stretch flex gap-[3.991px] items-start pb-0 pt-[3.991px] px-[3.991px] relative size-full">
                    <ButtonBackgroundImageAndText text="Upcoming" />
                    <BackgroundImage additionalClassNames="bg-white shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]">
                      <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[24px] left-[55.12px] text-[#0f2a71] text-[16px] text-center text-nowrap top-[7.39px] translate-x-[-50%]">Active</p>
                    </BackgroundImage>
                    <ButtonBackgroundImageAndText text="Completed" />
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute h-[112px] left-0 rounded-bl-[30px] top-[265px] w-[415px]" style={{ backgroundImage: "linear-gradient(38.8153deg, rgb(251, 188, 4) 20.311%, rgb(255, 221, 96) 135.88%)" }} />
            <div className="absolute h-[397px] left-[calc(50%-0.16px)] rounded-br-[40px] top-[-70px] translate-x-[-50%] w-[393px]" data-name="Desain tanpa judul (23) 1">
              <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-br-[40px]">
                <img alt="" className="absolute h-[175.99%] left-0 max-w-none top-[-38.62%] w-full" src={imgDesainTanpaJudul231} />
              </div>
            </div>
            <div className="absolute bg-white border-[#e8e8e8] border-[0.7px] border-solid h-[242.346px] left-[24px] overflow-clip rounded-[16px] top-[492px] w-[345.334px]" data-name="Quiz Container">
              <div className="absolute h-[208.95px] left-[16px] top-[16px] w-[311.938px]" data-name="Container">
                <div className="absolute h-[20.996px] left-[12px] top-0 w-[299.942px]" data-name="Paragraph">
                  <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[21px] left-0 text-[#6b6b6b] text-[14px] text-nowrap top-[0.4px]">Software Engineering</p>
                </div>
                <div className="absolute content-stretch flex h-[47.984px] items-start justify-between left-[12px] top-[28.99px] w-[299.942px]" data-name="Container">
                  <div className="basis-0 grow h-[47.984px] min-h-px min-w-px relative shrink-0" data-name="Heading 3">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                      <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#111] text-[16px] top-[-0.6px] w-[200px]">Requirements Engineering Fundamentals</p>
                    </div>
                  </div>
                  <div className="bg-[rgba(59,130,246,0.1)] h-[25.971px] relative rounded-[2.34832e+07px] shrink-0 w-[59.827px]" data-name="Text">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                      <p className="absolute font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[18px] left-[12px] text-[#3b82f6] text-[12px] text-nowrap top-[2.69px]">active</p>
                    </div>
                  </div>
                </div>
                <div className="absolute content-stretch flex gap-[15.998px] h-[23.992px] items-center left-[12px] top-[88.97px] w-[299.942px]" data-name="Container">
                  <div className="h-[23.992px] relative shrink-0 w-[106.564px]" data-name="Container">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[5.992px] items-center relative size-full">
                      <div className="relative shrink-0 size-[15.998px]" data-name="Icon">
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
                      <BackgroundImage1 additionalClassNames="w-[84.573px]">
                        <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#6b6b6b] text-[16px] text-nowrap top-[-0.6px]">30 minutes</p>
                      </BackgroundImage1>
                    </div>
                  </div>
                  <BackgroundImage1 additionalClassNames="w-[145.274px]">
                    <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#6b6b6b] text-[16px] top-[-0.6px] w-[146px]">2 attempts allowed</p>
                  </BackgroundImage1>
                </div>
                <div className="absolute h-[20.001px] left-[12px] top-[124.96px] w-[299.942px]" data-name="Paragraph">
                  <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#f97316] text-[14px] top-[-0.3px] w-[193px]">Available until Today, 11:59 PM</p>
                </div>
                <div className="absolute bg-[#0f2a71] h-[47.995px] left-[12px] rounded-[12px] top-[160.96px] w-[299.942px]" data-name="Button">
                  <div className="absolute left-[100px] size-[18px] top-[14.99px]" data-name="Icon">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
                      <g id="Icon">
                        <path d={svgPaths.p53dc700} fill="var(--fill-0, white)" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49995" />
                      </g>
                    </svg>
                  </div>
                  <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[24px] left-[163px] text-[16px] text-center text-nowrap text-white top-[11.4px] translate-x-[-50%]">Start Quiz</p>
                </div>
              </div>
              <div className="absolute bg-[#0f2a71] h-[240.946px] left-0 rounded-bl-[16px] rounded-tl-[16px] top-0 w-[3.991px]" data-name="Container" />
            </div>
            <p className="absolute font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[24px] left-[28px] text-[16px] text-nowrap text-white top-[338px]">Quizzes</p>
          </div>
        </div>
        <div className="bg-[rgba(255,255,255,0.8)] h-[79.991px] relative shrink-0 w-[393.318px]" data-name="BottomNav">
          <div aria-hidden="true" className="absolute border-[0.7px_0px_0px] border-black border-solid inset-0 pointer-events-none" />
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pb-0 pl-[30.52px] pr-[30.531px] pt-[0.7px] relative size-full">
            <ButtonBackgroundImage>
              <IconBackgroundImage>
                <path d={svgPaths.p1def1100} id="Vector" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                <path d={svgPaths.p33cbaa00} id="Vector_2" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
              </IconBackgroundImage>
            </ButtonBackgroundImage>
            <ButtonBackgroundImage>
              <IconBackgroundImage>
                <path d={svgPaths.p36cfae00} id="Vector" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                <path d={svgPaths.p1f3dfc40} id="Vector_2" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                <path d="M9.99729 8.99695H7.99729" id="Vector_3" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                <path d="M15.9946 12.9956H7.99729" id="Vector_4" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                <path d="M15.9946 16.9942H7.99729" id="Vector_5" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
              </IconBackgroundImage>
            </ButtonBackgroundImage>
            <ButtonBackgroundImage additionalClassNames="bg-[#0f2a71]">
              <IconBackgroundImage>
                <path d={svgPaths.p176aa380} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                <path d={svgPaths.p25149f00} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                <path d="M11.9959 10.9963H15.9946" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                <path d="M11.9959 15.9946H15.9946" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                <path d="M7.99729 10.9963H8.00729" id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                <path d="M7.99729 15.9946H8.00729" id="Vector_6" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
              </IconBackgroundImage>
            </ButtonBackgroundImage>
            <ButtonBackgroundImage>
              <IconBackgroundImage>
                <path d={svgPaths.p1009ca00} id="Vector" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
              </IconBackgroundImage>
            </ButtonBackgroundImage>
            <ButtonBackgroundImage>
              <IconBackgroundImage>
                <path d={svgPaths.p4d52ae0} id="Vector" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
                <path d={svgPaths.p1fa5b180} id="Vector_2" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99932" />
              </IconBackgroundImage>
            </ButtonBackgroundImage>
          </div>
        </div>
      </div>
    </div>
  );
}