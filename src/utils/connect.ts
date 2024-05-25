/* import mongoose from "mongoose";

export default async function connectDB() {
    const mongoURI = process.env.MONGO_URI as string;
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error(err);
    }
} */

import mongoose from "mongoose";
const url = process.env.MONGO_URI as string;
let connection: typeof mongoose;
const connectDB = async () => {
    if (!connection) connection = await mongoose.connect(url);

}
export default connectDB;
