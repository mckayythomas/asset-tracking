import { mergeResolvers } from "@graphql-tools/merge";
import { locationResolvers } from "./locationResolvers";
import { buildingResolvers } from "./buildingResolvers";
import { userResolvers } from "./userResolvers";

const resolvers = mergeResolvers([locationResolvers, userResolvers, buildingResolvers]);

export { resolvers };
