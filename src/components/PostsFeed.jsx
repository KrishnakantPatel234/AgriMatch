import React, { useEffect, useState } from 'react';
import { postsAPI } from '../services/Api';

const PostsFeed = ({ userType }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPosts = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await postsAPI.list({ userType });
      setPosts(data?.data || []);
    } catch (e) {
      setError('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userType]);

  if (loading) return <div className="p-4 text-gray-500">Loading posts...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;

  if (!posts.length) return (
    <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg text-center text-gray-600">
      No posts yet.
    </div>
  );

  return (
    <div className="space-y-4">
      {posts.map((p) => (
        <div key={p._id} className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500 capitalize">{p.userType}</div>
            <div className="text-xs text-gray-400">{new Date(p.createdAt).toLocaleString()}</div>
          </div>
          {p.title && <h4 className="text-lg font-semibold mt-1">{p.title}</h4>}
          {p.description && <p className="text-gray-700 mt-1">{p.description}</p>}

          {/* Role-specific fields quick view */}
          {p.userType === 'farmer' && p.cropDetails && (
            <div className="mt-2 text-sm text-gray-600 grid grid-cols-2 gap-2">
              {p.cropDetails.cropName && <div>Crop: {p.cropDetails.cropName}</div>}
              {p.cropDetails.quantity && <div>Qty: {p.cropDetails.quantity} {p.cropDetails.unit || ''}</div>}
              {p.cropDetails.price && <div>Price: ₹{p.cropDetails.price}</div>}
              {p.cropDetails.harvestDate && <div>Harvest: {new Date(p.cropDetails.harvestDate).toLocaleDateString()}</div>}
            </div>
          )}

          {p.userType === 'buyer' && p.requirementDetails && (
            <div className="mt-2 text-sm text-gray-600 grid grid-cols-2 gap-2">
              {p.requirementDetails.product && <div>Need: {p.requirementDetails.product}</div>}
              {p.requirementDetails.quantity && <div>Qty: {p.requirementDetails.quantity}</div>}
              {p.requirementDetails.budget && <div>Budget: ₹{p.requirementDetails.budget}</div>}
              {p.requirementDetails.deliveryDate && <div>By: {new Date(p.requirementDetails.deliveryDate).toLocaleDateString()}</div>}
            </div>
          )}

          {p.userType === 'transport' && p.transportDetails && (
            <div className="mt-2 text-sm text-gray-600 grid grid-cols-2 gap-2">
              {p.transportDetails.vehicleType && <div>Vehicle: {p.transportDetails.vehicleType}</div>}
              {p.transportDetails.capacity && <div>Capacity: {p.transportDetails.capacity}</div>}
              {p.transportDetails.fromLocation && <div>From: {p.transportDetails.fromLocation}</div>}
              {p.transportDetails.toLocation && <div>To: {p.transportDetails.toLocation}</div>}
              {p.transportDetails.price && <div>Price: ₹{p.transportDetails.price}</div>}
            </div>
          )}

          {p.userType === 'storage' && p.storageDetails && (
            <div className="mt-2 text-sm text-gray-600 grid grid-cols-2 gap-2">
              {p.storageDetails.spaceAvailable && <div>Space: {p.storageDetails.spaceAvailable} kg</div>}
              {p.storageDetails.temperature && <div>Temp: {p.storageDetails.temperature}</div>}
              {p.storageDetails.location && <div>Location: {p.storageDetails.location}</div>}
              {p.storageDetails.pricePerKg && <div>₹/kg: {p.storageDetails.pricePerKg}</div>}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PostsFeed;
