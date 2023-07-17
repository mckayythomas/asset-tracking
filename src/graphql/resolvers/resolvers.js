"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
var merge_1 = require("@graphql-tools/merge");
var locationResolvers_1 = require("./locationResolvers");
var resolvers = (0, merge_1.mergeResolvers)(locationResolvers_1.locationResolvers);
exports.resolvers = resolvers;
