import { ArrowLeft, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { ArrowDown, ExportIcon } from "../../../public/svg";
function TitleHeader({
  title,
  isBackButton,
  isAddButton = false,
  isExportButton,
}: {
  title: string;
  isBackButton: boolean;
  isAddButton?: boolean;
  isExportButton?: boolean;
}) {
  const handleBackButton = () => {
    if (isBackButton) {
    }
  };
  return (
    <section className="sticky top-0 bg-white z-5 ">
      <div className="px-4 ">
        <div className="pb-1 space-y-1">
          {isBackButton ? (
            <button
              onClick={handleBackButton}
              className="flex items-center gap-1 text-xs font-medium text-gray-300 transition-colors duration-150 ease-in-out cursor-pointer hover:text-gray-200"
            >
              <span>
                <ArrowLeft size={16} />
              </span>
              Back
            </button>
          ) : (
            <p className="text-xs font-medium text-[#7F8C9F]">Overview</p>
          )}
          <div className="flex items-center justify-between gap-4">
            <h1 className="overflow-hidden text-2xl font-bold tracking-tight text-text-header truncate max-w-44 xs:max-w-56  whitespace-nowrap sm:text-4xl sm:max-w-full">
              {title}
            </h1>
            {isAddButton && (
              <Link
                to={""}
                className={
                  "hidden lg:flex items-center text-white rounded-full cursor-pointer bg-primary-200 h-10 gap-1 px-4 transform-all ease-linear  "
                }
              >
                <Plus size={16} />
                New contract
              </Link>
            )}
            {isExportButton && (
              <button className="bg-primary-500 rounded-xl h-10 text-white text-sm font-medium capitalize px-4 py-2 flex items-center gap-1">
                <ExportIcon />
                <span>export</span>
                <ArrowDown />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TitleHeader;
