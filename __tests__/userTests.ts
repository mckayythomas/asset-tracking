import { userResolvers } from "../src/graphql/resolvers/userResolvers";
import { User } from "../src/models/user";
import { mockContext } from "../src/test-utils/mockContext";
import { initDb, closeDb } from "../src/db/connection";
import assert from "assert";
import { GraphQLError } from "graphql";

jest.mock("../src/models/user");

describe("userResolver testing", () => {
    
    beforeAll(async () => {
        await initDb((err: Error | null) => {
            if (err) {
                console.error(err);
            }
        }) 
    });

    afterAll(async () => {
        closeDb();
    });

    it("Gets a user from getUser resolver based on userId", async () => {
        const context = mockContext({});
        console.log(context);
        const params = { userId: "64b046e2436b58e59da311ad" };
        const result: any = await userResolvers.Query.getUser( null, params, context );
        expect(result).toEqual(expect.objectContaining({
            _id: "64b046e2436b58e59da311ad",
            googleId: "103947073870737383139",
            displayName: "McKay Thomas",
            firstName: "McKay",
            lastName: "Thomas",
            picture: "https://lh3.googleusercontent.com/a/AAcHTtcd_vnnQ0cChWCnrewTHZ5lxBOb9qWpGxsnqnvEObMJ=s96-c",
            __v: 0
        }));
    });

    it("Returns an error from an incorrect userId", async () => {
        const context = mockContext({});
        const params = { userId: "fakeUserId"};
        await expect (
            userResolvers.Query.getUser(null, params, context)
        ).rejects.toThrowError(GraphQLError);
    })
});
