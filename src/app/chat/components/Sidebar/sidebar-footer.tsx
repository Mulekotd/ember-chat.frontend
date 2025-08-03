import type { SidebarFooterProps } from "@/types";

import { Users, Settings } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SettingsMenu } from "./settings-menu";

import { useConfig } from "@/hooks/useConfig";

export const SidebarFooter = ({
  isCollapsed,
  onFriendsClick,
}: SidebarFooterProps) => {
  const { darkMode } = useConfig();

  const buttonClass = `
    w-full justify-start gap-3 h-10 px-3 font-normal
    ${isCollapsed ? "px-0 justify-center" : ""}
    transition-all duration-200 ease-in-out
    hover:bg-opacity-80
  `;

  const buttonStyle = {
    backgroundColor: "transparent",
    color: darkMode ? "#A8A8A6" : "#6b7280",
    border: "none",
  };

  const hoverStyle = {
    backgroundColor: darkMode ? "#4A4A48" : "#f3f4f6",
  };

  return (
    <div
      className="p-2 border-t mt-auto"
      style={{
        borderColor: darkMode ? "#262624" : "#e5e7eb",
        backgroundColor: darkMode ? "#3D3D3B" : "white",
      }}
    >
      <div className="space-y-1">
        {/* Friends Button */}
        <Button
          variant="ghost"
          className={buttonClass}
          style={buttonStyle}
          onMouseEnter={(e) => {
            Object.assign(e.currentTarget.style, hoverStyle);
          }}
          onMouseLeave={(e) => {
            Object.assign(e.currentTarget.style, buttonStyle);
          }}
          onClick={onFriendsClick}
          title={isCollapsed ? "Amigos" : undefined}
        >
          <Users size={20} />
          {!isCollapsed && <span>Amigos</span>}
        </Button>

        {/* Settings Button with Menu */}
        <SettingsMenu isCollapsed={isCollapsed}>
          <Button
            variant="ghost"
            className={buttonClass}
            style={buttonStyle}
            onMouseEnter={(e) => {
              Object.assign(e.currentTarget.style, hoverStyle);
            }}
            onMouseLeave={(e) => {
              Object.assign(e.currentTarget.style, buttonStyle);
            }}
            title={isCollapsed ? "Settings" : undefined}
          >
            <Settings size={20} />
            {!isCollapsed && <span>Configurações</span>}
          </Button>
        </SettingsMenu>
      </div>
    </div>
  );
};
