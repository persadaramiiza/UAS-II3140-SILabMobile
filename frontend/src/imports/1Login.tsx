import svgPaths from "./svg-xowaxyxmyy";
import imgImageSiLabSuiteLogo from "figma:asset/c7331baf757474afb91e9105f759afebcb9348c1.png";
import imgDesainTanpaJudul221 from "figma:asset/be073e5aa3e2ca42e0dd11c29ef94997023107e0.png";

function Button({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="basis-0 bg-white grow h-[39.99px] min-h-px min-w-px relative rounded-[8px] shrink-0">
      <div aria-hidden="true" className="absolute border-[#e8e8e8] border-[0.7px] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">{children}</div>
    </div>
  );
}

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="h-[23.992px] relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">{children}</div>
    </div>
  );
}
type Text1Props = {
  text: string;
};

function Text1({ text }: Text1Props) {
  return (
    <div className="h-[23.992px] relative shrink-0 w-full">
      <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#6b6b6b] text-[16px] text-nowrap top-[-0.6px]">{text}</p>
    </div>
  );
}
type TextProps = {
  text: string;
  additionalClassNames?: string;
};

function Text({ text, additionalClassNames = "" }: TextProps) {
  return (
    <Wrapper additionalClassNames={additionalClassNames}>
      <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#6b6b6b] text-[16px] text-nowrap top-[-0.6px]">{text}</p>
    </Wrapper>
  );
}

function Container() {
  return <div className="basis-0 bg-[#e8e8e8] grow h-[0.995px] min-h-px min-w-px shrink-0" data-name="Container" />;
}

export default function Component1Login() {
  return (
    <div className="relative size-full" data-name="1 - Login">
      <div className="absolute bg-white content-stretch flex flex-col h-[852px] items-start left-0 overflow-clip top-0 w-[393px]" data-name="1 - Login Page">
        <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[393.318px]" data-name="Container">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip pb-0 pt-[-28.694px] px-0 relative rounded-[inherit] size-full">
            <div className="bg-white h-[852.422px] relative shrink-0 w-full" data-name="LoginScreen">
              <div className="absolute h-[529px] left-[-80px] top-[-96.31px] w-[298px]" data-name="Desain tanpa judul (22) 1">
                <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgDesainTanpaJudul221} />
              </div>
              <div className="absolute content-stretch flex flex-col gap-[15.998px] h-[147.964px] items-center left-[23.99px] top-[63.99px] w-[345.334px]" data-name="Container">
                <div className="relative shrink-0 size-[79.991px]" data-name="Image (SILab Suite Logo)">
                  <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageSiLabSuiteLogo} />
                </div>
                <Wrapper additionalClassNames="w-[113.967px]">
                  <p className="absolute font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[24px] left-[calc(50%-64.66px)] text-[#111] text-[18px] text-nowrap top-[4.71px]">Welcome back</p>
                </Wrapper>
                <Text text="Sign in to continue to SILab Suite" additionalClassNames="w-[244.577px]" />
              </div>
              <div className="absolute bg-white border-[#e8e8e8] border-[0.7px] border-solid h-[449.284px] left-[23.99px] rounded-[16px] top-[259.95px] w-[345.334px]" data-name="Container">
                <div className="absolute content-stretch flex flex-col gap-[7.994px] h-[79.98px] items-start left-[23.99px] top-[23.99px] w-[295.951px]" data-name="Container">
                  <Text1 text="Email" />
                  <div className="bg-white h-[47.995px] relative rounded-[12px] shrink-0 w-full" data-name="Email Input">
                    <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                      <div className="content-stretch flex items-center px-[16px] py-0 relative size-full">
                        <p className="font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[16px] text-[rgba(17,17,17,0.5)] text-nowrap">student@itb.ac.id</p>
                      </div>
                    </div>
                    <div aria-hidden="true" className="absolute border-[#e8e8e8] border-[0.7px] border-solid inset-0 pointer-events-none rounded-[12px]" />
                  </div>
                </div>
                <div className="absolute content-stretch flex flex-col gap-[7.994px] h-[79.98px] items-start left-[23.99px] top-[119.97px] w-[295.951px]" data-name="Container">
                  <Text1 text="Password" />
                  <div className="h-[47.995px] relative shrink-0 w-full" data-name="Container">
                    <div className="absolute bg-white h-[47.995px] left-0 rounded-[12px] top-0 w-[295.951px]" data-name="Password Input">
                      <div className="content-stretch flex items-center overflow-clip pl-[16px] pr-[48px] py-0 relative rounded-[inherit] size-full">
                        <p className="font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[16px] text-[rgba(17,17,17,0.5)] text-nowrap">Enter your password</p>
                      </div>
                      <div aria-hidden="true" className="absolute border-[#e8e8e8] border-[0.7px] border-solid inset-0 pointer-events-none rounded-[12px]" />
                    </div>
                    <div className="absolute content-stretch flex flex-col items-start left-[259.96px] size-[19.99px] top-[14px]" data-name="Button">
                      <div className="h-[19.99px] overflow-clip relative shrink-0 w-full" data-name="Icon">
                        <div className="absolute inset-[20.84%_8.33%]" data-name="Vector">
                          <div className="absolute inset-[-7.14%_-5%]">
                            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3246 13.3254">
                              <path d={svgPaths.p2cbdc600} id="Vector" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6658" />
                            </svg>
                          </div>
                        </div>
                        <div className="absolute inset-[37.5%]" data-name="Vector">
                          <div className="absolute inset-[-16.67%]">
                            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.66319 6.66319">
                              <path d={svgPaths.pb0c5870} id="Vector" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6658" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute h-[23.992px] left-[182.16px] top-[207.94px] w-[137.784px]" data-name="Button">
                  <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[24px] left-[69px] text-[#0f2a71] text-[16px] text-center text-nowrap top-[-0.6px] translate-x-[-50%]">Forgot password?</p>
                </div>
                <div className="absolute bg-[#0f2a71] h-[47.995px] left-[23.99px] rounded-[12px] top-[255.93px] w-[295.951px]" data-name="Button">
                  <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[24px] left-[148.42px] text-[16px] text-center text-nowrap text-white top-[11.4px] translate-x-[-50%]">Log in</p>
                </div>
                <div className="absolute content-stretch flex gap-[15.998px] h-[23.992px] items-center left-[23.99px] pl-0 pr-[-0.011px] py-0 top-[327.91px] w-[295.951px]" data-name="Container">
                  <Container />
                  <Text text="or" additionalClassNames="w-[15.889px]" />
                  <Container />
                </div>
                <div className="absolute bg-white content-stretch flex gap-[11.996px] h-[47.995px] items-center justify-center left-[23.99px] p-[0.7px] rounded-[12px] top-[375.9px] w-[295.951px]" data-name="Button">
                  <div aria-hidden="true" className="absolute border-[#e8e8e8] border-[0.7px] border-solid inset-0 pointer-events-none rounded-[12px]" />
                  <div className="relative shrink-0 size-[19.99px]" data-name="Icon">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9896 19.9896">
                      <g clipPath="url(#clip0_18_2028)" id="Icon">
                        <path d={svgPaths.p276ccd00} fill="var(--fill-0, #4285F4)" id="Vector" />
                        <path d={svgPaths.p20dcca00} fill="var(--fill-0, #34A853)" id="Vector_2" />
                        <path d={svgPaths.p33cae800} fill="var(--fill-0, #FBBC04)" id="Vector_3" />
                        <path d={svgPaths.p8497200} fill="var(--fill-0, #EA4335)" id="Vector_4" />
                      </g>
                      <defs>
                        <clipPath id="clip0_18_2028">
                          <rect fill="white" height="19.9896" width="19.9896" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <Wrapper additionalClassNames="w-[144.728px]">
                    <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[24px] left-[72.5px] text-[#111] text-[16px] text-center text-nowrap top-[-0.6px] translate-x-[-50%]">Sign in with Google</p>
                  </Wrapper>
                </div>
              </div>
              <div className="absolute bg-[#f3f3f3] content-stretch flex flex-col gap-[11.996px] h-[107.974px] items-start left-[23.99px] pb-0 pt-[15.998px] px-[15.998px] rounded-[12px] top-[733.23px] w-[345.334px]" data-name="Container">
                <div className="h-[23.992px] relative shrink-0 w-full" data-name="Paragraph">
                  <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[24px] left-[156.74px] text-[#6b6b6b] text-[16px] text-center text-nowrap top-[-0.6px] translate-x-[-50%]">Quick Demo Access</p>
                </div>
                <div className="content-stretch flex gap-[7.994px] h-[39.99px] items-start relative shrink-0 w-full" data-name="Container">
                  <Button>
                    <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[24px] left-[49.75px] text-[#0f2a71] text-[16px] text-center text-nowrap top-[7.39px] translate-x-[-50%]">Student</p>
                  </Button>
                  <Button>
                    <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[24px] left-[50px] text-[#0f2a71] text-[16px] text-center text-nowrap top-[7.39px] translate-x-[-50%]">Assistant</p>
                  </Button>
                  <Button>
                    <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[24px] left-[49.98px] text-[#0f2a71] text-[16px] text-center text-nowrap top-[7.39px] translate-x-[-50%]">Admin</p>
                  </Button>
                </div>
              </div>
              <div className="absolute h-[23.992px] left-[24px] top-[841.69px] w-[345.334px]" data-name="Paragraph">
                <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[24px] left-[126.5px] text-[#6b6b6b] text-[12px] text-center top-[-1px] translate-x-[-50%] w-[149px]">{`Don't have access?`}</p>
                <div className="absolute h-[20.001px] left-[197.07px] top-[2.8px] w-[99.554px]" data-name="Button" />
                <p className="absolute font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[20px] left-[229px] text-[#0f2a71] text-[12px] text-center text-nowrap top-px translate-x-[-50%]">Contact admin</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}