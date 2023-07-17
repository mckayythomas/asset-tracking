import { GraphQLError } from 'graphql';
// import Department from '../../models/department';
import { Department } from '../../models/department';
import { checkId, checkRequiredFields, checkAuthentication } from '../../utils/validation';

const departmentResolvers = {
    Query: {
        // getDepartments: async (parent: any, args: any, context: any) => {
        //     try {
        //         checkAuthentication(context);
        //         const departments = await Department.find();
        //         return departments;
        //     } 
        //     catch (error) {
        //         throw new GraphQLError('Failed to get departments details');
        //     }
        // },
        // getDepartment: async (parent: any, { id }: any, context: any) => {
        //     try {
        //         checkAuthentication(context);
        //         checkId(id);
        //         const department = await Department.findById(id);
        //         return department;
        //     }
        //     catch (error) {
        //         throw new GraphQLError('Failed to get department details');
        //     }
        // },
    },
    Mutation: {
        // createDepartment: async (parent: any, args: any, context: any) => {
        //     try {
        //         checkAuthentication(context);
        //         checkRequiredFields(args);
        //         const department = await Department.create(args);
        //         return department;
        //     }
        //     catch (error) {
        //         throw new GraphQLError('Failed to create new department');
        //     }
        // },
        // updateDepartment: async (parent: any, args: any, context: any) => {
        //     try {
        //         checkAuthentication(context);
        //         const { id, ...updateData } = args;
        //         checkId(id);
        //         checkRequiredFields(updateData);
        //         const department = await Department.findByIdAndUpdate(id, updateData, {
        //             new: true,
        //         });
        //         return department;
        //     }
        //     catch (error) {
        //         throw new GraphQLError('Failed to update department');
        //     }
        // },
        // deleteDepartment: async (parent: any, { id }: any, context: any) => {
        //     try {
        //         checkAuthentication(context);
        //         checkId(id);
        //         const department = await Department.findByIdAndDelete(id);
        //         return department;
        //     }
        //     catch (error) {
        //         throw new GraphQLError('Failed to delete department');
        //     }
        // },
    },
};

export { departmentResolvers };