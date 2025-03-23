import Mongoose from "mongoose";

const { Schema } = Mongoose;

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  score: Number,
});

export const User = Mongoose.model("User", userSchema);
