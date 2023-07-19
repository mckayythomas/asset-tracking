import { buildingResolvers } from "../src/graphql/resolvers/buildingResolvers";
import { Building } from "../src/models/building";
import { mockContext } from "../src/utils/validation";
import { initDb, closeDb } from "../src/db/connection";
import { GraphQLError } from "graphql";
import { MongoMemoryServer } from "mongodb-memory-server";

describe("buildingResolver testing", () => {
    let mongoServer: MongoMemoryServer;
    let findByIdSpy: jest.SpyInstance;
    let findSpy: jest.SpyInstance;
    let createSpy: jest.SpyInstance;
    let findByIdAndUpdateSpy: jest.SpyInstance;
    let findByIdAndDeleteSpy: jest.SpyInstance;

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

        const testBuilding1 = new Building({
            _id: "64b0b0a31860bbb2a05c75de",
            buildingId: "B001",
            locationId: "L001",
            name: "Main_Building",
            floors: 4,
            departments: ["Research_and_Development", "Information_Technology", "Human_Resources"]
        });
        await testBuilding1.save();

        const testBuilding2 = new Building({
            _id: "64b0b0a31859bbb2a05c75de",
            buildingId: "B002",
            locationId: "L002",
            name: "Test_Building2",
            floors: 3,
            departments: ["Research_and_Development", "Information_Technology", "Human_Resources"]
        });
        await testBuilding2.save();

        findByIdSpy = jest.spyOn(Building, "findById");
        findSpy = jest.spyOn(Building, "find");
        createSpy = jest.spyOn(Building, "create");
        findByIdAndUpdateSpy = jest.spyOn(Building, "findByIdAndUpdate");
        findByIdAndDeleteSpy = jest.spyOn(Building, "findByIdAndDelete");
    }, 50000);

    beforeEach(() => {
        findByIdSpy.mockClear();
        findSpy.mockClear();
        createSpy.mockClear();
        findByIdAndUpdateSpy.mockClear();
        findByIdAndDeleteSpy.mockClear();
    });

    afterAll(async () => {
        closeDb();

        await mongoServer.stop();

        findByIdSpy.mockRestore();
        findSpy.mockRestore();
        createSpy.mockRestore();
        findByIdAndUpdateSpy.mockRestore();
        findByIdAndDeleteSpy.mockRestore();
    });

    it("Gets a list of all buildings from getBuildings resolver", async () => {
        const context = mockContext({});

        const result: any = await buildingResolvers.Query.getBuildings(null, null, context);

        expect(findSpy).toHaveBeenCalledTimes(1);
        expect(result).toHaveLength(2);
        expect(result[0].name).toEqual("Main_Building");
        expect(result[1].name).toEqual("Test_Building2");
    });

    it("Gets a building from getBuilding resolver based on buildingId", async () => {
        const context = mockContext({});
        const params = { buildingId: "64b0b0a31860bbb2a05c75de" };

        const result: any = await buildingResolvers.Query.getBuilding(null, params, context);

        expect(findByIdSpy).toHaveBeenCalledTimes(1);
        expect(result._id.toString()).toEqual("64b0b0a31860bbb2a05c75de");
        expect(result.locationId).toEqual("L001");
        expect(result.name).toEqual("Main_Building");
        expect(result.floors).toEqual(4);
        expect(result.departments).toEqual([
            "Research_and_Development",
            "Information_Technology",
            "Human_Resources"
        ]);
    });

    it("Returns an error from getBuilding resolver with incorrect buildingId", async () => {
        const context = mockContext({});
        const params = { _id: "fakeBuildingId" };

        await expect(
            buildingResolvers.Query.getBuilding(null, params, context)
        ).rejects.toThrowError(GraphQLError);
    });

    it("Creates a new building using createBuilding resolver", async () => {
        const context = mockContext({});
        const params = {
            input: {
                buildingId: "B003",
                locationId: "L003",
                name: "New Building",
                floors: 5,
                departments: ["Sales", "Operations"]
            }
        };

        const result: any = await buildingResolvers.Mutation.createBuilding(null, params, context);

        expect(createSpy).toHaveBeenCalledTimes(1);
        expect(result.name).toEqual("New Building");
    });

    it("Throws an error from createBuilding resolver with missing required fields", async () => {
        const context = mockContext({});
        const params = {
            input: {
                // Missing required fields
            }
        };

        await expect(
            buildingResolvers.Mutation.createBuilding(null, params, context)
        ).rejects.toThrowError(GraphQLError);
    });

    it("Updates an existing building using updateBuilding resolver", async () => {
        const context = mockContext({});
        const params = {
            input: {
                _id: "64b0b0a31859bbb2a05c75de",
                name: "Updated Building",
                floors: 6,
                departments: ["Sales", "Operations"]
            }
        };

        const result: any = await buildingResolvers.Mutation.updateBuilding(null, params, context);

        expect(findByIdAndUpdateSpy).toHaveBeenCalledTimes(1);
        expect(result.name).toEqual("Updated Building");
    });

    it("Throws an error from updateBuilding resolver with incorrect buildingId", async () => {
        const context = mockContext({});
        const params = {
            input: {
                _id: "fakeBuildingId"
                // Other fields
            }
        };

        await expect(
            buildingResolvers.Mutation.updateBuilding(null, params, context)
        ).rejects.toThrowError(GraphQLError);
    });

    it("Deletes a building using deleteBuilding resolver", async () => {
        const context = mockContext({});
        const params = { buildingId: "64b0b0a31859bbb2a05c75de" };

        const result: any = await buildingResolvers.Mutation.deleteBuilding(null, params, context);

        expect(findByIdAndDeleteSpy).toHaveBeenCalledTimes(1);
        expect(result).toEqual("64b0b0a31859bbb2a05c75de");
    });

    it("Throws an error from deleteBuilding resolver with incorrect buildingId", async () => {
        const context = mockContext({});
        const params = { id: "fakeBuildingId" };

        await expect(
            buildingResolvers.Mutation.deleteBuilding(null, params, context)
        ).rejects.toThrowError(GraphQLError);
    });
});
