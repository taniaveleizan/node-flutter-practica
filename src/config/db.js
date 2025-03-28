import { connect } from "mongoose";
import {MONGODB_URI} from './config.js';

export const connectDB = async () => {
    try {
      const db = await connect(MONGODB_URI);
      console.log("connected to db:", db.connection.name);
    } catch (error) {
      console.error(error);
    }
};