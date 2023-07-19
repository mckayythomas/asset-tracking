import { mergeTypeDefs } from "@graphql-tools/merge";
import { locationSchema } from "./locationSchema";
import { departmentSchema } from "./departmentSchema";
import { userSchema } from "./userSchema";
import { assetSchema } from "./assetSchema";
import { buildingSchema } from "./buildingSchema";

const typeDefs = mergeTypeDefs([
    locationSchema,
    departmentSchema,
    userSchema,
    assetSchema,
    buildingSchema
]);

export { typeDefs };
