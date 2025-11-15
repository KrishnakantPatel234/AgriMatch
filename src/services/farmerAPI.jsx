import API from "../api/api";

export const farmerAPI = {
  // Get farmer's complete data
  getFarmData: (farmerId) => API.get(`/farmers/${farmerId}`),

  // Update farmer profile
  updateProfile: (farmerId, data) => API.put(`/farmers/${farmerId}`, data),

  // Get farmer's crops
  getCrops: (farmerId) => API.get(`/farmers/${farmerId}/crops`),

  // Add new crop
  addCrop: (farmerId, cropData) =>
    API.post(`/farmers/${farmerId}/crops`, cropData),

  // Update crop
  updateCrop: (farmerId, cropId, data) =>
    API.put(`/farmers/${farmerId}/crops/${cropId}`, data),

  // Delete crop
  deleteCrop: (farmerId, cropId) =>
    API.delete(`/farmers/${farmerId}/crops/${cropId}`),

  // Get farmer's stats
  getStats: (farmerId) => API.get(`/farmers/${farmerId}/stats`),

  // Get market insights
  getMarketInsights: (farmerId) =>
    API.get(`/farmers/${farmerId}/market-insights`),
};
