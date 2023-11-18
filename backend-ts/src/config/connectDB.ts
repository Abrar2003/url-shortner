import mongoose from "mongoose";


const connectDB = async (): Promise<void> => {
  // Log the MongoDB URI before attempting to connect
  console.log('MongoDB URI:', process.env.MONGO_URI);

  const MONGO_URI: string = process.env.MONGO_URI || '';

  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`Connected to mongodb ${conn.connection.host}`);
  } catch (err) {
    console.log("Error in MongoDB", err);
  }
};

export default connectDB;
