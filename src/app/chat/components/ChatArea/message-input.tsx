import { Send, Paperclip } from "lucide-react";

import { useConfig } from "@/hooks/useConfig";

export const MessageInput = ({
  newMessage,
  setNewMessage,
  onSendMessage,
}: {
  newMessage: string;
  setNewMessage: (value: string) => void;
  onSendMessage: () => void;
}) => {
  const { darkMode } = useConfig();

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  const handleTextareaResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
  };

  return (
    <div
      className="p-4 border-t"
      style={{
        backgroundColor: darkMode ? "#3D3D3B" : "white",
        borderColor: darkMode ? "#262624" : "#e5e7eb",
      }}
    >
      <div className="flex items-end space-x-2 sm:space-x-3">
        <div className="flex space-x-1 sm:space-x-2 flex-shrink-0">
          <button
            className={`p-2 rounded-md transition-colors ${
              darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
            }`}
          >
            <Paperclip className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 min-w-0">
          <textarea
            placeholder="Digite sua mensagem..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            onInput={handleTextareaResize}
            rows={1}
            className={`w-full resize-none rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                : "bg-gray-50 border-gray-200"
            }`}
            style={{
              minHeight: "48px",
              maxHeight: "120px",
            }}
          />
        </div>

        <button
          onClick={onSendMessage}
          className={`h-12 px-4 sm:px-6 rounded-xl font-medium transition-colors flex-shrink-0 ${
            darkMode
              ? "bg-red-600 hover:bg-red-700"
              : "bg-red-500 hover:bg-red-600"
          } text-white`}
        >
          <Send className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  );
};
