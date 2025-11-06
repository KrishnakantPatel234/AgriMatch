import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { HiEye, HiEyeOff } from "react-icons/hi";

const sanitizeEmail = (value) => {
  let cleaned = value.replace(/\s+/g, "").toLowerCase();
  if (cleaned.endsWith("gmail.com") && !cleaned.includes("@")) {
    cleaned = cleaned.replace("gmail.com", "@gmail.com");
  }
  return cleaned;
};

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Auto email fix only on email input
    const finalValue = name === "email" ? sanitizeEmail(value) : value;

    setFormData((prev) => ({ ...prev, [name]: finalValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    // Basic validation
    if (!email || !password) return toast.error("All fields are required");
    if (!email.includes("@") || !email.includes(".")) return toast.error("Invalid email");

    setLoading(true);
    try {
      const result = await login(formData);
      if (result.success) {
        toast.success("Logged in successfully");
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
      toast.error("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    toast.info("Google Login coming soon...");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800">Sign in to AgriMatch</h2>
        <p className="text-center text-sm mt-2 text-gray-600">
          New here?{" "}
          <Link to="/register" className="text-green-600 font-medium hover:underline">
            Create an account
          </Link>
        </p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          
          {/* Email Input */}
          <div>
            <input
              type="text"
              name="email"
              placeholder="Email address"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              value={formData.password}
              onChange={handleChange}
            />
            <span
              className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
              onClick={() => setShowPass((p) => !p)}
            >
              {showPass ? <HiEyeOff size={20} /> : <HiEye size={20} />}
            </span>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-2">
            <div className="h-[1px] bg-gray-300 w-full"></div>
            <span className="text-gray-500 text-sm">or</span>
            <div className="h-[1px] bg-gray-300 w-full"></div>
          </div>

          {/* Google Login */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 border py-2 rounded-lg hover:bg-gray-100 transition"
          >
            <FcGoogle size={22} /> Continue with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
