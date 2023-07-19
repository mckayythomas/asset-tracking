import { GraphQLError } from "graphql";
import { Building } from "../../models/building";
import { checkId, checkRequiredFields, checkAuthentication } from "../../utils/validation";

const buildingResolvers = {
    Query: {
        getBuildings: async (parent: any, args: any, context: any) => {
            checkAuthentication(context);
            try {
                const buildings = await Building.find();
                return buildings;
            } catch (error) {
                throw new GraphQLError("Failed to get buildings details");
            }
        },
        getBuilding: async (parent: any, args: any, context: any) => {
            checkAuthentication(context);
            const id = args.buildingId;
            checkId(id);
            try {
                const building = await Building.findById(id);
                return building;
            } catch (error) {
                throw new GraphQLError("Failed to get building details");
            }
        }
    },
    Mutation: {
        createBuilding: async (parent: any, args: any, context: any) => {
            checkAuthentication(context);
            checkRequiredFields(args.input,["buildingId", "departments", "floors", "locationId", "name"]);
            try {
                const building: any = await Building.create(args.input);
                return building;
            } catch (error) {
                throw new GraphQLError("Failed to create new building");
            }
        },
        updateBuilding: async (parent: any, args: any, context: any) => {
            checkAuthentication(context);
            const { _id, ...updateData } = args.input;
            checkId(_id);
            checkRequiredFields(updateData);
            try {
                const building = await Building.findByIdAndUpdate(_id, updateData, {
                    new: true
                });
                return building;
            } catch (error) {
                throw new GraphQLError("Failed to update building");
            }
        },
        deleteBuilding: async (parent: any, { buildingId }: any, context: any) => {
            checkAuthentication(context);
            checkId(buildingId);
            try {
                const building: any = await Building.findByIdAndDelete(buildingId);
                return building._id.toString();
            } catch (error) {
                throw new GraphQLError("Failed to delete building");
            }
        }
    }
};

export { buildingResolvers };
