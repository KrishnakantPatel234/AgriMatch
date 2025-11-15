// src/api/postsAPI.js
import API from "./api.js"; // your main axios wrapper

// ------------------------------
// Create Post
// ------------------------------
export const createPost = async (data) => {
  try {
    const res = await API.post("/posts", data);
    return res.data;
  } catch (err) {
    console.error("Create Post Error:", err);
    throw err.response?.data || { message: "Something went wrong" };
  }
};

// ------------------------------
// Get All Posts
// ------------------------------
export const getAllPosts = async () => {
  try {
    const res = await API.get("/posts");
    return res.data;
  } catch (err) {
    console.error("Get Posts Error:", err);
    throw err.response?.data || { message: "Unable to fetch posts" };
  }
};

// ------------------------------
// Get Single Post
// ------------------------------
export const getPostById = async (id) => {
  try {
    const res = await API.get(`/posts/${id}`);
    return res.data;
  } catch (err) {
    console.error("Get Post Error:", err);
    throw err.response?.data || { message: "Post not found" };
  }
};

// ------------------------------
// Delete Post
// ------------------------------
export const deletePost = async (id) => {
  try {
    const res = await API.delete(`/posts/${id}`);
    return res.data;
  } catch (err) {
    console.error("Delete Post Error:", err);
    throw err.response?.data || { message: "Unable to delete post" };
  }
};

// ------------------------------
// Update Post
// ------------------------------
export const updatePost = async (id, data) => {
  try {
    const res = await API.put(`/posts/${id}`, data);
    return res.data;
  } catch (err) {
    console.error("Update Post Error:", err);
    throw err.response?.data || { message: "Unable to update post" };
  }
};

const postsAPI = { createPost, deletePost };
export default postsAPI;
