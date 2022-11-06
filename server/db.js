import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const dbConnect = async () => {
  try {
    const db = await mongoose.connect(
      `mongodb://${process.env.MONGOUSER}:${process.env.MONGOPASSWORD}@${process.env.MONGOHOST}:${process.env.MONGOPORT}`
    );
    console.log(`connected to ${db.connections[0].name}`);
  } catch (error) {
    console.log(error);
  }
};
