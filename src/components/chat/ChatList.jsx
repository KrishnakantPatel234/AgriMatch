import React from "react";

const ChatList = ({ chats, onSelectChat, activeChatId }) => {
  return (
    <div className="w-full md:w-1/3 border-r bg-white overflow-y-auto h-full rounded-l-xl">
      <h2 className="text-xl font-bold p-4 border-b shadow-sm bg-green-50">Chats</h2>

      {chats.length === 0 && (
        <p className="p-6 text-gray-400 text-center">No chats yet</p>
      )}

      {chats.map((chat) => (
        <div
          key={chat._id}
          className={`p-4 cursor-pointer transition border-b 
            ${chat._id === activeChatId ? "bg-green-100" : "hover:bg-gray-100"}`}
          onClick={() => onSelectChat(chat)}
        >
          <p className="font-semibold">{chat.farmerName || "Unknown"}</p>
          <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
