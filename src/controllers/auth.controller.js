import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const checkLoginStatus = async (req, res) => {
  try {
    // Get token from Authorization header
    const token = req.header("Authorization")?.split(" ")[1] ?? null;
    if (!token) {
      return res
        .status(401)
        .json({ loggedIn: false, message: "Not logged in" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    // Check if user exists
    if (!user) {
      return res
        .status(404)
        .json({ loggedIn: false, message: "User not found" });
    }

    // Check token expiry
    const tokenExpiration = new Date(decoded.exp * 1000);
    if (tokenExpiration < new Date()) {
      return res
        .status(401)
        .json({ loggedIn: false, message: "Session expired" });
    }

    // Return logged-in status
    res.status(200).json({ loggedIn: true, user });
  } catch (error) {
    res.status(400).json({ loggedIn: false, message: "Invalid token" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404).json({ message: "User not found " });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body);

    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
