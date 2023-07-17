import { GraphQLError } from "graphql";
import { Request, Response, NextFunction } from 'express';
import { ObjectId } from "mongodb";

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

export const checkAuthentication = (request: Request) => {
    if (!request.isAuthenticated()) {
        throw new GraphQLError("You're not logged in3!");
    }
};

// Middleware to mock authenticate that is used during testing
export const mockAuthenticationContext = (context: any) => {
    context.user = { id: 'testUserId' };
    context.isAuthenticated = () => true;
    return context;
};
