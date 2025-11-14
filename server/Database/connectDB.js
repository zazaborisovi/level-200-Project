import mongoose from "mongoose"

export default async function connectDB () {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI)
    
    console.log(`MongoDB connected at ${conn.connection.host}`);
  } catch (error) {
    console.error(error.message);
  }
};