import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import fs from "fs";
import path from "path";
import { describe, expect, test, jest, beforeEach, afterEach } from "@jest/globals";
import { mockContext } from "../src/utils/validation";
import { Asset } from "../src/models/asset"; // Import the asset model
import { Building } from "../src/models/building"; // Import the building model
import { Department } from "../src/models/department"; // Import the department model
import { Location } from "../src/models/location"; // Import the location model
import { User } from "../src/models/user"; // Import the user model
import { assetResolvers } from "../src/graphql/resolvers/assetResolvers";

declare global {
    namespace NodeJS {
        interface Global {
            mongoServerS: MongoMemoryServer;
        }
    }
}

// the path to the test_data directory
const testDataDirectory = path.resolve(__dirname, "./test_data");
// Get all the files in the directory
const files = fs.readdirSync(testDataDirectory);

// Connect to the MongoMemory test instance
beforeAll(async () => {
    jest.setTimeout(30000);
    // Set up in-memory MongoDB instance
    (global as any).mongoServerS = new MongoMemoryServer();
    await (global as any).mongoServerS.start();
    const mongoUri = await (global as any).mongoServerS.getUri();
    await mongoose.connect(mongoUri, {});

    let Model: mongoose.Model<any>;

    // Register the Asset model with Mongoose
    mongoose.model("Asset", Asset.schema);
    mongoose.model("Building", Building.schema);
    mongoose.model("Department", Department.schema);
    mongoose.model("Location", Location.schema);
    mongoose.model("User", User.schema);

    // Loop through each file
    for (const file of files) {
        // Check if the file is a .json file
        if (path.extname(file) === ".json") {
            // Create the full file path
            const filePath = path.resolve(testDataDirectory, file);
            // Read the file
            const dataBuffer = fs.readFileSync(filePath);
            const dataJson = dataBuffer.toString();
            const data = JSON.parse(dataJson);
            // Extract the prefix from the file name
            const prefix = path.parse(file).name;

            switch (prefix) {
                case "asset":
                    Model = mongoose.model("Asset");
                    break;
                case "building":
                    Model = mongoose.model("Building");
                    break;
                case "department":
                    Model = mongoose.model("Department");
                    break;
                case "location":
                    Model = mongoose.model("Location");
                    break;
                case "user":
                    Model = mongoose.model("User");
                    break;
                default:
                    throw new Error(`Unknown model prefix: ${prefix}`);
            }
            // Add json data files to the test MongoDB instance
            await Model.insertMany(
                data.map((item: any) => ({
                    ...item,
                    _id: item._id["$oid"]
                }))
            );

            // Log the filename to the console
            // console.log(`Loaded test data file: ${file}`);
        }
    }
});

afterAll(async () => {
    // Close in-memory MongoDB instance
    await mongoose.disconnect();
    await (global as any).mongoServerS.stop();
});

describe("assetResolvers module", () => {
    let testCounter: number = 0;

    beforeEach(() => {});

    afterEach(() => {});

    let testDesc = "getAssets returns an array of all assets";
    let modelName = "Asset";
    test(testDesc, async () => {
        const context = mockContext({});
        const result = await assetResolvers.Query.getAssets(null, null, context);
        expect(result).toHaveLength(40);
        expect(result[0]).toHaveProperty("brand");
        expect(result[0]).toHaveProperty("model");
    });

    testDesc = "getAssetById returns a single asset matching the OID";
    modelName = "Asset";
    test(testDesc, async () => {
        const _id = "648279b55ac374af573948d9";
        const objectId = new mongoose.Types.ObjectId(_id);
        const context = mockContext({});
        const result = await assetResolvers.Query.getAssetById(null, { _id }, context);
        expect(result).not.toBeNull();
        expect(typeof result).toBe("object");
        expect(result).toHaveProperty("brand");
        expect(result).toHaveProperty("model");
        expect(result).toHaveProperty("assetId", "AS039");
        expect(result).toHaveProperty("serialNumber", "EQP039");
    });

    testDesc = "getAssetsByParams returns an array of assets matching field value(s)";
    modelName = "Asset";
    test(testDesc, async () => {
        const fieldParams = [
            { fieldName: "brand", fieldValue: "ABB" },
            { fieldName: "status", fieldValue: "Active" }
        ];
        const context = mockContext({});
        const result = await assetResolvers.Query.getAssetsByParams(null, { fieldParams }, context);
        expect(result).toHaveLength(4);
        result.forEach((asset) => {
            expect(asset).toHaveProperty("brand", "ABB");
            expect(asset).toHaveProperty("status", "Active");
        });
    });

    testDesc = "newAsset creates an asset with the specified data";
    modelName = "Asset";
    test(testDesc, async () => {
        const assetInput = {
            assetId: "AS099",
            serialNumber: "EQP099",
            brand: "ABB",
            purchaseDate: new Date("2020-06-02"),
            model: "IRB 2600",
            modelNumber: "ABB-IRB2300",
            purchasePrice: 35000,
            image: "https://example.com/images/eqp010.jpg",
            physicalDescription: "Green industrial robot with a compact footprint.",
            status: "Active",
            condition: "Good",
            building: "64827e605ac374af5739491b",
            department: "64827a7d5ac374af573948eb",
            user: "649642893014a3e11b469f18"
        };

        const context = mockContext({});
        const result = await assetResolvers.Mutation.newAsset(null, { input: assetInput }, context);

        // Perform assertions on the result
        expect(result).toHaveProperty("_id");
        expect(result).toHaveProperty("assetId", "AS099");
        expect(result).toHaveProperty("serialNumber", "EQP099");
        expect(result).toHaveProperty("brand", "ABB");
        expect(result).toHaveProperty("purchaseDate", assetInput.purchaseDate);
        expect(result).toHaveProperty("model", "IRB 2600");
        expect(result).toHaveProperty("modelNumber", "ABB-IRB2300");
        expect(result).toHaveProperty("purchasePrice", 35000);
        expect(result).toHaveProperty("image", "https://example.com/images/eqp010.jpg");
        expect(result).toHaveProperty(
            "physicalDescription",
            "Green industrial robot with a compact footprint."
        );
        expect(result).toHaveProperty("status", "Active");
        expect(result).toHaveProperty("condition", "Good");
        expect(result).toHaveProperty("building", "64827e605ac374af5739491b");
        expect(result).toHaveProperty("department", "64827a7d5ac374af573948eb");
        expect(result).toHaveProperty("user", "649642893014a3e11b469f18");
    });

    testDesc = "updateAsset modifies an existing asset";
    modelName = "Asset";
    test(testDesc, async () => {
        const context = mockContext({});
        const assetsBeforeUpdate = await assetResolvers.Query.getAssets(null, null, context);
        // Select an existing asset to update
        const assetToUpdate = assetsBeforeUpdate[0];
        // Define the new data to update the asset
        const updateData = {
            _id: assetToUpdate._id,
            brand: "New Brand",
            model: "New Model",
            purchasePrice: 50000
        };

        // Update the asset
        const updatedAsset = await assetResolvers.Mutation.updateAsset(
            null,
            {
                _id: assetToUpdate._id,
                updateData
            },
            context
        );

        // Retrieve the updated asset from the database
        const retrievedAsset = await assetResolvers.Query.getAssetById(
            null,
            { _id: assetToUpdate._id },
            context
        );

        // Convert the updatedAsset and retrievedAsset to plain objects
        const updatedAssetObject = JSON.parse(JSON.stringify(updatedAsset));
        const retrievedAssetObject = JSON.parse(JSON.stringify(retrievedAsset));

        // Perform assertions on the updated asset
        expect(updatedAssetObject).toEqual(retrievedAssetObject);
        expect(updatedAssetObject).toHaveProperty("brand", "New Brand");
        expect(updatedAssetObject).toHaveProperty("model", "New Model");
        expect(updatedAssetObject).toHaveProperty("purchasePrice", 50000);
    });

    testDesc = "deleteAsset deletes asset";
    modelName = "Asset";
    test(testDesc, async () => {
        const context = mockContext({});
        const assetsBeforeUpdate = await assetResolvers.Query.getAssets(null, null, context);
        // Select the 6th existing asset to delete
        const assetToDelete = assetsBeforeUpdate[5];
        const id = assetToDelete._id;
        const result = await assetResolvers.Mutation.deleteAsset(null, { _id: id }, context);
        expect(result).toBe(1);
        const deletedAsset = await Asset.findById(id);
        expect(deletedAsset).toBeNull();
    });
});
