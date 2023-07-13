import { userResolvers } from "../src/graphql/resolvers/userResolvers";
import { User } from "../src/models/user";
import { mockContext, fakeArguments } from "../src/test-utils/mockContext";
import { initDb, closeDb } from "../src/db/connection";
import assert from "assert";

jest.mock("../src/models/user");

describe("userResolver testing", () => {
    beforeAll(async () => {
        initDb((err: Error | null) => {
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
        const params = { userId: "64973a6b121e7cd9f5d94421" };
        const result: any = await userResolvers.Query.getUser( null, params, context );
        console.log(result)
        // expect(result.error).toBeUndefined();
        assert(result.displayName === "McKay Thomas");
    });

});
