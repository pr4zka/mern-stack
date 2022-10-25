import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
import { PASSWORD } from './config.js'

export const dbConnect = async () => {
  try {
    const db = await mongoose.connect(
      `mongodb+srv://pr4zka:Narutoshippuden2022@cluster0.knqzl.mongodb.net/reactmern`
    );
    console.log(`connected to ${db.connections[0].name}`);
  } catch (error) {
    console.log(error);
  }
};


