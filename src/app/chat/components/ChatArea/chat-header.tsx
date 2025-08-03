import type { Friend } from "@/types";

import { MoreVertical } from "lucide-react";

import { useConfig } from "@/hooks/useConfig";

export const ChatHeader = ({ selectedFriend }: { selectedFriend: Friend }) => {
  const { darkMode } = useConfig();

  return (
    <div
      className="p-4 border-b flex items-center justify-between"
      style={{
        backgroundColor: darkMode ? "#3D3D3B" : "white",
        borderColor: darkMode ? "#262624" : "#e5e7eb",
      }}
    >
      <div className="flex items-center space-x-3">
        <div className="relative">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
              darkMode ? "bg-red-600" : "bg-red-500"
            } text-white`}
          >
            {selectedFriend.avatar}
          </div>
          {selectedFriend.online && (
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          )}
        </div>
        <div>
          <h2
            className={`font-semibold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {selectedFriend.name}
          </h2>
          <p
            className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {selectedFriend.online ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      <div className="flex space-x-2">
        <button
          className={`p-2 rounded-md transition-colors ${
            darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
          }`}
        >
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
