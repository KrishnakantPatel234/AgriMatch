import React from "react";
import { FaMapMarkerAlt, FaRupeeSign } from "react-icons/fa";

const PostCard = ({ post }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 mb-4 border border-gray-200 hover:shadow-xl transition-all duration-300">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <img
          src={post?.farmerId?.profileImage || "/default-user.png"}
          alt="Farmer"
          className="w-12 h-12 rounded-full object-cover border border-gray-300"
        />

        <div>
          <h3 className="font-semibold text-gray-800">{post.farmerName}</h3>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <FaMapMarkerAlt className="text-red-500" />
            {post.location || "Unknown Location"}
          </p>
        </div>
      </div>

      {/* Post Image */}
      {post.media?.length > 0 && (
        <img
            src={post.media[0].url}
            className="rounded-2xl w-full object-cover"
        />
       )}

      {/* Title & Description */}
      <h2 className="text-lg font-bold text-gray-800 mb-1">{post.title}</h2>
      <p className="text-gray-600 text-sm mb-3">{post.description}</p>

      {/* Price + Quantity */}
      <div className="flex justify-between items-center bg-gray-50 p-3 rounded-xl border">
        <div className="flex items-center gap-1 text-lg font-bold text-green-700">
          <FaRupeeSign />
          {post.price}
        </div>
        <p className="text-gray-700 font-medium">
          {post.quantity} {post.unit}
        </p>
      </div>

      {/* Footer */}
      <div className="mt-3 text-sm text-gray-500 text-right">
        {new Date(post.createdAt).toLocaleString()}
      </div>
    </div>
  );
};

export default PostCard;