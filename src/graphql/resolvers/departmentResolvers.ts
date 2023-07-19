import { Department } from "../../models/department";
import { GraphQLError } from "graphql";
import { checkId, checkAuthentication } from "../../utils/validation";
import { ObjectId } from "mongoose";
import { error } from "console";

const departmentResolvers = {
    Query: {
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
