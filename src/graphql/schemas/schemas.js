"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
var merge_1 = require("@graphql-tools/merge");
var departmentSchema_1 = require("./departmentSchema");
var locationSchema_1 = require("./locationSchema");
var typeDefs = (0, merge_1.mergeTypeDefs)([locationSchema_1.locationSchema, departmentSchema_1.departmentSchema]);
exports.typeDefs = typeDefs;
