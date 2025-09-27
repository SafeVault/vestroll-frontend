interface HelperLinkProps {
  onClick: () => void;
}

export function HelperLink({ onClick }: HelperLinkProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        text-sm font-medium text-gray-700 hover:text-gray-900
        transition-colors duration-200
        focus:outline-none focus:underline
        underline decoration-dotted underline-offset-2
      "
      aria-label="Get help with verification code"
    >
      Didn't get the code?
    </button>
  );
}