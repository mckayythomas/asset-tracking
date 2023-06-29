import { mergeTypeDefs } from "@graphql-tools/merge";
import { locationSchema } from "./locationSchema";
import { departmentSchema } from "./departmentSchema";

const typeDefs = mergeTypeDefs([locationSchema, departmentSchema]);

export { typeDefs };
