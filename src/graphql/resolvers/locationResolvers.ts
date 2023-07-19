import { Location } from "../../models/location";
import { Department } from "../../models/department";
import { GraphQLError } from "graphql";
import {
    checkId,
    checkRequiredFields,
    checkAuthentication,
    checkValidFields
} from "../../utils/validation";

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
            const filter = checkValidFields(args.input, ["address", "type", "department"]);
            if ("department" in filter) {
                filter["departments"] = filter.department;
                delete filter.department;
            }
            if (Object.keys(filter).length > 1) {
                throw new GraphQLError("Please provide just one parameter to filter.", {
                    extensions: { code: "BAD_USER_INPUT" }
                });
            }
            try {
                const locations = await Location.find(filter);
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
            checkRequiredFields(args.input, [
                "locationId",
                "name",
                "address",
                "type",
                "departments"
            ]);
            const { locationId, name, address, type, departments } = args.input;
            try {
                const result = await Location.create({
                    locationId,
                    name,
                    address,
                    type,
                    departments
                });
                return result._id.toString();
            } catch (error) {
                throw new GraphQLError("Failed to create new location, please try again!");
            }
        },
        updateLocation: async (parent: any, args: any, context: any) => {
            checkAuthentication(context);
            const locationId = args.input._id;
            checkId(locationId);
            const location = await Location.findById(locationId);
            if (!location) {
                throw new GraphQLError("Location not found, check your _id!", {
                    extensions: { code: "BAD_USER_INPUT" }
                });
            }
            const updatedLocation = checkValidFields(args.input, [
                "locationId",
                "name",
                "address",
                "type",
                "departments"
            ]);
            if (Object.keys(updatedLocation).length === 0) {
                throw new GraphQLError("No valid fields provided for the update!", {
                    extensions: { code: "BAD_USER_INPUT" }
                });
            }
            const result = await Location.updateOne({ _id: locationId }, updatedLocation);
            if (result.modifiedCount > 0) {
                return await Location.findById(locationId);
            } else {
                throw new GraphQLError("Nothing to update, please try again!", {
                    extensions: { code: "BAD_USER_INPUT" }
                });
            }
        },
        deleteLocation: async (parent: any, args: any, context: any) => {
            checkAuthentication(context);
            const locationId = args.locationId;
            checkId(locationId);
            const location = await Location.findById(locationId);
            if (!location) {
                throw new GraphQLError("Location not found, please check your locationId!", {
                    extensions: { code: "BAD_USER_INPUT" }
                });
            }
            const result = await Location.deleteOne({ _id: locationId });
            if (result.deletedCount > 0) {
                return locationId;
            } else {
                throw new GraphQLError("Failed to delete the location, please try again!", {
                    extensions: { code: "BAD_USER_INPUT" }
                });
            }
        }
    }
};

export { locationResolvers };
