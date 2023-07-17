"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockAuthenticationContext = exports.checkAuthentication = exports.checkRequiredFields = exports.checkId = void 0;
var graphql_1 = require("graphql");
var mongodb_1 = require("mongodb");
var checkId = function (Id) {
    if (!mongodb_1.ObjectId.isValid(Id)) {
        throw new graphql_1.GraphQLError("Please use a valid id!", {
            extensions: { code: "BAD_USER_INPUT" }
        });
    }
};
exports.checkId = checkId;
var checkRequiredFields = function (data, fields) {
    if (fields === void 0) { fields = []; }
    for (var _i = 0, fields_1 = fields; _i < fields_1.length; _i++) {
        var field = fields_1[_i];
        if (!data[field]) {
            throw new graphql_1.GraphQLError("".concat(field, " field is required!"), {
                extensions: { code: "BAD_USER_INPUT" }
            });
        }
    }
};
exports.checkRequiredFields = checkRequiredFields;
var checkAuthentication = function (request) {
    if (!request.isAuthenticated()) {
        throw new graphql_1.GraphQLError("You're not logged in!");
    }
};
exports.checkAuthentication = checkAuthentication;
// Middleware to mock authenticate that is used during testing
var mockAuthenticationContext = function (context) {
    context.user = { id: 'testUserId' };
    context.isAuthenticated = function () { return true; };
    return context;
};
exports.mockAuthenticationContext = mockAuthenticationContext;
