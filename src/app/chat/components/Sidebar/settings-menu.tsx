import { Settings, Moon, Sun, User, LogOut, Palette } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";

import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { useConfig } from "@/hooks/useConfig";

interface SettingsMenuProps {
  children: React.ReactNode;
  isCollapsed?: boolean;
}

export const SettingsMenu = ({
  children,
  isCollapsed = false,
}: SettingsMenuProps) => {
  const { darkMode, toggleDarkMode } = useConfig();
  const { logout } = useAuth();

  const handleProfileClick = () => {
    console.log("Profile clicked");
  };

  const handleLogoutClick = async () => await logout();

  const menuContentStyles = {
    backgroundColor: darkMode ? "#3D3D3B" : "white",
    borderColor: darkMode ? "#262624" : "#e5e7eb",
    color: darkMode ? "#E5E5E3" : "#374151",
  };

  const menuItemStyles = {
    color: darkMode ? "#E5E5E3" : "#374151",
  };

  const separatorStyles = {
    backgroundColor: darkMode ? "#262624" : "#e5e7eb",
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 border"
        side={isCollapsed ? "right" : "bottom"}
        align={isCollapsed ? "start" : "end"}
        sideOffset={isCollapsed ? 8 : 4}
        style={menuContentStyles}
      >
        <DropdownMenuLabel
          className="flex items-center gap-2"
          style={menuItemStyles}
        >
          <Settings size={16} />
          Configurações
        </DropdownMenuLabel>
        <DropdownMenuSeparator style={separatorStyles} />

        {/* Profile */}
        <DropdownMenuItem
          onClick={handleProfileClick}
          className="cursor-pointer hover:bg-opacity-80"
          style={menuItemStyles}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = darkMode
              ? "#4A4A48"
              : "#f3f4f6";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          <User size={16} />
          <span className="ml-2">Perfil</span>
        </DropdownMenuItem>

        {/* Theme Submenu */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger
            className="cursor-pointer"
            style={menuItemStyles}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = darkMode
                ? "#4A4A48"
                : "#f3f4f6";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            <Palette size={16} />
            <span className="ml-2">Tema</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent style={menuContentStyles} className="border">
            <DropdownMenuItem
              onClick={toggleDarkMode}
              className="cursor-pointer flex items-center justify-between"
              style={menuItemStyles}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = darkMode
                  ? "#4A4A48"
                  : "#f3f4f6";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <div className="flex items-center gap-2">
                {darkMode ? <Moon size={16} /> : <Sun size={16} />}
                <span>Modo {darkMode ? "Escuro" : "Claro"}</span>
              </div>
              <Switch className="ml-2" checked={darkMode} />
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        {/* Logout */}
        <DropdownMenuItem
          onClick={handleLogoutClick}
          className="cursor-pointer"
          style={{
            color: "#dc2626",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = darkMode
              ? "#4A4A48"
              : "#f3f4f6";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          <LogOut size={16} />
          <span className="ml-2">Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
