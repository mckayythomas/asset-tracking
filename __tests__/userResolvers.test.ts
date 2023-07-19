import { userResolvers } from "../src/graphql/resolvers/userResolvers";
import { User } from "../src/models/user";
import { mockContext } from "../src/utils/validation";
import { initDb, closeDb } from "../src/db/connection";
import { GraphQLError } from "graphql";
import { MongoMemoryServer } from "mongodb-memory-server";

describe("userResolver testing", () => {
    let mongoServer: MongoMemoryServer;
    let findByIdSpy: jest.SpyInstance;
    let updateOneSpy: jest.SpyInstance;

    beforeAll(async () => {
        mongoServer = new MongoMemoryServer();
        await mongoServer.start();
        const mongoUri = mongoServer.getUri();
        process.env.MONGODB_URI = mongoUri;

        await initDb((err: Error | null) => {
            if (err) {
                console.error(err);
            }
        });

        const testUser = new User({
            _id: "64b0b0a31859bbb2a05c75de",
            googleId: "12345678",
            displayName: "Test User",
            firstName: "Test",
            lastName: "User",
            picture: "ThisUserIsForTestingTheApolloServerOrInUnitTests.jpg"
        });
        await testUser.save();

        findByIdSpy = jest.spyOn(User, "findById");
        updateOneSpy = jest.spyOn(User, "updateOne");
    }, 50000);

    beforeEach(() => {
        findByIdSpy.mockReset();
        updateOneSpy.mockReset();
    });

    afterAll(async () => {
        closeDb();

        await mongoServer.stop();

        findByIdSpy.mockRestore();
        updateOneSpy.mockRestore();
    });

    it("Gets a user from getUser resolver based on userId", async () => {
        const context = mockContext({});
        const params = { userId: "64b0b0a31859bbb2a05c75de" };
        const result: any = await userResolvers.Query.getUser(null, params, context);
        expect(result._id.toString()).toEqual("64b0b0a31859bbb2a05c75de");
        expect(result.googleId).toEqual("12345678");
        expect(result.displayName).toEqual("Test User");
        expect(result.firstName).toEqual("Test");
        expect(result.lastName).toEqual("User");
        expect(result.picture).toEqual("ThisUserIsForTestingTheApolloServerOrInUnitTests.jpg");
    }, 15000);

    it("Returns an error from an incorrect userId", async () => {
        const context = mockContext({});
        const params = { userId: "fakeUserId" };
        await expect(userResolvers.Query.getUser(null, params, context)).rejects.toThrowError(
            GraphQLError
        );
    });

    it("Updates a users information based on user input", async () => {
        const context = mockContext({});
        const params = { input: { _id: "64b0b0a31859bbb2a05c75de", displayName: "User Test" } };

        const result = await userResolvers.Mutation.updateUser(null, params, context);
        expect(result._id.toString()).toEqual("64b0b0a31859bbb2a05c75de");
        expect(result.googleId).toEqual("12345678");
        expect(result.displayName).toEqual("User Test");
        expect(result.firstName).toEqual("Test");
        expect(result.lastName).toEqual("User");
        expect(result.picture).toEqual("ThisUserIsForTestingTheApolloServerOrInUnitTests.jpg");
    });

    it("Checks that updating with wrong id throws errors and doesn't work", async () => {
        const context = mockContext({});
        const params = { input: { _id: "falseId", displayName: "User Test" } };
        await expect(userResolvers.Mutation.updateUser(null, params, context)).rejects.toThrowError(
            GraphQLError
        );
    });

    it("Checks that having missing parameters or null parameters turns back an error.", async () => {
        const context = mockContext({});
        const params = { input: { _id: "falseId", displayName: null } };
        await expect(userResolvers.Mutation.updateUser(null, params, context)).rejects.toThrowError(
            GraphQLError
        );
    });

    it("Deletes a users information from the database based on id", async () => {
        const context = mockContext({});
        const params = { userId: "64b0b0a31859bbb2a05c75de" };
        const result = await userResolvers.Mutation.deleteUser(null, params, context);
        expect(result).toEqual("64b0b0a31859bbb2a05c75de");
    });

    it("Checks that delete user returns error if ID is faulty", async () => {
        const context = mockContext({});
        const params = { userId: null };
        await expect(userResolvers.Mutation.deleteUser(null, params, context)).rejects.toThrowError(
            GraphQLError
        );
    });
});
