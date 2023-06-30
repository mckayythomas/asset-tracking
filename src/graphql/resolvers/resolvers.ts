import { mergeResolvers } from "@graphql-tools/merge";
import { locationResolvers } from "./locationResolvers";
import { userResolvers } from "./userResolvers";

const resolvers = mergeResolvers([locationResolvers, userResolvers]);

export { resolvers };
