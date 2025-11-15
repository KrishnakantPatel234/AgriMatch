import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { FaEdit, FaTrash, FaCheck, FaPhone, FaEnvelope } from 'react-icons/fa';

const PostsFeed = ({ userType = 'all', refresh = false }) => {
  const { user } = useAuth();
  const { language } = useLanguage();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, [userType, refresh]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      let response;
      
      if (userType === 'farmer' && user) {
        response = await postsAPI.getFarmerPosts(user.id);
        setPosts(response.data.posts || []);
      } else {
        response = await postsAPI.getAllPosts();
        setPosts(response.data.posts || []);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      await postsAPI.deletePost(postId);
      setPosts(posts.filter(post => post._id !== postId));
      toast.success('Post deleted successfully');
    } catch (error) {
      console.error('Delete post error:', error);
      toast.error('Failed to delete post');
    }
  };

  const handleMarkAsSold = async (postId) => {
    try {
      await postsAPI.markAsSold(postId);
      setPosts(posts.map(post => 
        post._id === postId ? { ...post, status: 'sold' } : post
      ));
      toast.success('Post marked as sold');
    } catch (error) {
      console.error('Mark as sold error:', error);
      toast.error('Failed to update post');
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const translations = {
    en: {
      farmersPosts: "Farmers Posts",
      yourPosts: "Your Posts",
      noPosts: "No posts available",
      price: "Price",
      quantity: "Quantity",
      contact: "Contact",
      posted: "Posted",
      by: "by",
      delete: "Delete",
      markSold: "Mark as Sold",
      sold: "SOLD",
      active: "Active",
      location: "Location",
      call: "Call",
      email: "Email"
    },
    hi: {
      farmersPosts: "किसानों की पोस्ट",
      yourPosts: "आपकी पोस्ट",
      noPosts: "कोई पोस्ट उपलब्ध नहीं",
      price: "कीमत",
      quantity: "मात्रा",
      contact: "संपर्क करें",
      posted: "पोस्ट किया गया",
      by: "द्वारा",
      delete: "हटाएं",
      markSold: "बेचा हुआ चिह्नित करें",
      sold: "बिक गया",
      active: "सक्रिय",
      location: "स्थान",
      call: "कॉल करें",
      email: "ईमेल करें"
    },
    mr: {
      farmersPosts: "शेतकऱ्यांच्या पोस्ट",
      yourPosts: "तुमच्या पोस्ट",
      noPosts: "कोणतीही पोस्ट उपलब्ध नाही",
      price: "किंमत",
      quantity: "प्रमाण",
      contact: "संपर्क साधा",
      posted: "पोस्ट केले",
      by: "कडून",
      delete: "काढा",
      markSold: "विकले म्हणून चिन्हांकित करा",
      sold: "विकले",
      active: "सक्रिय",
      location: "स्थान",
      call: "कॉल करा",
      email: "ईमेल करा"
    }
  };

  const t = translations[language] || translations.en;

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800">
        {userType === 'farmer' ? t.yourPosts : t.farmersPosts}
      </h3>
      
      {posts.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          {t.noPosts}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post._id} className={`bg-white rounded-lg shadow-md overflow-hidden border hover:shadow-lg transition-shadow duration-200 ${
              post.status === 'sold' ? 'border-gray-300 opacity-75' : 'border-gray-200'
            }`}>
              {/* Status Badge */}
              {post.status === 'sold' && (
                <div className="bg-red-500 text-white text-center py-1 text-sm font-semibold">
                  {t.sold}
                </div>
              )}
              
              {/* Post Image */}
              {post.media && (
                <img 
                  src={post.media} 
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              )}
              
              {/* Post Content */}
              <div className="p-4">
                <h4 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2">
                  {post.title}
                </h4>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                  {post.description}
                </p>
                
                {/* Price and Quantity */}
                <div className="flex justify-between items-center mb-3">
                  <div className="text-green-600 font-bold text-lg">
                    {formatCurrency(post.price)}/{post.unit}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {post.quantity} {post.unit}
                  </div>
                </div>
                
                {/* Location */}
                {post.location && (
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <span className="mr-1">📍</span>
                    {post.location}
                  </div>
                )}
                
                {/* Farmer Info and Actions */}
                <div className="flex items-center justify-between text-sm text-gray-500 border-t pt-3">
                  <div className="flex-1">
                    <div>
                      <span>{t.posted} {new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="font-medium text-gray-700">
                      {t.by} {post.farmerName}
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    {/* Contact buttons for buyers */}
                    {userType !== 'farmer' && (
                      <>
                        <button 
                          onClick={() => window.open(`tel:${post.contactInfo?.phone}`)}
                          className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition duration-200"
                          title={t.call}
                        >
                          <FaPhone className="w-3 h-3" />
                        </button>
                        {post.contactInfo?.email && (
                          <button 
                            onClick={() => window.open(`mailto:${post.contactInfo.email}`)}
                            className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition duration-200"
                            title={t.email}
                          >
                            <FaEnvelope className="w-3 h-3" />
                          </button>
                        )}
                      </>
                    )}
                    
                    {/* Action buttons for post owner */}
                    {userType === 'farmer' && user && user.id === post.farmerId && (
                      <div className="flex space-x-2">
                        {post.status === 'active' && (
                          <button
                            onClick={() => handleMarkAsSold(post._id)}
                            className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition duration-200"
                            title={t.markSold}
                          >
                            <FaCheck className="w-3 h-3" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDeletePost(post._id)}
                          className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition duration-200"
                          title={t.delete}
                        >
                          <FaTrash className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostsFeed;