import { AuthLayoutProps } from "@/types/interface";
import Link from "next/link";
import { LogoIcon, MobileLogoIcon } from "../../../public/svg";
import Image from "next/image";
import Global from "../../../public/images/Frame 2147223744.svg";
function AuthLayer({ children }: AuthLayoutProps) {
  return (
    <div className="flex h-svh sm:h-screen bg-white relative">
      <div className=" fixed z-50 top-8 sm:top-10 left-6 sm:left-10 bg-white p-0 sm:px-5 sm:py-3 rounded-lg">
        <div className="hidden sm:flex">
          <LogoIcon />
        </div>
        <div className="sm:hidden">
          <MobileLogoIcon />
        </div>
      </div>

      <div className=" flex-1 bg-primary-500 flex-col hidden lg:flex my-5 ml-5 rounded-lg pl-9   gap-18 pt-36 max-w-2xl">
        <div className="flex items-center justify-center w-full mr-5">
          <Image src={Global} alt="" width={494.22} height={497.03} />
        </div>
        <div className="space-y-3">
          <h1 className="text-6xl text-white font-bold capitalize">
            Seamless payments, anywhere.
          </h1>
          <p className="text-base font-medium text-white leading-[120%]">
            Experience Fast, Secure Crypto & Fiat Payroll & Invoicing with
            VestRoll
          </p>
        </div>
      </div>
      <div className="relative flex-1 bg-white h-full px-6 pt-28 sm:pt-40.5">
        {children}

        <div className="sm:flex gap-2 justify-between items-center text-base font-medium   p-6  absolute bottom-0  w-full hidden left-0">
          <p className="text-[#7F8C9F]">&copy; 2025, all rights reserved</p>
          <div className="text-text-header flex items-center gap-2">
            <Link href={""}>Privacy Policy</Link>
            <span className="size-0.5 rounded-full bg-text-header inline-block"></span>
            <Link href={""}>Terms and condition</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayer;
