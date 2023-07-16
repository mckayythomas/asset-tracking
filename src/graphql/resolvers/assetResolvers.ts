import { Asset } from "../../models/asset";
// import { Building } from "../../models/building";
import { Department } from "../../models/department";
import { User } from "../../models/user";
import { GraphQLError } from "graphql";
import { checkId, checkRequiredFields, checkAuthentication } from "../../utils/validation";

const assetResolvers = {
    Query: {
        getAsset: async (parent: any, args: any, context: any) => {
            checkAuthentication(context);
            const id = args.assetId;
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
        }
    },
    Asset: {
        // building: async (parent: any) => {
        //     try {
        //         const building = await Building.find({ _id: parent.building });
        //         return building;
        //     } catch (error) {
        //         throw new GraphQLError(
        //             "Cannot find building, please review the building id!"
        //         );
        //     }
        // },
        department: async (parent: any) => {
            try {
                const department = await Department.find({ _id: parent.department });
                return department;
            } catch (error) {
                throw new GraphQLError("Cannot find department, please review the department id!");
            }
        },
        user: async (parent: any) => {
            try {
                const user = await User.find({ _id: parent.user });
                return user;
            } catch (error) {
                throw new GraphQLError("Cannot find user, please review the user id!");
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
