import mongoose from "mongoose";

export function setupDb(){

    mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Connected to mongoDB"))
    .catch(() => console.log("Connection error"));
}
