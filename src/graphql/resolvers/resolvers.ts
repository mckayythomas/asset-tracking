import { mergeResolvers } from "@graphql-tools/merge";
import { locationResolvers } from "./locationResolvers";
import { userResolvers } from "./userResolvers";
import { assetResolvers } from "./assetResolvers";
import { buildingResolvers } from "./buildingResolvers";

const resolvers = mergeResolvers([
    locationResolvers,
    userResolvers,
    assetResolvers,
    buildingResolvers
]);

export { resolvers };
