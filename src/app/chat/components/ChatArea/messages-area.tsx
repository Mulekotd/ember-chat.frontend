import type { Friend, Messages, Message } from "@/types";

import { useConfig } from "@/hooks/useConfig";

const MessageItem = ({
  message,
  selectedFriend,
}: {
  message: Message;
  selectedFriend: Friend;
}) => {
  const { darkMode } = useConfig();

  return (
    <div
      className={`flex ${
        message.sender === "me" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`flex items-end space-x-2 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl ${
          message.sender === "me" ? "flex-row-reverse space-x-reverse" : ""
        }`}
      >
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
            darkMode ? "bg-red-600" : "bg-red-500"
          } text-white flex-shrink-0`}
        >
          {message.sender === "me" ? "EU" : selectedFriend.avatar}
        </div>
        <div
          className={`px-4 py-2 rounded-2xl ${
            message.sender === "me"
              ? darkMode
                ? "bg-red-600 text-white"
                : "bg-red-500 text-white"
              : darkMode
              ? "bg-gray-700 text-white"
              : "bg-white text-gray-900 border border-gray-200"
          }`}
        >
          <p className="text-sm break-words">{message.text}</p>
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
  );
};

export const MessagesArea = ({
  messages,
  selectedFriend,
  messagesEndRef,
}: {
  messages: Messages;
  selectedFriend: Friend;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const { darkMode } = useConfig();

  return (
    <div
      className="flex-1 overflow-y-auto p-4 space-y-4"
      style={{
        backgroundColor: darkMode ? "#30302E" : "#f9fafb",
      }}
    >
      {messages[selectedFriend.id]?.map((message) => (
        <MessageItem
          key={message.id}
          message={message}
          selectedFriend={selectedFriend}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};
