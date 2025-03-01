// https://github.com/SeanKervick/hikeplaceV2/blob/master/src/controllers/accounts-controller.js
import bcrypt from "bcrypt";
import { User } from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";

export const accountsController = {
  signup: async (req, res) => {
    const { username, email, password } = req.body;

    try {
      // check if user already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "email address already in-use" });
      }

      // hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log("hashed password:", hashedPassword);

      // create user
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });
      console.log("user created:", newUser);

      // save user
      const savedUser = await newUser.save();
      console.log("user saved:", savedUser);

      // generate a token
      const token = generateToken(savedUser._id);
      res.status(201).json({ message: "user created successfully", token });
    } catch (error) {
      res.status(500).json({ message: "backend signup error" });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      // search database by email address
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: "user not found" });

      // compare provided password with stored hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) return res.status(400).json({ message: "Invalid email or password" });

      // successful login, generate token
      const token = generateToken(user._id);
      res.status(200).json({ message: "login successful", token });

    } catch (error) {
      res.status(500).json({ message: "error logging in" });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await User.find().lean();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "error getting users" });
    }
  },

    deleteAllUsers: async (req, res) => {
      try {
        await User.deleteMany({});
        res.status(200).json({ message: "users deleted successfully" }); 
      } catch (error) {
        res.status(500).json({ error: "error deleting users" });
      }
    },


};
