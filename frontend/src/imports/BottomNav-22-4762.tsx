import svgPaths from "./svg-m7b3xy0c2k";
import clsx from "clsx";
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

export default function BottomNav() {
  return (
    <div className="bg-[rgba(255,255,255,0.8)] relative size-full" data-name="BottomNav">
      <div aria-hidden="true" className="absolute border-[0.7px_0px_0px] border-black border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pb-0 pl-[30.52px] pr-[30.531px] pt-[0.7px] relative size-full">
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
  );
}