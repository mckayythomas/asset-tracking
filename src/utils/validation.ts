import { GraphQLError } from "graphql";
import { ObjectId } from "mongodb";
import { Request } from "express";

export const checkId = (Id: string) => {
    if (!ObjectId.isValid(Id)) {
        throw new GraphQLError("Please use a valid id!", {
            extensions: { code: "BAD_USER_INPUT" }
        });
    }
};

export const checkRequiredFields = (data: any, fields: string[] = []) => {
    for (const field of fields) {
        if (!data[field]) {
            throw new GraphQLError(`${field} field is required!`, {
                extensions: { code: "BAD_USER_INPUT" }
            });
        }
    }
};

export const checkValidFields = (data: any, validFields: string[] = []) => {
    const fields: any = {};
    if (data) {
        for (const field of validFields) {
            if (data[field]) {
                fields[field] = data[field];
            }
        }
    }
    return fields;
};

export const checkAuthentication = (request: Request) => {
    if (!request.isAuthenticated()) {
        throw new GraphQLError("You're not logged in!");
    }
};

export const mockContext = (context: any) => {
    context = { ...context };
    context.user = { id: "testUserId" };
    context.isAuthenticated = () => true;
    return context;
};
