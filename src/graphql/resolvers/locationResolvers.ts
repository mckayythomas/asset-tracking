import { Location } from "../../models/location";
import { Department } from "../../models/department";
import { GraphQLError } from "graphql";
import { checkId, checkRequiredFields, checkAuthentication } from "../../utils/validation";

const locationResolvers = {
    Query: {
        getLocation: async (parent: any, args: any, context: any) => {
            checkAuthentication(context);
            const id = args.locationId;
            checkId(id);
            try {
                const location = await Location.findById(id);
                return location;
            } catch (error) {
                throw new GraphQLError("An error occurs, please try again.");
            }
        },
        getLocations: async (parent: any, args: any, context: any) => {
            checkAuthentication(context);
            try {
                const locations = await Location.find();
                return locations;
            } catch (error) {
                throw new GraphQLError("Cannot find locations!");
            }
        }
    },
    Location: {
        departments: async (parent: any) => {
            try {
                const departments = await Department.find({ _id: parent.departments });
                return departments;
            } catch (error) {
                throw new GraphQLError(
                    "Cannot find departments, please review the departments id!"
                );
            }
        }
    },
    Mutation: {
        newLocation: async (parent: any, args: any, context: any) => {
            checkAuthentication(context);
            checkRequiredFields(args, []);
        }
    }
};

export { locationResolvers };
