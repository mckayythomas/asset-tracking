import { Asset } from "../../models/asset";
import { Building } from "../../models/building";
import { Department } from "../../models/department";
import { User } from "../../models/user";
import { GraphQLError } from "graphql";
import { checkId, checkRequiredFields, checkAuthentication } from "../../utils/validation";

const assetResolvers = {
    Query: {
        getAssets: async (context: any) => {
            checkAuthentication(context);
            try {
                let assets = await Asset.find();
                return assets;
            } catch (error) {
                throw new GraphQLError("Cannot find assets!");
            }
        },
        getAssetById: async (parent: any, args: any, context: any) => {
            checkAuthentication(context);
            const { id, resultFields } = args;
            checkId(id);

            try {
                let query: any = Asset.findById(id);
                // Limit the result fields if specified
                if (resultFields && Array.isArray(resultFields) && resultFields.length > 0) {
                  const fields = resultFields.reduce((acc: any, field: string) => {
                    acc[field] = 1;
                    return acc;
                  }, {});
                  query = query.select(fields);
                }

                const asset = await query;
                return asset;
            } catch (error) {
                console.error("getAssetById error: ", error); // Log the error for debugging purposes
                throw new GraphQLError("An error occurred. Please try again.");
            }
        },
        getAssetsByParams: async (parent: any, args: any, context: any) => {
            checkAuthentication(context);
            const { searchParams, resultFields } = args;
            console.log("Search Params:", searchParams);

            let searchQuery: any = {};

            // Iterate over the params - map [<, >, =] to these [$lt, $gt, $eq].
            for (const field in searchParams) {
                if (searchParams.hasOwnProperty(field)) {
                    const value = searchParams[field];
                    // Map the operators
                    if (value.operator === "<") {
                        searchQuery[field] = { $lt: value.value };
                    } else if (value.operator === ">") {
                        searchQuery[field] = { $gt: value.value };
                    } else if (value.operator === "=") {
                        searchQuery[field] = { $eq: value.value };
                    } else if (value.operator === "<=") {
                        searchQuery[field] = { $lte: value.value };
                    } else if (value.operator === ">=") {
                        searchQuery[field] = { $gte: value.value };
                    } else if (value.operator === "!=") {
                        searchQuery[field] = { $ne: value.value };
                    } else if (value.operator === "=") {
                        searchQuery[field] = { $eq: value.value };
                    }
                }
            }

            // Preparing the query
            let query = Asset.find(searchQuery);

            // If resultFields is specified, modify the query to only select those fields
            if (resultFields && Array.isArray(resultFields) && resultFields.length > 0) {
            const fields = resultFields.reduce((acc: any, field: string) => {
                acc[field] = 1;
                return acc;
            }, {});
            query = query.select(fields).exec() as typeof query;
            }

            try {
                const assets = await query;
                return assets;
            } catch (error) {
                console.error("getAssetsByParams error: ", error);
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
            checkAuthentication(context);
            checkRequiredFields(args, []);
        },
        updateAsset: async (parent: any, args: any, context: any) => {
            checkAuthentication(context);
            checkRequiredFields(args, []);
        },
        deleteAsset: async (parent: any, args: any, context: any) => {
            checkAuthentication(context);
            checkRequiredFields(args, []);
        }
    }
};

export { assetResolvers };
