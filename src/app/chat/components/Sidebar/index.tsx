import type { SidebarProps } from "@/types";

import { FriendsList } from "./friend-list";
import { SidebarFooter } from "./sidebar-footer";
import { SidebarHeader } from "./sidebar-header";

import React, { useState } from "react";
import { useConfig } from "@/hooks/useConfig";

export const Sidebar = ({
  friends,
  selectedFriend,
  onSelectFriend,
  isCollapsed,
  onToggleCollapse,
}: SidebarProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { darkMode } = useConfig();

  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFriendsClick = () => {
    console.log("Friends clicked");
  };

  return (
    <div
      className={`${
        isCollapsed ? "w-16 lg:w-20" : "w-80"
      } border-r flex flex-col transition-all duration-300 ease-in-out flex-shrink-0`}
      style={{
        backgroundColor: darkMode ? "#3D3D3B" : "white",
        borderColor: darkMode ? "#262624" : "#e5e7eb",
      }}
    >
      <SidebarHeader
        isCollapsed={isCollapsed}
        onToggleCollapse={onToggleCollapse}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <FriendsList
        friends={filteredFriends}
        selectedFriend={selectedFriend}
        isCollapsed={isCollapsed}
        onSelectFriend={onSelectFriend}
      />

      <SidebarFooter
        isCollapsed={isCollapsed}
        onFriendsClick={handleFriendsClick}
      />
    </div>
  );
};
