// A simple badge to display "Active" or "Inactive" status.

type StatusBadgeProps = {
  status: string;
};

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const isActive = status === "Active";
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
        isActive
          ? "bg-green-50 text-green-700 border border-green-200"
          : "bg-gray-50 text-gray-600 border border-gray-200"
      }`}
    >
      {status}
    </span>
  );
};