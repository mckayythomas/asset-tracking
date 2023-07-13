import { User } from '../../models/user';
import { GraphQLError } from 'graphql';
import { checkId, checkRequiredFields, checkAuthentication } from "../../utils/validation";
import { ObjectId } from 'mongoose';
import { error } from 'console';

const userResolvers = {
    Query: {
        getUser: async (parent: any, args: any, context: any) => {
            checkAuthentication(context);
            const id = args.userId;
            console.log(id)
            checkId(id);
            try {
                const user = await User.findById(id);
                if (user) {
                    console.log(user)
                    return user;
                } else {
                    throw error
                }

            } catch (error) {
                throw new GraphQLError("Cannot find user. Try again.");
            }
        }
    },
    Mutation: {
        updateUser: async (parent: any, args: any, context: any) => {
            checkAuthentication(context);
            const id = args.userId;
            checkId(id);
            const userUpdateInfo: any = args;

            try {
                const updatedUser = await User.updateOne({ _id: id }, userUpdateInfo ) 
                return updatedUser;
            } catch(error) {
                throw new GraphQLError(
                    "Cannot update user, something went wrong. Please try again."
                );
            }
        },
        deleteUser: async (parent: any, args: any, context: any) => {
            checkAuthentication(context);
            const id = args.userId;
            checkId(id);
            
            try {
                const deleteUser = await User.deleteOne({ _id: id });
                return deleteUser;
            } catch(error) {
                throw new GraphQLError(
                    "Cannot delete user. Please try again."
                );
            }
        }
    }
};

export { userResolvers };