import { mergeResolvers } from "@graphql-tools/merge";
import { locationResolvers } from "./locationResolvers";
import { assetResolvers } from "./assetResolvers";
import { buildingResolvers } from "./buildingResolvers";
import { departmentResolvers } from "./departmentResolvers";
import { userResolvers } from "./userResolvers";

const resolvers = mergeResolvers([
  assetResolvers,
  buildingResolvers,
  userResolvers,
  departmentResolvers,
]);

export { resolvers };
