import { useLanguage } from '../context/LanguageContext';
import cloudinaryAPI from '../api/cloudinaryAPI';
import postsAPI from '../api/postsAPI';
import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useVoiceRecognition } from "../hooks/UseVoiceRecognition";
import { toast } from "react-toastify";
import {
  FaMicrophone,
  FaTimes,
  FaUpload,
  FaCamera
} from "react-icons/fa";

const VoicePostCreator = ({ onPostCreated, onClose }) => {
  const { user } = useAuth() || {};
  const { language } = useLanguage();

  const [isListening, setIsListening] = useState(false);
  const [activeVoiceField, setActiveVoiceField] = useState(null);

  // Form fields
  const [title, setTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("kg");

  // NEW FIELDS
  const [cropType, setCropType] = useState("");
  const [qualityGrade, setQualityGrade] = useState("A");
  const [availableFrom, setAvailableFrom] = useState("");
  const [deliveryOptions, setDeliveryOptions] = useState("pickup");
  const [location, setLocation] = useState("");

  // Media upload
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const fileInputRef = useRef(null);
  const videoRef = useRef(null);

  const [loading, setLoading] = useState(false);

  const getLanguageCode = (lang) => {
    const codes = { en: "en-US", hi: "hi-IN", mr: "mr-IN" };
    return codes[lang] || "en-US";
  };

  const voiceRecognition = useVoiceRecognition(getLanguageCode(language));

  /** ----------------------------
   *  HANDLE VOICE TRANSCRIPT UPDATE
   * -----------------------------*/
  useEffect(() => {
    if (!voiceRecognition.transcript || !activeVoiceField) return;

    const text = voiceRecognition.transcript;

    switch (activeVoiceField) {
      case "title":
        setTitle(text);
        break;
      case "content":
        setPostContent(text);
        break;
      case "price":
        setPrice(text.replace(/[^\d.]/g, ""));
        break;
      case "quantity":
        setQuantity(text.replace(/[^\d.]/g, ""));
        break;
      case "cropType":
        setCropType(text);
        break;
      case "location":
        setLocation(text);
        break;
      default:
        break;
    }

    setActiveVoiceField(null);
    setIsListening(false);
    voiceRecognition.stopListening();

  }, [voiceRecognition.transcript]);


  /** ----------------------------
   *  START / STOP VOICE INPUT
   * -----------------------------*/
  const handleVoiceInput = (field) => {
  if (voiceRecognition.isListening && activeVoiceField === field) {
    voiceRecognition.stopListening();
    setActiveVoiceField(null);
    setIsListening(false);
    return;
  }

  setActiveVoiceField(field);
  setIsListening(true);

  // ✔️ Correct function call
  voiceRecognition.startListening();
  };


  /** ----------------------------
   *  IMAGE UPLOAD
   * -----------------------------*/
  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setSelectedImage(file);

    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target.result);
    reader.readAsDataURL(file);
  };

  /** ----------------------------
   *  CREATE POST
   * -----------------------------*/
  const handleCreatePost = async () => {
    if (!title || !postContent || !price || !quantity || !cropType || !location) {
      toast.error("Please fill all required fields");
      return;
    }

    if (!user) {
      toast.error("User not logged in");
      return;
    }

    setLoading(true);

    try {
      let uploadedMedia = [];

      if (selectedImage) {
        const upload = await cloudinaryAPI.uploadImage(selectedImage);
        uploadedMedia.push({
          url: upload.secure_url,
          public_id: upload.public_id,
          resource_type: "image"
        });
      }

      const data = {
        title,
        description: postContent,
        price: parseFloat(price),
        quantity: parseFloat(quantity),
        unit,

        // NEW FIELDS
        cropType,
        qualityGrade,
        availableFrom,
        deliveryOptions,
        location,

        media: uploadedMedia,
      };

      const response = await postsAPI.createPost(data);

      onPostCreated(response.data.post);
      toast.success("Post created successfully!");

      // Reset fields
      setTitle("");
      setPostContent("");
      setPrice("");
      setQuantity("");
      setCropType("");
      setLocation("");
      setSelectedImage(null);
      setImagePreview(null);

    } catch (err) {
      console.error(err);
      toast.error("Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Create Post</h2>
          <button onClick={onClose}>
            <FaTimes className="w-6 h-6 text-gray-600 hover:text-gray-800" />
          </button>
        </div>

        <div className="p-6 space-y-6">

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
            <div className="relative">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 pr-16 border rounded-md"
              />
              <FaMicrophone
                onClick={() => handleVoiceInput("title")}
                className="absolute right-3 top-3 cursor-pointer text-gray-500"
              />
            </div>
          </div>

          {/* Crop Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Crop Type *</label>
            <div className="relative">
              <input
                type="text"
                value={cropType}
                onChange={(e) => setCropType(e.target.value)}
                className="w-full px-3 py-2 pr-16 border rounded-md"
              />
              <FaMicrophone
                onClick={() => handleVoiceInput("cropType")}
                className="absolute right-3 top-3 cursor-pointer text-gray-500"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
            <textarea
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              rows="3"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
            <div className="relative">
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 pr-16 border rounded-md"
              />
              <FaMicrophone
                onClick={() => handleVoiceInput("location")}
                className="absolute right-3 top-3 cursor-pointer text-gray-500"
              />
            </div>
          </div>

          {/* Pricing Row */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm mb-2">Price (₹) *</label>
              <input type="number" className="w-full px-3 py-2 border rounded-md"
                value={price}
                onChange={(e) => setPrice(e.target.value)} />
            </div>

            <div>
              <label className="block text-sm mb-2">Quantity *</label>
              <input type="number" className="w-full px-3 py-2 border rounded-md"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)} />
            </div>

            <div>
              <label className="block text-sm mb-2">Unit *</label>
              <select className="w-full px-3 py-2 border rounded-md"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}>
                <option>kg</option>
                <option>ton</option>
                <option>quintal</option>
                <option>piece</option>
                <option>bundle</option>
              </select>
            </div>
          </div>

          {/* Quality + Delivery */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-2">Quality Grade</label>
              <select
                value={qualityGrade}
                onChange={(e) => setQualityGrade(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="A">Grade A</option>
                <option value="B">Grade B</option>
                <option value="C">Grade C</option>
              </select>
            </div>

            <div>
              <label className="block text-sm mb-2">Delivery Options</label>
              <select
                value={deliveryOptions}
                onChange={(e) => setDeliveryOptions(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="pickup">Pickup Only</option>
                <option value="delivery">Delivery</option>
                <option value="both">Both</option>
              </select>
            </div>
          </div>

          {/* Available From */}
          <div>
            <label className="block text-sm mb-2">Available From</label>
            <input
              type="date"
              className="w-full px-3 py-2 border rounded-md"
              value={availableFrom}
              onChange={(e) => setAvailableFrom(e.target.value)}
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm mb-2">Upload Image</label>
            {imagePreview ? (
              <div className="space-y-3">
                <img src={imagePreview} className="max-h-48 rounded-lg mx-auto" />
                <button
                  onClick={() => { setSelectedImage(null); setImagePreview(null); }}
                  className="text-red-500 underline"
                >
                  Remove Image
                </button>
              </div>
            ) : (
              <button
                onClick={() => fileInputRef.current.click()}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
              >
                <FaUpload /> Upload
              </button>
            )}

            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleImageSelect}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t flex justify-end gap-3">
          <button onClick={onClose} className="px-6 py-2 border rounded-lg">Close</button>

          <button
            onClick={handleCreatePost}
            disabled={loading}
            className="px-6 py-2 bg-green-600 text-white rounded-lg"
          >
            {loading ? "Creating..." : "Create Post"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default VoicePostCreator;
