import mongoose from "mongoose";
import { DB_URL } from "./serverConfig.js";
import User from "../schema/user.js";

export default async function connectDB(){
    if (!DB_URL) {
        throw new Error("DB_URL is not configured");
    }

    await mongoose.connect(DB_URL);
    // Build the unique email/username indexes before requests are accepted.
    await User.init();
    console.log('Connected to MongoDB');
}
