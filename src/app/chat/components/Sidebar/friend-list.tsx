import type {
  EmptyFriendsListProps,
  FriendItemProps,
  FriendListProps,
} from "@/types";

import { Users } from "lucide-react";

import { useConfig } from "@/hooks/useConfig";

const FriendItem = ({
  friend,
  isSelected,
  isCollapsed,
  onSelect,
}: FriendItemProps) => {
  const { darkMode } = useConfig();

  return (
    <div
      onClick={() => onSelect(friend)}
      className={`p-4 cursor-pointer transition-colors border-b ${
        isSelected
          ? darkMode
            ? "bg-red-900/20"
            : "bg-red-50"
          : darkMode
          ? "hover:bg-gray-700"
          : "hover:bg-gray-50"
      }`}
      style={{ borderColor: darkMode ? "#262624" : "#e5e7eb" }}
    >
      <div className="flex items-center space-x-3">
        <div className="relative">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
              darkMode ? "bg-red-600" : "bg-red-500"
            } text-white`}
          >
            {friend.avatar}
          </div>
          {friend.online && (
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          )}
        </div>

        {!isCollapsed && (
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3
                className={`font-medium truncate ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {friend.name}
              </h3>
              <span
                className={`text-xs ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {friend.time}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <p
                className={`text-sm truncate ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {friend.lastMessage}
              </p>
              {friend.unread > 0 && (
                <span className="ml-2 px-2 py-1 text-xs bg-red-500 text-white rounded-full">
                  {friend.unread}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const EmptyFriendsList = ({ isCollapsed }: EmptyFriendsListProps) => {
  const { darkMode } = useConfig();

  if (isCollapsed) {
    return <div className="flex-1 flex items-center justify-center p-4"></div>;
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
      <div
        className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
          darkMode ? "bg-gray-700" : "bg-gray-100"
        }`}
      >
        <Users
          className={`w-8 h-8 ${darkMode ? "text-gray-500" : "text-gray-400"}`}
        />
      </div>
      <h3
        className={`text-lg font-medium mb-2 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        Nenhuma conversa
      </h3>
      <p
        className={`text-sm ${
          darkMode ? "text-gray-400" : "text-gray-500"
        } max-w-xs`}
      >
        Suas conversas aparecerão aqui quando você começar a conversar com seus
        amigos.
      </p>
    </div>
  );
};

export const FriendsList = ({
  friends,
  selectedFriend,
  isCollapsed,
  onSelectFriend,
}: FriendListProps) => {
  if (friends.length === 0) {
    return <EmptyFriendsList isCollapsed={isCollapsed} />;
  }

  return (
    <div className="flex-1 overflow-y-auto">
      {friends.map((friend) => (
        <FriendItem
          key={friend.id}
          friend={friend}
          isSelected={selectedFriend.id === friend.id}
          isCollapsed={isCollapsed}
          onSelect={onSelectFriend}
        />
      ))}
    </div>
  );
};
