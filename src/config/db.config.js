import mongoose from "mongoose";

export const connectToDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://felari94:123@cluster0.w4kg2ub.mongodb.net/proyecto-final"
    );
    console.log("MongoDB connected");
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};
