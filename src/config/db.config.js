import mongoose from "mongoose";
import envsConfig from "./envs.config.js";

export const connectToDB = async () => {
  try {
    await mongoose.connect(envsConfig.MONGO_URL);
    console.log("MongoDB connected");
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};
