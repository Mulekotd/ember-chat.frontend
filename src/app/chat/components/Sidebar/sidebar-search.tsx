import type { SidebarSearchProps } from "@/types";

import { Search } from "lucide-react";

import React, { useState } from "react";
import { useConfig } from "@/hooks/useConfig";

export const SidebarSearch = ({
  searchTerm,
  onSearchChange,
}: SidebarSearchProps) => {
  const [internalSearchTerm, setInternalSearchTerm] = useState<string>("");

  const currentSearchTerm = searchTerm ?? internalSearchTerm;
  const handleChange = onSearchChange ?? setInternalSearchTerm;

  const { darkMode } = useConfig();

  return (
    <div className="relative">
      <Search
        className={`w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 ${
          darkMode ? "text-gray-400" : "text-gray-500"
        }`}
      />
      <input
        placeholder="Buscar conversas..."
        value={currentSearchTerm}
        onChange={(e) => handleChange(e.target.value)}
        className={`w-full pl-10 pr-4 py-2 rounded-md border transition-colors ${
          darkMode
            ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            : "bg-gray-50 border-gray-200"
        }`}
      />
    </div>
  );
};
