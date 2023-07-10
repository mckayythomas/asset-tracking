import { mergeTypeDefs } from "@graphql-tools/merge";
import { assetSchema } from "./assetSchema";
import { buildingSchema } from "./buildingSchema";
import { departmentSchema } from "./departmentSchema";
import { locationSchema } from "./locationSchema";
import { userSchema } from "./userSchema";

const typeDefs = mergeTypeDefs([locationSchema, departmentSchema]);

import { booleanArg, extendType, nonNull } from 'nexus';

export { typeDefs };
