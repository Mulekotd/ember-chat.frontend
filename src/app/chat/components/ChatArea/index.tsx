"use client";

import type { Friend, Messages } from "@/types";

import { MessageCircle } from "lucide-react";

import { ChatHeader } from "./chat-header";
import { MessagesArea } from "./messages-area";
import { MessageInput } from "./message-input";

import React, { useState, useRef, useEffect } from "react";
import { useConfig } from "@/hooks/useConfig";

const EmptyChatState = () => {
  const { darkMode } = useConfig();

  return (
    <div
      className="flex-1 flex flex-col items-center justify-center p-8 text-center"
      style={{
        backgroundColor: darkMode ? "#30302E" : "#f9fafb",
      }}
    >
      <div
        className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${
          darkMode ? "bg-gray-700" : "bg-gray-100"
        }`}
      >
        <MessageCircle
          className={`w-10 h-10 ${
            darkMode ? "text-gray-500" : "text-gray-400"
          }`}
        />
      </div>
      <h2
        className={`text-lg mb-2 ${
          darkMode ? "text-gray-300" : "text-gray-600"
        }`}
      >
        Bem-vindo ao Ember Chat!
      </h2>
      <p
        className={`text-sm ${
          darkMode ? "text-gray-400" : "text-gray-500"
        } max-w-md`}
      >
        Selecione uma conversa na barra lateral para começar a conversar com
        seus amigos.
      </p>
    </div>
  );
};

export const ChatArea = ({
  selectedFriend,
  messages,
  onSendMessage,
}: {
  selectedFriend?: Friend;
  messages: Messages;
  onSendMessage: (text: string) => void;
}) => {
  const [newMessage, setNewMessage] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim() === "") return;

    onSendMessage(newMessage);
    setNewMessage("");
  };

  if (!selectedFriend) {
    return <EmptyChatState />;
  }

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <ChatHeader selectedFriend={selectedFriend} />

      <MessagesArea
        messages={messages}
        selectedFriend={selectedFriend}
        messagesEndRef={messagesEndRef}
      />

      <MessageInput
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        onSendMessage={sendMessage}
      />
    </div>
  );
};
