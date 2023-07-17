import { Asset } from "../../models/asset";
import { Building } from "../../models/building";
import { Department } from "../../models/department";
import { User } from "../../models/user";
import { GraphQLError } from "graphql";
import mongoose from "mongoose";
import { Types } from "mongoose";
import { checkId, checkRequiredFields, checkAuthentication } from "../../utils/validation";

const assetResolvers = {
    Query: {
        getAssetById: async (parent: any, args: any, context: any) => {
            checkAuthentication(context);
            console.log("getAssetById");
            const id = args._id;
            checkId(id);
            try {
                const assetData = await Asset.findById(id);
                if (!assetData) {
                    throw new GraphQLError('Asset not found.');
                }
                return assetData;
            } catch (error) {
                throw new GraphQLError("An error occurs, please try again.");
            }
        },
        getAssets: async (parent: any, args: any, context: any) => {
            checkAuthentication(context);
            console.log("getAssets");
            try {
                const assetsTest = await Asset.find().exec();
                console.log("Number of Test Asset records:", assetsTest.length);
                console.log("First Test Asset:", assetsTest[0]);
                const assets = await Asset.find();
                if (!assets) {
                    throw new GraphQLError('No Assets found.');
                } else {
                    console.log("Number of Asset records:", assets.length);
                    console.log("First Asset:", assets[0]);
                    return assets;
                }
            } catch (error) {
                throw new GraphQLError("Cannot find assets!");
            }
        },
        getAssetsByParams: async (parent: any, args: any, context: any) => {
            checkAuthentication(context);
            console.log("getAssetsByParams");
            const { fieldParams } = args;
            console.log("Field Params:", fieldParams);
            const searchQuery: any = {};

            for (const { fieldName, fieldValue } of fieldParams) {
              searchQuery[fieldName] = fieldValue;
            }

            console.log("Search Query:", searchQuery);
            try {
              const assets = await Asset.find(searchQuery).exec();
              return assets;
            } catch (error) {
              console.error("getAssetsByParams error:", error);
              throw new GraphQLError("Cannot find assets by Params!");
            }
          },
    },
    Asset: {
        building: async (parent: any, args: any, context: any) => {
            checkAuthentication(context);
            console.log("Asset.building");
            try {
                console.log("parent building:", parent.building);
                const building = await Building.findById(new mongoose.Types.ObjectId(parent.building));
                return building;
            } catch (error) {
                throw new GraphQLError(
                    "Cannot find building, please review the building id!"
                );
            }
        },
        department: async (parent: any, args: any, context: any) => {
            checkAuthentication(context);
            console.log("Asset.department");
            try {
                console.log("parent department:", parent.department);
                const department = await Department.findById(new mongoose.Types.ObjectId(parent.department));
                return department;
            } catch (error) {
                throw new GraphQLError(
                    "Cannot find department, please review the department id!"
                );
            }
        },
        user: async (parent: any, args: any, context: any) => {
            checkAuthentication(context);
            console.log("Asset.user");
            try {
                console.log("parent user:", parent.user);
                const user = await User.findById(new mongoose.Types.ObjectId(parent.user));
                return user;
                return user;
            } catch (error) {
                throw new GraphQLError(
                    "Cannot find user, please review the user id!"
                );
            }
        }
    },
    Mutation: {
        newAsset: async (parent: any, args: any, context: any) => {
            checkAuthentication(context);
            console.log("newAsset");
            console.log(args);
            checkRequiredFields(args, []);
            try {
                const newAsset = new Asset(args.input);
                const savedAsset = await newAsset.save();
                console.log("savedAsset _id:", savedAsset._id);
                console.log("savedAsset _id type:", typeof savedAsset._id);
                console.log("savedAsset _id string representation:", savedAsset._id.toString());
                // return await newAsset.save();
                return {
                    ...savedAsset.toObject(),
                    _id: savedAsset._id.toString()
                  };
            } catch (error) {
                console.error('Error creating new asset:', error);
                throw new GraphQLError('An error occurred while creating the new asset.');
            }
        },
        updateAsset: async (parent: any, args: any, context: any) => {
            checkAuthentication(context);
            console.log("updateAsset");
            checkRequiredFields(args, ['_id', 'updateData']);
            try {
                const assetData = await Asset.findById(args._id);
                if (!assetData) {
                    throw new GraphQLError('Asset not found.');
                }
                Object.assign(assetData, args.updateData);
                const updatedAsset = await assetData.save();
                return updatedAsset.toObject();
            } catch (error) {
                console.error('Error updating the asset:', error);
                throw new GraphQLError('An error occurred while updating the asset.');
            }
        },
        deleteAsset: async (parent: any, args: any, context: any) => {
            checkAuthentication(context);
            console.log("deleteAsset");
            checkRequiredFields(args, ['_id']);
            try {
                const assetData = await Asset.findById(args._id);
                if (!assetData) {
                    throw new GraphQLError('Delete failed: Asset not found.');
                }
                const deleteResult = await Asset.deleteOne({ _id: args._id });
                return deleteResult.deletedCount;
            } catch (error) {
                console.error('Error deleting the asset:', error);
                throw new GraphQLError('Delete faile: An error occurred while deleting the asset.');
            }
        }
    }
};

export { assetResolvers };
