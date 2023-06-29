import { Location } from "../../models/location";
import { Department } from "../../models/department";

const locationResolvers = {
    Query: {
        getLocation: async (parent: any, args: any, context: any) => {
            const location = await Location.findById(args.locationId);
            return location;
        },
        getLocations: async (parent: any, args: any, context: any) => {
            const locations = await Location.find();
            return locations;
        }
    },
    Location: {
        departments: async (parent: any) => {
            const departments = await Department.find({ _id: parent.departments });
            return departments;
        }
    },
    Mutation: {
        newLocation: async (parent: any, args: any, context: any) => {}
    }
};

export { locationResolvers };
