import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductPopup from "../components/ProductPopup";
import ChatWindow from "../components/chat/ChatWindow";
import { useSocket } from "../context/SocketContext";
import { useAuth } from "../context/AuthContext";
import { useVoiceRecognition } from "../hooks/UseVoiceRecognition";

const categories = [
  "All",
  "Vegetables",
  "Fruits",
  "Grains",
  "Spices",
  "Organic",
  "Other"
];

const Marketplace = () => {
  const { user } = useAuth();
  const { socket } = useSocket();
  const { startVoiceRecognition } = useVoiceRecognition();

  const [posts, setPosts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  // Marketplace State
  const [selectedPost, setSelectedPost] = useState(null);

  // Chat System State
  const [chatWith, setChatWith] = useState(null);
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);

  // FILTERS
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortType, setSortType] = useState("newest");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState([0, 50000]);

  // Fetch all marketplace posts
  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/posts");
      setPosts(response.data.posts || []);
      setFiltered(response.data.posts || []);
    } catch (err) {
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // FILTER LOGIC
  useEffect(() => {
    let data = [...posts];

    if (search.trim() !== "") {
      data = data.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "All") {
      data = data.filter((p) => p.category === category.toLowerCase());
    }

    if (location.trim() !== "") {
      data = data.filter((p) =>
        p.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    data = data.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    if (sortType === "newest") {
      data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortType === "oldest") {
      data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortType === "lowToHigh") {
      data.sort((a, b) => a.price - b.price);
    } else if (sortType === "highToLow") {
      data.sort((a, b) => b.price - a.price);
    }

    setFiltered(data);
  }, [search, category, sortType, location, priceRange, posts]);

  // SOCKET EVENTS
  useEffect(() => {
    if (!socket || !user) return;

    socket.on("online-users", (online) => setOnlineUsers(online));

    socket.on("receive-message", (msg) => {
      setMessages((prev) => [...prev, { ...msg, fromSelf: false }]);
    });

    socket.on("typing", ({ from }) => {
      if (from === chatWith?.farmerId) {
        setTyping(true);
        setTimeout(() => setTyping(false), 1500);
      }
    });

    return () => {
      socket.off("receive-message");
      socket.off("typing");
      socket.off("online-users");
    };
  }, [socket, chatWith]);

  // SEND MESSAGE
  const sendMessage = (text, resetInput) => {
    if (!text.trim() || !chatWith) return;

    const msg = {
      message: text,
      from: user.id,
      to: chatWith.farmerId,
      time: new Date()
    };

    socket.emit("send-message", msg);

    setMessages((prev) => [...prev, { ...msg, fromSelf: true }]);

    resetInput("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <div className="bg-green-700 text-white py-10 shadow-lg mb-6">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold">Marketplace</h1>
          <p className="text-green-100 text-lg mt-2">
            Buy fresh produce directly from farmers
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-8">

        {/* SIDEBAR FILTERS */}
        <div className="bg-white shadow-xl rounded-2xl p-6 w-full lg:w-1/4 h-fit sticky top-24">

          <h2 className="font-semibold text-lg mb-4">Filters</h2>

          <input
            type="text"
            placeholder="Search produce..."
            className="w-full p-3 rounded-xl border mb-4"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <p className="font-medium mb-2">Category</p>
          <select
            className="w-full border p-3 rounded-xl mb-4"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>

          <p className="font-medium mb-2">Location</p>
          <input
            type="text"
            placeholder="Enter village/city"
            className="w-full p-3 rounded-xl border mb-4"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <p className="font-medium mb-2">Price Range</p>
          <div className="flex gap-2 mb-4">
            <input
              type="number"
              placeholder="Min"
              className="w-1/2 p-2 border rounded-xl"
              value={priceRange[0]}
              onChange={(e) =>
                setPriceRange([Number(e.target.value), priceRange[1]])
              }
            />
            <input
              type="number"
              placeholder="Max"
              className="w-1/2 p-2 border rounded-xl"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], Number(e.target.value)])
              }
            />
          </div>

          <p className="font-medium mb-2">Sort by</p>
          <select
            className="w-full border p-3 rounded-xl"
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>

        {/* PRODUCT GRID */}
        <div className="flex-1">
          {loading ? (
            <p>Loading...</p>
          ) : filtered.length === 0 ? (
            <p className="text-center py-20 text-gray-500">No products found</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((post) => (
                <div
                  key={post._id}
                  onClick={() => setSelectedPost(post)}
                  className="cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-xl transition border"
                >
                  <img
                    src={post.media}
                    alt=""
                    className="w-full h-48 object-cover rounded-t-2xl"
                  />

                  <div className="p-5">
                    <h2 className="text-lg font-bold">{post.title}</h2>

                    <p className="text-gray-500 text-sm mt-1 mb-2 line-clamp-2">
                      {post.description}
                    </p>

                    <div className="flex justify-between items-center">
                      <span className="text-green-600 font-bold text-xl">
                        ₹{post.price}
                      </span>
                      <span className="text-sm">{post.quantity} {post.unit}</span>
                    </div>

                    <p className="text-sm mt-2">📍 {post.location}</p>
                    <p className="text-sm">👨‍🌾 {post.farmerName}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* PRODUCT POPUP */}
      {selectedPost && (
        <ProductPopup
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
          onChatStart={(farmerId, farmerName) => {
            setChatWith({ farmerId, farmerName });
            setSelectedPost(null);
            setMessages([]);
          }}
        />
      )}

      {/* CHAT WINDOW */}
      {chatWith && (
        <div className="fixed bottom-5 right-5 w-full max-w-md z-50">
          <ChatWindow
            chat={chatWith}
            messages={messages}
            isTyping={typing}
            onlineUsers={onlineUsers}
            onSend={sendMessage}
            startVoice={startVoiceRecognition}
          />
        </div>
      )}
    </div>
  );
};

export default Marketplace;
