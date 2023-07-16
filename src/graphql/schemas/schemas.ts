import { mergeTypeDefs } from "@graphql-tools/merge";
import { locationSchema } from "./locationSchema";
import { departmentSchema } from "./departmentSchema";
import { userSchema } from "./userSchema";

const typeDefs = mergeTypeDefs([locationSchema, departmentSchema, userSchema]);

export { typeDefs };
