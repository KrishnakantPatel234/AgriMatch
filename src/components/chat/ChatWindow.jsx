import React, { useState, useEffect, useRef } from "react";
import { FaMicrophone } from "react-icons/fa";

const ChatWindow = ({ chat, messages, onSend, isTyping, startVoice }) => {
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="w-full md:w-2/3 flex flex-col bg-white rounded-r-xl">
      {/* Header */}
      <div className="p-4 border-b shadow-sm flex items-center justify-between bg-green-50">
        <p className="font-semibold">{chat?.farmerName}</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((m, index) => (
          <div
            key={index}
            className={`max-w-xs px-4 py-2 rounded-xl ${
              m.fromSelf
                ? "bg-green-600 text-white ml-auto"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {m.message}
          </div>
        ))}

        {isTyping && (
          <div className="bg-gray-200 text-gray-700 px-3 py-2 rounded-xl w-max">
            typing...
          </div>
        )}

        <div ref={bottomRef}></div>
      </div>

      {/* Input Box */}
      <div className="p-4 border-t flex items-center space-x-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSend(input, setInput)}
          placeholder="Type your message..."
          className="flex-1 p-3 border rounded-xl outline-none"
        />

        {/* Voice Button */}
        <button
          onClick={() => startVoice((speech) => setInput(speech))}
          className="p-3 rounded-full bg-green-600 text-white"
        >
          <FaMicrophone />
        </button>

        <button
          onClick={() => onSend(input, setInput)}
          className="px-4 py-2 bg-green-600 text-white rounded-xl"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
