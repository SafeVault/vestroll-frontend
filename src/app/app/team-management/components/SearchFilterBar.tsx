// The search input and filter button component.

import { Search, ListFilter } from "lucide-react";

type SearchFilterBarProps = {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onFilterClick: () => void;
};

export const SearchFilterBar = ({
  searchQuery,
  onSearchChange,
  onFilterClick,
}: SearchFilterBarProps) => (
  <div className="flex gap-3">
    <div className="flex-1 relative">
      <Search
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        size={20}
      />
      <input
        type="text"
        placeholder="Search by name..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      />
    </div>
    <button
      onClick={onFilterClick}
      className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors"
    >
      <ListFilter size={20} className="text-gray-800" />
    </button>
  </div>
);