import mongoose, { Schema } from "mongoose";

const locationSchema = new Schema({
    locationId: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    type: { type: String, required: true },
    departments: { type: Array, required: true }
});

const Location = mongoose.model("Location", locationSchema, "location");

export { Location };
