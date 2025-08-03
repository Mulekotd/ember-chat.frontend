"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Search,
  MoreVertical,
  Smile,
  Paperclip,
  Settings,
  Moon,
  Sun,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useConfig } from "@/hooks/useConfig";

type Message = {
  id: number;
  text: string;
  sender: string;
  time: string;
};

type Friend = {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  avatar: string;
};

type Messages = {
  [key: number]: Message[];
};

const friends: Friend[] = [
  {
    id: 1,
    name: "Ana Silva",
    lastMessage: "Oi! Como você está?",
    time: "2 min",
    unread: 2,
    online: true,
    avatar: "AS",
  },
  {
    id: 2,
    name: "Carlos Santos",
    lastMessage: "Vamos nos encontrar hoje?",
    time: "15 min",
    unread: 0,
    online: true,
    avatar: "CS",
  },
  {
    id: 3,
    name: "Maria Oliveira",
    lastMessage: "Obrigada pela ajuda!",
    time: "1h",
    unread: 1,
    online: false,
    avatar: "MO",
  },
  {
    id: 4,
    name: "João Pereira",
    lastMessage: "Até amanhã!",
    time: "3h",
    unread: 0,
    online: false,
    avatar: "JP",
  },
  {
    id: 5,
    name: "Lucia Costa",
    lastMessage: "Que legal! 😄",
    time: "1d",
    unread: 0,
    online: true,
    avatar: "LC",
  },
];

const initialMessages: Messages = {
  1: [
    { id: 1, text: "Oi! Como você está?", sender: "other", time: "14:30" },
    { id: 2, text: "Oi Ana! Estou bem, e você?", sender: "me", time: "14:32" },
    {
      id: 3,
      text: "Estou ótima! Queria te contar uma novidade",
      sender: "other",
      time: "14:33",
    },
    { id: 4, text: "Conta aí! Estou curiosa 😊", sender: "me", time: "14:34" },
  ],
  2: [
    { id: 1, text: "E aí, tudo bem?", sender: "other", time: "13:15" },
    {
      id: 2,
      text: "Oi Carlos! Tudo sim, obrigada",
      sender: "me",
      time: "13:20",
    },
    {
      id: 3,
      text: "Vamos nos encontrar hoje?",
      sender: "other",
      time: "13:45",
    },
  ],
  3: [
    {
      id: 1,
      text: "Você pode me ajudar com aquele projeto?",
      sender: "other",
      time: "12:00",
    },
    {
      id: 2,
      text: "Claro! Vou te mandar os arquivos agora",
      sender: "me",
      time: "12:05",
    },
    { id: 3, text: "Obrigada pela ajuda!", sender: "other", time: "12:30" },
  ],
};

export default function ChatPage() {
  const [selectedFriend, setSelectedFriend] = useState<Friend>(friends[0]);
  const [messages, setMessages] = useState<Messages>(initialMessages);
  const [newMessage, setNewMessage] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { darkMode, handleChangeMode } = useConfig();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sendMessage = () => {
    if (newMessage.trim() === "") return;

    const message = {
      id: Date.now(),
      text: newMessage,
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

    setNewMessage("");

    // Simular resposta automática
    setTimeout(() => {
      const autoReply = {
        id: Date.now() + 1,
        text: "Esta mensagem desaparecerá quando você sair da sessão! 🔥",
        sender: "other",
        time: new Date().toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => ({
        ...prev,
        [selectedFriend.id]: [...(prev[selectedFriend.id] || []), autoReply],
      }));
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div
      className="h-screen flex transition-all duration-500"
      style={{
        backgroundColor: darkMode ? "#30302E" : "#f9fafb",
        color: darkMode ? "white" : "#111827",
      }}
    >
      {/* Sidebar - Lista de Amigos */}
      <div
        className="w-80 border-r flex flex-col"
        style={{
          backgroundColor: darkMode ? "#3D3D3B" : "white",
          borderColor: darkMode ? "#262624" : "#e5e7eb",
        }}
      >
        {/* Header do Sidebar */}
        <div
          className="p-4 border-b"
          style={{ borderColor: darkMode ? "#262624" : "#e5e7eb" }}
        >
          <div className="flex items-center justify-between mb-4">
            <h1
              className={`text-2xl font-bold bg-gradient-to-r ${
                darkMode ? "from-white to-red-300" : "from-gray-900 to-red-600"
              } bg-clip-text text-transparent`}
            >
              Ember Chat
            </h1>
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleChangeMode(!darkMode)}
                className={`${
                  darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                }`}
              >
                {darkMode ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`${
                  darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                }`}
              >
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Barra de Pesquisa */}
          <div className="relative">
            <Search
              className={`w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            />
            <Input
              placeholder="Buscar conversas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`pl-10 ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-gray-50 border-gray-200"
              }`}
            />
          </div>
        </div>

        {/* Lista de Amigos */}
        <div className="flex-1 overflow-y-auto">
          {filteredFriends.map((friend) => (
            <div
              key={friend.id}
              onClick={() => setSelectedFriend(friend)}
              className={`p-4 cursor-pointer transition-colors border-b ${
                selectedFriend.id === friend.id
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
                  <Avatar>
                    <AvatarFallback
                      className={`${
                        darkMode ? "bg-red-600" : "bg-red-500"
                      } text-white`}
                    >
                      {friend.avatar}
                    </AvatarFallback>
                  </Avatar>
                  {friend.online && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>

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
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Área Principal do Chat */}
      <div className="flex-1 flex flex-col">
        {/* Header do Chat */}
        <div
          className="p-4 border-b flex items-center justify-between"
          style={{
            backgroundColor: darkMode ? "#3D3D3B" : "white",
            borderColor: darkMode ? "#262624" : "#e5e7eb",
          }}
        >
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Avatar>
                <AvatarFallback
                  className={`${
                    darkMode ? "bg-red-600" : "bg-red-500"
                  } text-white`}
                >
                  {selectedFriend.avatar}
                </AvatarFallback>
              </Avatar>
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
            <Button
              variant="ghost"
              size="sm"
              className={`${
                darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
              }`}
            >
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Área de Mensagens */}
        <div
          className="flex-1 overflow-y-auto p-4 space-y-4"
          style={{
            backgroundColor: darkMode ? "#30302E" : "#f9fafb",
          }}
        >
          {messages[selectedFriend.id]?.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "me" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${
                  message.sender === "me"
                    ? "flex-row-reverse space-x-reverse"
                    : ""
                }`}
              >
                <Avatar className="w-8 h-8">
                  <AvatarFallback
                    className={`text-xs ${
                      darkMode ? "bg-red-600" : "bg-red-500"
                    } text-white`}
                  >
                    {message.sender === "me" ? "EU" : selectedFriend.avatar}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`px-4 py-2 rounded-2xl ${
                    message.sender === "me"
                      ? darkMode
                        ? "bg-red-600 text-white"
                        : "bg-red-500 text-white"
                      : darkMode
                      ? "bg-gray-700 text-white"
                      : "bg-white text-gray-900 border"
                  }`}
                  style={{
                    borderColor:
                      !darkMode && message.sender !== "me"
                        ? "#e5e7eb"
                        : "transparent",
                  }}
                >
                  <p className="text-sm">{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.sender === "me"
                        ? "text-red-100"
                        : darkMode
                        ? "text-gray-400"
                        : "text-gray-500"
                    }`}
                  >
                    {message.time}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input de Mensagem */}
        <div
          className="p-4 border-t"
          style={{
            backgroundColor: darkMode ? "#3D3D3B" : "white",
            borderColor: darkMode ? "#262624" : "#e5e7eb",
          }}
        >
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className={`${
                darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
              }`}
            >
              <Paperclip className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`${
                darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
              }`}
            >
              <Smile className="w-4 h-4" />
            </Button>
            <Input
              placeholder="Digite sua mensagem..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className={`flex-1 ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-gray-50 border-gray-200"
              }`}
            />
            <Button
              onClick={sendMessage}
              className={`${
                darkMode
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-red-500 hover:bg-red-600"
              } text-white`}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
