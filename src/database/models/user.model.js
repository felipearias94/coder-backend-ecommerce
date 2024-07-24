import mongoose, { Types } from "mongoose";

const userCollection = "user";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
});

export const userModel = mongoose.model(userCollection, userSchema);
