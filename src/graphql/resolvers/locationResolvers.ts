import { Location } from "../../models/location";
import { Department } from "../../models/department";
import { GraphQLError } from "graphql";
import { checkId, checkRequiredFields, checkAuthentication, checkValidFields } from "../../utils/validation";

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
            const filter = checkValidFields( args.input, [ "address", "type", "department" ] )
            if ( "department" in filter ) {
                filter["departments"] = filter.department; 
                delete filter.department;
            }
            if ( Object.keys(filter).length > 1 ) {
                throw new GraphQLError( "Please provide just one parameter to filter.", { extensions: {code: "BAD_USER_INPUT"} } )
            };
            try {
                const locations = await Location.find( filter );
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
            checkRequiredFields(args, ["locationId", "name", "address", "type", "departments"]);
            console.log(args)
            const location = { locationId: args.locationId, name: args.name, type: args.type, departments: args.departments };
            try {
                const newLocation = new Location(location);
                const result = await newLocation.save();
                return result;
            } catch (error) {
                throw new GraphQLError("Failed to create new location, please try again!");
            }
        }
    }
};

export { locationResolvers };
