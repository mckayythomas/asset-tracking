import { Asset } from "../../models/asset";
import { Building } from "../../models/building";
import { Department } from "../../models/department";
import { User } from "../../models/user";
import { GraphQLError } from "graphql";
import { checkId, checkRequiredFields, checkAuthentication } from "../../utils/validation";

const assetResolvers = {
    Query: {
        getAssetById: async (parent: any, args: any, context: any) => {
            checkAuthentication(context);
            const id = args._id;
            checkId(id);
            try {
                const asset = await Asset.findById(id);
                return asset;
            } catch (error) {
                throw new GraphQLError("An error occurs, please try again.");
            }
        },
        getAssets: async (parent: any, args: any, context: any) => {
            checkAuthentication(context);
            try {
                const assets = await Asset.find();
                return assets;
            } catch (error) {
                throw new GraphQLError("Cannot find locations!");
            }
        },
        getAssetsByParams: async (parent: any, args: any, context: any) => {
            checkAuthentication(context);
            const { searchParams } = args;
            console.log("Search Params:", searchParams);
            const searchQuery: any = {};
            for (const [fieldName, fieldValue] of Object.entries(searchParams)) {
            searchQuery[fieldName] = fieldValue;
            }

            try {
            const assets = await Asset.find(searchQuery).exec();
            return assets;
            } catch (error) {
            console.error("getAssetsByParams error:", error);
            throw new GraphQLError("Cannot find assets!");
            }
        },
    },
    Asset: {
        building: async (parent: any, args: any, context: any) => {
            checkAuthentication(context);
            try {
                const building = await Building.findById(parent.building);
                return building;
            } catch (error) {
                throw new GraphQLError(
                    "Cannot find building, please review the building id!"
                );
            }
        },
        department: async (parent: any, args: any, context: any) => {
            checkAuthentication(context);
            try {
                const department = await Department.findById(parent.department);
                return department;
            } catch (error) {
                throw new GraphQLError(
                    "Cannot find department, please review the department id!"
                );
            }
        },
        user: async (parent: any, args: any, context: any) => {
            checkAuthentication(context);
            try {
                const user = await User.findById(parent.user);
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
            console.log(args);
            checkAuthentication(context);
            checkRequiredFields(args, []);
            try {
                const newAsset = new Asset(args.input);
                return await newAsset.save();
            } catch (error) {
                console.error('Error creating new asset:', error);
                throw new GraphQLError('An error occurred while creating the new asset.');
            }
        },
        updateAsset: async (parent: any, args: any, context: any) => {
            checkAuthentication(context);
            checkRequiredFields(args, ['_id']);
            try {
            const assetData = await Asset.findById(args._id);
            if (!assetData) {
                throw new GraphQLError('Asset not found.');
            }
            const asset = new Asset(assetData);
            Object.assign(asset, args.updateData);
            const updatedAsset = await asset.save();
            return updatedAsset.toObject();
            } catch (error) {
            console.error('Error updating the asset:', error);
            throw new GraphQLError('An error occurred while updating the asset.');
            }
        },
        deleteAsset: async (parent: any, args: any, context: any) => {
            checkAuthentication(context);
            checkRequiredFields(args, ['_id']);
            const deleteResult = await Asset.deleteOne({ _id: args._id });
            return deleteResult.deletedCount;
        }
    }
};

export { assetResolvers };
