const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

class AuthController {
  // ============================
  // LOGIN
  // ============================
  async login(req, res) {
    try {
      const { email, phone, password } = req.body;

      // Find user in MongoDB
      const user = await User.findOne({
        $or: [{ email }, { phone }],
      }).select("+password");

      if (!user) {
        return res.status(401).json({
          message: "Invalid credentials - User not found",
        });
      }

      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({
          message: "Invalid credentials - Wrong password",
        });
      }

      // Generate JWT
      const token = jwt.sign(
        {
          userId: user._id,
          role: user.role,
        },
        JWT_SECRET,
        { expiresIn: "24h" }
      );

      const userObj = user.toJSON();

      res.json({
        message: "Login successful",
        token,
        user: userObj,
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  // ============================
  // REGISTER USER
  // ============================
  async register(req, res) {
    try {
      const { name, email, phone, password, role } = req.body;

      // Check existing user
      const existingUser = await User.findOne({
        $or: [{ email }, { phone }],
      });

      if (existingUser) {
        return res.status(400).json({
          message: "User already exists with this email/phone",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const newUser = await User.create({
        name,
        email,
        phone,
        password: hashedPassword,
        role: role || "farmer",
        isVerified: false,
      });

      const token = jwt.sign(
        {
          userId: newUser._id,
          role: newUser.role,
        },
        JWT_SECRET,
        { expiresIn: "24h" }
      );

      const userObj = newUser.toJSON();

      res.status(201).json({
        message: "Registration successful",
        token,
        user: userObj,
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  // ============================
  // GET CURRENT USER
  // ============================
  async getMe(req, res) {
    try {
      const user = await User.findById(req.userId);
      if (!user) return res.status(404).json({ message: "User not found" });

      res.json({ user: user.toJSON() });
    } catch (error) {
      console.error("GetMe error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  // ============================
  // VALIDATE TOKEN
  // ============================
  async validateToken(req, res) {
    try {
      const user = await User.findById(req.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ valid: true, user: user.toJSON() });
    } catch (error) {
      console.error("Validate token error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  // ============================
  // LOGOUT (client side)
  // ============================
  async logout(req, res) {
    res.json({ message: "Logout successful" });
  }
}

module.exports = new AuthController();
