import { Settings, Menu, X } from "lucide-react";
import { SearchBar } from "./searchbar";

import { useConfig } from "@/hooks/useConfig";

export const SidebarHeader = ({
  isCollapsed,
  onToggleCollapse,
  searchTerm,
  onSearchChange,
}: {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
}) => {
  const { darkMode } = useConfig();

  return (
    <div
      className={`${
        isCollapsed ? "p-3 lg:p-4" : "p-4"
      } border-b flex items-center justify-center min-h-[76.8px]`}
      style={{ borderColor: darkMode ? "#262624" : "#e5e7eb" }}
    >
      {isCollapsed ? (
        <button
          onClick={onToggleCollapse}
          className={`p-2 rounded-md transition-colors ${
            darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
          }`}
        >
          <Menu className="w-4 h-4" />
        </button>
      ) : (
        <div className="w-full">
          <div className="flex items-center justify-between mb-4">
            <h1
              className={`text-xl lg:text-2xl font-bold bg-gradient-to-r ${
                darkMode ? "from-white to-red-300" : "from-gray-900 to-red-600"
              } bg-clip-text text-transparent`}
            >
              Ember Chat
            </h1>
            <div className="flex space-x-1 lg:space-x-2">
              <button
                onClick={onToggleCollapse}
                className={`p-2 rounded-md transition-colors ${
                  darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                }`}
              >
                <X className="w-4 h-4" />
              </button>
              <button
                className={`p-2 rounded-md transition-colors ${
                  darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                }`}
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>

          <SearchBar searchTerm={searchTerm} onSearchChange={onSearchChange} />
        </div>
      )}
    </div>
  );
};
