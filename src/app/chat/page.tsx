"use client";

import type { Friend, Messages } from "@/types";

import { ChatArea } from "./components/ChatArea";
import { Sidebar } from "./components/Sidebar";

import React, { useState, useEffect } from "react";
import { useConfig } from "@/hooks/useConfig";

const friends: Friend[] = [];
const initialMessages: Messages = {};

export default function EmberChat() {
  const [selectedFriend, setSelectedFriend] = useState<Friend>(friends[0]);
  const [messages, setMessages] = useState(initialMessages);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const { darkMode } = useConfig();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSendMessage = (text: string) => {
    const message = {
      id: Date.now(),
      text: text,
      sender: "me",
      time: new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => ({
      ...prev,
      [selectedFriend.id]: [...(prev[selectedFriend.id] || []), message],
    }));
  };

  return (
    <div
      className="h-screen flex transition-all duration-500"
      style={{
        backgroundColor: darkMode ? "#30302E" : "#f9fafb",
        color: darkMode ? "white" : "#111827",
      }}
    >
      <Sidebar
        friends={friends}
        selectedFriend={selectedFriend}
        onSelectFriend={setSelectedFriend}
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
      />

      <ChatArea
        selectedFriend={selectedFriend}
        messages={messages}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
}
