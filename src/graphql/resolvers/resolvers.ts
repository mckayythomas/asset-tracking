import { mergeResolvers } from "@graphql-tools/merge";
import { locationResolvers } from "./locationResolvers";

const resolvers = mergeResolvers(locationResolvers);

export { resolvers };
