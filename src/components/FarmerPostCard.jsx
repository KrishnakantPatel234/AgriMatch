import React from "react";
import { FaMapMarkerAlt, FaRupeeSign, FaSeedling } from "react-icons/fa";

const FarmerPostCard = ({ post }) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300">

      {/* Image */}
      {post.media && post.media.length > 0 && (
        <img
          src={post.media[0].url}
          alt="post media"
          className="w-full h-56 object-cover"
        />
      )}

      <div className="p-5 space-y-3">

        {/* Title Row */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">{post.title}</h2>
          <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
            {post.category || "Produce"}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed">
          {post.description?.slice(0, 120)}...
        </p>

        {/* Crop Type */}
        <div className="flex items-center gap-2 text-green-700">
          <FaSeedling />
          <span className="font-medium">{post.cropType}</span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-gray-600">
          <FaMapMarkerAlt />
          <span>{post.location}</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-1 text-xl text-green-700 font-bold">
            <FaRupeeSign />
            {post.price}
            <span className="text-sm text-gray-500 ml-1">/ {post.unit}</span>
          </div>

          <span className="text-gray-500 text-sm">
            Qty: <strong>{post.quantity}</strong> {post.unit}
          </span>
        </div>

        {/* Quality + Availability */}
        <div className="grid grid-cols-2 gap-3 mt-3 text-sm">
          <div className="bg-gray-100 px-3 py-2 rounded-lg text-gray-700">
            <span className="font-medium">Quality:</span> {post.qualityGrade}
          </div>

          <div className="bg-gray-100 px-3 py-2 rounded-lg text-gray-700">
            <span className="font-medium">Available:</span>{" "}
            {post.availableFrom
              ? new Date(post.availableFrom).toLocaleDateString()
              : "Now"}
          </div>
        </div>

        {/* Delivery Options */}
        <div className="mt-3">
          <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
            Delivery: {post.deliveryOptions}
          </span>
        </div>

        {/* Date */}
        <p className="text-xs text-gray-400 mt-3">
          Posted on: {new Date(post.createdAt).toLocaleDateString()}
        </p>

      </div>
    </div>
  );
};

export default FarmerPostCard;
