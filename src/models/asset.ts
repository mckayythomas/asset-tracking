import mongoose, { Schema } from "mongoose";
import { isRequiredArgument } from 'graphql';

// Define Mongoose address schema
const addressSchema = new Schema({
    street: { type: String, required: true },
    town: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, required: true }
});

// Define  Mongoose asset schema
const assetSchema = new Schema(
    {
        assetId: { type: String, unique: true, required: true },
        serialNumber: { type: String, required: true },
        brand: { type: String, required: true },
        purchaseDate: { type: Date, required: true },
        model: { type: String, required: true },
        modelNumber: { type: String, required: true },
        purchasePrice: { type: Number, required: true },
        image: { type: String, required: true },
        physicalDescription: { type: String, required: true },
        status: { type: String, required: true },
        condition: { type: String, required: true },
        building: { type: String, ref: "Building", required: true },
        department: { type: String, ref: "Department", required: true },
        user: { type: String, ref: "User", required: true }
    },
    {
        collection: "asset"
    }
);

const Asset = mongoose.model('Asset', assetSchema, "asset");

export {Asset, assetSchema};

