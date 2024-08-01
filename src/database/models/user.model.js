import mongoose, { Types } from "mongoose";

const userCollection = "user";

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  cart: { type: Types.ObjectId, required: true, ref: "cart" },
  role: { type: String, required: true, default: "user" },
});

userSchema.pre("findOne", function () {
  this.populate("cart");
});

export const userModel = mongoose.model(userCollection, userSchema);
