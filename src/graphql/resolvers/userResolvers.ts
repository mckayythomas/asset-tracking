import { User } from "../../models/user";
import { GraphQLError } from "graphql";
import { checkId, checkAuthentication } from "../../utils/validation";

const userResolvers = {
    Query: {
        getUser: async (parent: any, args: any, context: any) => {
            checkAuthentication(context);
            const id = args.userId;
            checkId(id);
            try {
                const user = await User.findById(id);
                if (user) {
                    return user;
                } else {
                    throw new GraphQLError("User not found");
                }
            } catch (error) {
                throw new GraphQLError("Cannot find user. Try again.");
            }
        }
    },
    Mutation: {
        updateUser: async (parent: any, args: any, context: any) => {
            checkAuthentication(context);
            const id = args.input._id;

            checkId(id);
            const userUpdateInfo: any = args.input;

            try {
                const userToUpdate = await User.findById(id);
                const updateUser = new User(userToUpdate);
                Object.assign(updateUser, userUpdateInfo);
                const updatedUser = await updateUser.save();
                return updatedUser;
            } catch (err) {
                throw new GraphQLError("Cannot update user, something went wrong Please try again");
            }
        },
        deleteUser: async (parent: any, args: any, context: any) => {
            checkAuthentication(context);
            const id = args.userId;
            checkId(id);

            try {
                const deleteUser = await User.deleteOne({ _id: id });
                if (deleteUser.deletedCount === 1) {
                    return id;
                } else {
                    throw new GraphQLError("User not found");
                }
            } catch (error) {
                throw new GraphQLError("Cannot delete user. Please try again.");
            }
        }
    }
};

export { userResolvers };
