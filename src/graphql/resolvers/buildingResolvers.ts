import { GraphQLError } from 'graphql';
// import Building from '../../models/building';
import { Building } from '../../models/building';
import { checkId, checkRequiredFields, checkAuthentication } from '../../utils/validation';

const buildingResolvers = {
    Query: {
        getBuildings: async (parent: any, args: any, context: any) => {
            try {
                checkAuthentication(context);
                const buildings = await Building.find();
                return buildings;
            } 
            catch (error) {
                throw new GraphQLError('Failed to get buildings details');
            }
        },
        getBuilding: async (parent: any, { id }: any, context: any) => {
            try {
                checkAuthentication(context);
                checkId(id);
                const building = await Building.findById(id);
                return building;
            }
            catch (error) {
                throw new GraphQLError('Failed to get building details');
            }
        },
    },
    Mutation: {
        createBuilding: async (parent: any, args: any, context: any) => {
            try {
                checkAuthentication(context);
                checkRequiredFields(args);
                const building = await Building.create(args);
                return building;
            }
            catch (error) {
                throw new GraphQLError('Failed to create new building');
            }
        },
        updateBuilding: async (parent: any, args: any, context: any) => {
            try {
                checkAuthentication(context);
                const { id, ...updateData } = args;
                checkId(id);
                checkRequiredFields(updateData);
                const building = await Building.findByIdAndUpdate(id, updateData, {
                    new: true,
                });
                return building;
            }
            catch (error) {
                throw new GraphQLError('Failed to update building');
            }
        },
        deleteBuilding: async (parent: any, { id }: any, context: any) => {
            try {
                checkAuthentication(context);
                checkId(id);
                const building = await Building.findByIdAndDelete(id);
                return building;
            }
            catch (error) {
                throw new GraphQLError('Failed to delete building');
            }
        },
    },
};

export { buildingResolvers };