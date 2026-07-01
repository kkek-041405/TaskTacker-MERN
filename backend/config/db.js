import mongoose from "mongoose";

function connectDB() {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("MongoDB connected");
        })
        .catch((error) => {
            console.error("Error connecting to MongoDB:", error);
        });
    }

export default connectDB;