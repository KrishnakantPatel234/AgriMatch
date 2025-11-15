import React from "react";

const ProductPopup = ({ post, onClose, onChatStart }) => {
  if (!post) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl overflow-hidden animate-fadeIn">
        
        {/* HEADER */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <button 
            onClick={onClose} 
            className="text-2xl font-bold text-gray-500 hover:text-red-500"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* IMAGE */}
          <img 
            src={post.media}
            alt={post.title}
            className="w-full h-80 object-cover"
          />

          {/* DETAILS */}
          <div className="p-5 space-y-4">
            <p className="text-lg font-bold text-green-600">
              ₹{post.price} / {post.unit}
            </p>

            <p className="text-gray-700">{post.description}</p>

            <div className="pt-3 space-y-2">
              <p className="text-sm text-gray-700">📦 {post.quantity} {post.unit}</p>
              <p className="text-sm text-gray-700">📍 {post.location}</p>
              <p className="text-sm text-gray-700">👨‍🌾 {post.farmerName}</p>
            </div>

            <button
              onClick={() => onChatStart(post.farmerId, post.farmerName)}
              className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition"
            >
              💬 Contact Farmer
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductPopup;
