import assert from "assert";
import { initDb, closeDb } from "../src/db/connection";
import { locationResolvers } from "../src/graphql/resolvers/locationResolvers";
import { mockContext } from "../src/utils/validation";
import { GraphQLError } from "graphql";
import { Location } from "../src/models/location";

describe("Testing location Resolvers", () => {
    let findSpy: jest.SpyInstance;
    let findByIdSpy: jest.SpyInstance;
    let createSpy: jest.SpyInstance;
    let deleteOneSpy: jest.SpyInstance;
    let locationId: string;

    beforeAll(() => {
        // Initialize the database connection.
        initDb((err: Error | null) => {
            if (err) {
                console.error(err);
            }
        });

        /* Mocking */

        // Create a spies on Location model.
        findSpy = jest.spyOn(Location, "find");
        findByIdSpy = jest.spyOn(Location, "findById");
        createSpy = jest.spyOn(Location, "create");
        deleteOneSpy = jest.spyOn(Location, "deleteOne");
    });

    afterAll(() => {
        // Close the database connection.
        closeDb();

        /* Mocking */

        // Restore the original functions.
        findSpy.mockRestore();
        findByIdSpy.mockRestore();
        createSpy.mockRestore();
        deleteOneSpy.mockRestore();
    });

    beforeEach(() => {
        // Clear the mocks.
        findSpy.mockReset();
        findByIdSpy.mockReset();
        createSpy.mockReset();
        deleteOneSpy.mockReset();
    });

    // Tests for getLocation resolver.

    it("Gets a location from getLocation resolver.", async () => {
        const context = mockContext({});
        const params = { locationId: "64827c375ac374af57394902" };
        const result: any = await locationResolvers.Query.getLocation(null, params, context);
        expect(result.errors).toBeUndefined();
        assert(result.name === "Gigafactory 1");
    });

    it("Tries to get a location, but gets an DB error.", async () => {
        findByIdSpy.mockImplementationOnce(() => {
            throw new Error("DB connection failed");
        });
        const context = mockContext({});
        const params = { locationId: "64827c375ac374af57394902" };
        try {
            const result = await locationResolvers.Query.getLocation(null, params, context);
        } catch (err) {
            const error = err as GraphQLError;
            expect(error).toBeInstanceOf(GraphQLError);
            expect(error.message).toEqual("An error occurs, please try again.");
        }
    });

    it("Tries to get a location but is not logged in.", async () => {
        const context = { isAuthenticated: () => false };
        const params = { locationId: "64827c375ac374af57394902" };
        try {
            const result = await locationResolvers.Query.getLocation(null, params, context);
        } catch (err) {
            const error = err as GraphQLError;
            expect(error).toBeInstanceOf(GraphQLError);
            expect(error.message).toEqual("You're not logged in!");
        }
    });

    it("Tries to get a location with a wrong locationId.", async () => {
        const context = mockContext({});
        const params = { locationId: "" };
        try {
            const result = await locationResolvers.Query.getLocation(null, params, context);
        } catch (err) {
            const error = err as GraphQLError;
            expect(error).toBeInstanceOf(GraphQLError);
            expect(error.message).toEqual("Please use a valid id!");
            assert(error.extensions.code === "BAD_USER_INPUT");
        }
    });

    // Tests for getLocations resolver.

    it("Get all the locations from getLocations resolver.", async () => {
        const context = mockContext({});
        const result: any = await locationResolvers.Query.getLocations(null, {}, context);
        expect(result.errors).toBeUndefined();
        expect(result).toBeTruthy();
        assert(result.length >= 1);
    });

    it("Get locations by filter.", async () => {
        const context = mockContext({});
        const params = { input: { department: "64827a5d5ac374af573948e2" } };
        const mockLocations = [
            {
                _id: "64827c375ac374af57394902",
                locationId: "L004",
                name: "Gigafactory 1",
                address: "1 Electric Avenue, Sparks, Nevada",
                type: "Manufacturing",
                departments: ["64827a715ac374af573948e8", "64827a5d5ac374af573948e2"]
            },
            {
                _id: "64827c375ac374af57394940",
                locationId: "L0010",
                name: "New Factory 24",
                address: "54 Gold Avenue, Sparks, Texas",
                type: "Administration",
                departments: ["64827a747ac374af572648e8", "64827a715ac374af573948e8"]
            }
        ];
        findSpy.mockImplementationOnce(() => Promise.resolve(mockLocations));
        const result: any = await locationResolvers.Query.getLocations(null, params, context);
        expect(result.errors).toBeUndefined();
        expect(result).toBeTruthy();
        assert(result[0].name === "Gigafactory 1");
        assert(result.length === mockLocations.length);
    });

    it("Tries to get locations by two filters.", async () => {
        const context = mockContext({});
        const params = {
            input: { department: "64827a5d5ac374af573948e2", type: "Administration" }
        };
        findSpy.mockImplementationOnce(() => {
            throw new GraphQLError("Please provide just one parameter to filter.", {
                extensions: { code: "BAD_USER_INPUT" }
            });
        });
        try {
            const result = await locationResolvers.Query.getLocations(null, params, context);
        } catch (err) {
            const error = err as GraphQLError;
            expect(error).toBeInstanceOf(GraphQLError);
            expect(error.message).toEqual("Please provide just one parameter to filter.");
            assert(error.extensions.code === "BAD_USER_INPUT");
        }
    });

    it("Tries to get locations, but gets an DB error.", async () => {
        const context = mockContext({});
        findSpy.mockImplementationOnce(() => {
            throw new Error("DB connection failed");
        });
        try {
            const result = await locationResolvers.Query.getLocations(null, {}, context);
        } catch (err) {
            const error = err as GraphQLError;
            expect(error).toBeInstanceOf(GraphQLError);
            expect(error.message).toEqual("Cannot find locations!");
        }
    });

    // Tests for departments resolver.

    it("Gets departments of a location", async () => {
        const parent = { departments: ["64827a715ac374af573948e8", "64827a5d5ac374af573948e2"] };
        const result: any = await locationResolvers.Location.departments(parent);
        expect(result.errors).toBeUndefined();
        expect(result).toBeTruthy();
        assert(result.length === parent.departments.length);
        assert(result[1].name === "Battery Technology");
        assert(result[0].name === "Engineering");
    });

    it("Throws error when a wrong department id is used.", async () => {
        const parent = { departments: ["wrongID"] };
        try {
            const result = await locationResolvers.Location.departments(parent);
        } catch (err) {
            const error = err as GraphQLError;
            expect(error).toBeInstanceOf(GraphQLError);
            expect(error.message).toEqual(
                "Cannot find departments, please review the departments id!"
            );
        }
    });

    // Tests for newLocation mutation.

    it("Creates a new location", async () => {
        const context = mockContext({});
        const params = {
            input: {
                locationId: "L021",
                name: "Test Location",
                address: "Test Address",
                type: "Testing",
                departments: ["64827a5d5ac374af573948e2", "64827a5d5ac374af573948dd"]
            }
        };
        const result: any = await locationResolvers.Mutation.newLocation(null, params, context);
        expect(result.errors).toBeUndefined();
        expect(result).toBeTruthy();
        assert.strictEqual(typeof result, "string");
        locationId = result;
    });

    it("Tries to create a new location, but gets an DB error.", async () => {
        createSpy.mockImplementationOnce(() => {
            throw new Error("DB connection failed");
        });
        const context = mockContext({});
        const params = {
            input: {
                locationId: "L021",
                name: "Test Location",
                address: "Test Address",
                type: "Testing",
                departments: ["64827a5d5ac374af573948e2", "64827a5d5ac374af573948dd"]
            }
        };
        try {
            const result = await locationResolvers.Mutation.newLocation(null, params, context);
        } catch (err) {
            const error = err as GraphQLError;
            expect(error).toBeInstanceOf(GraphQLError);
            expect(error.message).toEqual("Failed to create new location, please try again!");
        }
    });

    it("Tries to create a new location, but missing parameters.", async () => {
        const context = mockContext({});
        const params = {
            input: {
                locationId: "L021",
                name: "Test Location",
                address: "Test Address",
                type: "Testing"
            }
        };
        try {
            const result = await locationResolvers.Mutation.newLocation(null, params, context);
        } catch (err) {
            const error = err as GraphQLError;
            expect(error).toBeInstanceOf(GraphQLError);
            expect(error.message).toEqual("departments field is required!");
            assert(error.extensions.code === "BAD_USER_INPUT");
        }
    });

    // Tests for updateLocation mutation.

    it("Updates a location", async () => {
        const context = mockContext({});
        const newName = "The New Name Location";
        const params = { input: { _id: locationId, name: newName } };
        const result: any = await locationResolvers.Mutation.updateLocation(null, params, context);
        expect(result.errors).toBeUndefined();
        expect(result).toBeTruthy();
        assert(result.name === newName);
    });

    it("Tries to update a location with a wrong locationId.", async () => {
        const context = mockContext({});
        const newName = "The New Name Location";
        const params = { input: { _id: "64827a715ac374af573948e8", name: newName } };
        try {
            const result = await locationResolvers.Mutation.updateLocation(null, params, context);
        } catch (err) {
            const error = err as GraphQLError;
            expect(error).toBeInstanceOf(GraphQLError);
            expect(error.message).toEqual("Location not found, check your _id!");
            assert(error.extensions.code === "BAD_USER_INPUT");
        }
    });

    it("Tries to update a location with no parameters.", async () => {
        const context = mockContext({});
        const params = { input: { _id: locationId } };
        try {
            const result = await locationResolvers.Mutation.updateLocation(null, params, context);
        } catch (err) {
            const error = err as GraphQLError;
            expect(error).toBeInstanceOf(GraphQLError);
            expect(error.message).toEqual("No valid fields provided for the update!");
            assert(error.extensions.code === "BAD_USER_INPUT");
        }
    });

    it("Tries to update a location but no changes made.", async () => {
        const context = mockContext({});
        const newName = "The New Name Location";
        const params = { input: { _id: locationId, name: newName } };
        try {
            const result = await locationResolvers.Mutation.updateLocation(null, params, context);
        } catch (err) {
            const error = err as GraphQLError;
            expect(error).toBeInstanceOf(GraphQLError);
            expect(error.message).toEqual("Nothing to update, please try again!");
            assert(error.extensions.code === "BAD_USER_INPUT");
        }
    });

    // Tests for deleteLocation mutation.

    it("Tries to delete location unsuccessfully.", async () => {
        deleteOneSpy.mockImplementationOnce(() => Promise.resolve({ deletedCount: 0 }));
        const context = mockContext({});
        const params = { locationId: locationId };
        try {
            const result = await locationResolvers.Mutation.deleteLocation(null, params, context);
        } catch (err) {
            const error = err as GraphQLError;
            expect(error).toBeInstanceOf(GraphQLError);
            expect(error.message).toEqual("Failed to delete the location, please try again!");
        }
    });

    it("Deletes a location", async () => {
        const context = mockContext({});
        const params = { locationId: locationId };
        const result: any = await locationResolvers.Mutation.deleteLocation(null, params, context);
        expect(result.errors).toBeUndefined();
        expect(result).toBeTruthy();
        assert.strictEqual(typeof result, "string");
    });

    it("Tries to delete a location with a wrong locationId.", async () => {
        const context = mockContext({});
        const params = { locationId: "64827a715ac374af573948e8" };
        try {
            const result = await locationResolvers.Mutation.deleteLocation(null, params, context);
        } catch (err) {
            const error = err as GraphQLError;
            expect(error).toBeInstanceOf(GraphQLError);
            expect(error.message).toEqual("Location not found, please check your locationId!");
            assert(error.extensions.code === "BAD_USER_INPUT");
        }
    });
});
