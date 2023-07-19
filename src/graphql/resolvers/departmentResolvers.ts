import { Department } from "../../models/department";
import { GraphQLError } from "graphql";
import { checkId, checkAuthentication, checkRequiredFields } from "../../utils/validation";

const departmentResolvers = {
    Query: {
        getDepartments: async (parent: any, args: any, context: any) => {
            try {
                checkAuthentication(context);
                const buildings = await Department.find();
                console.log(buildings)
                return buildings;
            } catch (error) {
                throw new GraphQLError("Failed to get buildings details");
            }
        },
        getDepartment: async (parent: any, args: any, context: any) => {
            checkAuthentication(context);
            const id = args.departmentId;
            checkId(id);
            try {
                const department = await Department.findById(id);
                if (department) {
                    return department;
                } else {
                    throw new GraphQLError("Department not found");
                }
            } catch (error) {
                throw new GraphQLError("Cannot find department. Try again.");
            }
        }
    },
    Mutation: {
        createDepartment: async (parent: any, args: any, context: any) => {
            try {
                checkAuthentication(context);
                console.log(args)
                checkRequiredFields(args.input, [
                    "departmentId",
                    "name",
                    "location",
                    "head",
                    "employeesCount",
                    "description"
                ]);
                const { departmentId, name, location, head, employeesCount, description } = args.input;
                const department = await Department.create({
                    departmentId,
                    name, 
                    location,
                    head,
                    employeesCount,
                    description
                });
                return department;
            } catch (error) {
                throw new GraphQLError("Failed to create new department");
            }
        },
        updateDepartment: async (parent: any, args: any, context: any) => {
            checkAuthentication(context);
            const id = args.input._id;

            checkId(id);
            const departmentUpdateInfo: any = args.input;

            try {
                const departmentToUpdate = await Department.findById(id);
                const updateDepartment = new Department(departmentToUpdate);
                Object.assign(updateDepartment, departmentUpdateInfo);
                const updatedDepartment = await updateDepartment.save();
                return updatedDepartment;
            } catch (err) {
                throw new GraphQLError("Cannot update department, something went wrong Please try again");
            }
        },
        deleteDepartment: async (parent: any, args: any, context: any) => {
            checkAuthentication(context);
            const id = args.departmentId;
            checkId(id);

            try {
                const deleteDepartment = await Department.deleteOne({ _id: id });
                if (deleteDepartment.deletedCount === 1) {
                    return id;
                } else {
                    throw new GraphQLError("Department not found");
                }
            } catch (error) {
                throw new GraphQLError("Cannot delete department. Please try again.");
            }
        }
    }
};

export { departmentResolvers };
