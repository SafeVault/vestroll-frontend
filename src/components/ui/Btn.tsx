import { BtnProp } from "@/types/interface";
function Btn({ variant, text, onclick }: BtnProp) {
  const styling = () => {
    // ADD THE STYLING FOR OTHER VARIANTS IF THERE IS.
    switch (variant) {
      case "primary":
        return "bg-primary-500 hover-bg-primary-500/70 transition duration cursor-pointer ease-in-out rounded-lg p-2 gap-2 w-full h-14 text-base text-white leading-[120%]";

      default:
        return "bg-primary-500 rounded-lg p-2 gap-2 w-full h-14 text-base text-white leading-[120%]";
    }
  };
  return (
    <button
      onClick={onclick}
      className={` ${styling()} border-0 outline-nones`}
    >
      {text}
    </button>
  );
}

export default Btn;
