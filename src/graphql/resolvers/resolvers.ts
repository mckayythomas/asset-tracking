import { mergeResolvers } from "@graphql-tools/merge";
import { locationResolvers } from "./locationResolvers";
import { assetResolvers } from "./assetResolvers";
import { buildingResolvers } from "./buildingResolvers";
import { userResolvers } from "./userResolvers";
import { departmentResolvers } from "./departmentResolvers";

const resolvers = mergeResolvers([
  locationResolvers,
  assetResolvers,
  buildingResolvers,
  userResolvers,
  departmentResolvers,
]);

export { resolvers };
