import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    googleId: { type: String, required: true },
    displayName: { type: String, required: true },
    fistName: { type: String, required: true },
    lastName: { type: String, required: true },
    picture: { type: String, required: true }
});

const User = mongoose.model("User", userSchema, "user");

export { User };
