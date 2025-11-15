import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");

      if (token && userData) {
        const parsedUser = JSON.parse(userData);

        // Validate token with backend (optional but recommended)
        try {
          // Uncomment when you have backend API
          // const Api = await import('../services/Api');
          // const response = await Api.authAPI.validateToken(token);
          // setUser(response.data.user);

          // For now, use stored user data
          setUser(parsedUser);
        } catch (error) {
          console.error("Token validation failed:", error);
          logout();
        }
      }
    } catch (error) {
      console.error("Auth check error:", error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const normalizePhone = (input) => {
    if (!input) return "";
    const digits = String(input).replace(/\D/g, "");

    // If already has country code 91 at start and length 12 -> use +91XXXXXXXXXX
    if (digits.length === 12 && digits.startsWith("91")) return `+${digits}`;
    // If 10 digits, assume India
    if (digits.length === 10) return `+91${digits}`;
    // Fallback to original with plus if missing
    return digits ? `+${digits}` : "";
  };

  const validateCredentials = (credentials, language = "en") => {
    const { email, phone, password } = credentials;

    if (!password || password.length < 6) {
      throw new Error(getErrorMessage("passwordLength", language));
    }

    if (!email && !phone) {
      throw new Error(getErrorMessage("fillAllFields", language));
    }

    if (email && !/\S+@\S+\.\S+/.test(email)) {
      throw new Error(getErrorMessage("invalidEmail", language));
    }

    if (phone) {
      const normalizedPhone = normalizePhone(phone);
      if (normalizedPhone.length < 10) {
        throw new Error(getErrorMessage("invalidPhone", language));
      }
    }

    return true;
  };

  const login = async (credentials, language = "en") => {
    try {
      setLoading(true);

      // Validate credentials
      validateCredentials(credentials, language);

      // Prepare payload
      const phone = credentials.phone
        ? normalizePhone(credentials.phone)
        : undefined;
      const payload = credentials.email
        ? { email: credentials.email, password: credentials.password }
        : { phone, password: credentials.password };

      try {
        // Call backend API
        const Api = await import("../api/api");
        const response = await Api.authAPI.login(payload);
        const { token, user: apiUser } = response.data;

        // Store auth data
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(apiUser));
        setUser(apiUser);

        toast.success(getSuccessMessage("loginSuccess", language));
        return { success: true, user: apiUser };
      } catch (apiError) {
        // Handle API errors
        const errorMessage =
          apiError.response?.data?.message ||
          apiError.message ||
          getErrorMessage("loginFailed", language);
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.message);
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData, language = "en") => {
    try {
      setLoading(true);

      // Validation
      if (!userData.name || !userData.password) {
        throw new Error(getErrorMessage("fillAllFields", language));
      }

      if (userData.password.length < 6) {
        throw new Error(getErrorMessage("passwordLength", language));
      }

      // Prepare payload
      const phone = userData.phone ? normalizePhone(userData.phone) : undefined;
      const payload = {
        name: userData.name.trim(),
        email: userData.email?.trim() || undefined,
        phone: phone,
        password: userData.password,
        role: userData.role || "farmer",
      };

      try {
        // Call backend API
        const Api = await import("../api/api");
        const response = await Api.authAPI.register(payload);
        const { token, user: newUser } = response.data;

        // Store auth data
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(newUser));
        setUser(newUser);

        const successMessage = getSuccessMessage(
          "registrationSuccess",
          language
        ).replace("{name}", userData.name);
        toast.success(successMessage);
        return { success: true, user: newUser };
      } catch (apiError) {
        const errorMessage =
          apiError.response?.data?.message ||
          apiError.message ||
          getErrorMessage("registrationFailed", language);
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(error.message);
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    toast.info(getSuccessMessage("logoutSuccess", "en"));
  };

  const updateUser = (updatedUser) => {
    try {
      const newUserData = { ...user, ...updatedUser };
      setUser(newUserData);
      localStorage.setItem("user", JSON.stringify(newUserData));
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Update user error:", error);
      toast.error("Failed to update profile");
    }
  };

  const updatePreferences = (newPreferences) => {
    try {
      const updatedUser = {
        ...user,
        preferences: { ...user?.preferences, ...newPreferences },
      };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      toast.success("Preferences updated!");
    } catch (error) {
      console.error("Update preferences error:", error);
      toast.error("Failed to update preferences");
    }
  };

  // Multilingual error messages
  const getErrorMessage = (key, language = "en") => {
    const messages = {
      fillAllFields: {
        en: "Please fill in all required fields",
        hi: "कृपया सभी आवश्यक फ़ील्ड भरें",
        mr: "कृपया सर्व आवश्यक फील्ड भरा",
      },
      passwordLength: {
        en: "Password must be at least 6 characters long",
        hi: "पासवर्ड कम से कम 6 अक्षर लंबा होना चाहिए",
        mr: "पासवर्ड किमान ६ वर्ण लांब असणे आवश्यक आहे",
      },
      invalidEmail: {
        en: "Please enter a valid email address",
        hi: "कृपया एक वैध ईमेल पता दर्ज करें",
        mr: "कृपया एक वैध ईमेल पत्ता प्रविष्ट करा",
      },
      invalidPhone: {
        en: "Please enter a valid phone number",
        hi: "कृपया एक वैध फोन नंबर दर्ज करें",
        mr: "कृपया एक वैध फोन नंबर प्रविष्ट करा",
      },
      loginFailed: {
        en: "Login failed. Please check your credentials.",
        hi: "लॉगिन विफल। कृपया अपनी साख जांचें।",
        mr: "लॉगिन अयशस्वी. कृपया आपली सत्यापन तपासा.",
      },
      registrationFailed: {
        en: "Registration failed. Please try again.",
        hi: "पंजीकरण विफल। कृपया पुनः प्रयास करें।",
        mr: "नोंदणी अयशस्वी. कृपया पुन्हा प्रयत्न करा.",
      },
    };
    return messages[key]?.[language] || messages[key]?.en || key;
  };

  // Multilingual success messages
  const getSuccessMessage = (key, language = "en") => {
    const messages = {
      loginSuccess: {
        en: "Login successful!",
        hi: "लॉगिन सफल!",
        mr: "लॉगिन यशस्वी!",
      },
      registrationSuccess: {
        en: "Registration successful! Welcome to AgriMatch, {name}!",
        hi: "पंजीकरण सफल! AgriMatch में आपका स्वागत है, {name}!",
        mr: "नोंदणी यशस्वी! AgriMatch मध्ये आपले स्वागत आहे, {name}!",
      },
      logoutSuccess: {
        en: "Logged out successfully",
        hi: "सफलतापूर्वक लॉग आउट हो गया",
        mr: "यशस्वीरित्या लॉग आउट झाले",
      },
    };
    return messages[key]?.[language] || messages[key]?.en || key;
  };

  const value = {
    user,
    login,
    register,
    logout,
    updateUser,
    updatePreferences,
    loading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
