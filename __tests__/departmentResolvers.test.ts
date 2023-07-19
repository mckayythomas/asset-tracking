import { departmentResolvers } from "../src/graphql/resolvers/departmentResolvers";
import { Department } from "../src/models/department";
import { mockContext } from "../src/utils/validation";
import { initDb, closeDb } from "../src/db/connection";
import { GraphQLError } from "graphql";
import { MongoMemoryServer } from "mongodb-memory-server";

describe("departmentResolver testing", () => {
    let mongoServer: MongoMemoryServer;
    let findSpy: jest.SpyInstance;
    let findByIdSpy: jest.SpyInstance;
    let createSpy: jest.SpyInstance;
    let updateOneSpy: jest.SpyInstance;
    let deleteOneSpy: jest.SpyInstance;


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

        const testDepartment1 = new Department({
            _id: "64827a5d5ac374af573948df",
            "departmentId": "D003",
            "name": "Sales and Marketing",
            "location": "Los Angeles, California",
            "head": "Michael Johnson",
            "employeesCount": 200,
            "description": "Responsible for promoting and selling Tesla vehicles and managing customer relationships."
        });
        await testDepartment1.save();

        const testDepartment2 = new Department({
            _id: "64827a5d5ac374af573948de",
            "departmentId": "D004",
            "name": "Technology",
            "location": "Portland, Oregon",
            "head": "Greg Doucette",
            "employeesCount": 100,
            "description": "Responsible for regional technology solutions."
        });
        await testDepartment2.save();

        findSpy = jest.spyOn(Department, "find");
        findByIdSpy = jest.spyOn(Department, "findById");
        updateOneSpy = jest.spyOn(Department, "updateOne");
        createSpy = jest.spyOn(Department, "create");
        deleteOneSpy = jest.spyOn(Department, "deleteOne");
    }, 50000);

    beforeEach(() => {
        findSpy.mockClear();
        findByIdSpy.mockClear();
        updateOneSpy.mockClear();
        deleteOneSpy.mockClear();
        createSpy.mockReset();
    });

    afterAll(async () => {
        closeDb();

        await mongoServer.stop();

        findSpy.mockRestore();
        findByIdSpy.mockRestore();
        updateOneSpy.mockRestore();
        deleteOneSpy.mockRestore();
        createSpy.mockRestore();
    });

    it("Gets all departments from getDepartments resolver", async () => {
        const context = mockContext({});

        const result: any = await departmentResolvers.Query.getDepartments(null, null, context);

        expect(result).toHaveLength(2);
        expect(result[0].departmentId).toEqual("D003");
        expect(result[1].departmentId).toEqual("D004");
        expect(result[0].name).toEqual("Sales and Marketing");
        expect(result[1].name).toEqual("Technology");
    });

    it("Gets a department from getDepartment resolver based on departmentId", async () => {
        const context = mockContext({});
        const params = { departmentId: "64827a5d5ac374af573948df" };
        const result: any = await departmentResolvers.Query.getDepartment(null, params, context);
        expect(result._id.toString()).toEqual("64827a5d5ac374af573948df");
        expect(result.departmentId).toEqual("D003");
        expect(result.name).toEqual("Sales and Marketing");
        expect(result.location).toEqual("Los Angeles, California");
        expect(result.head).toEqual("Michael Johnson");
        expect(result.employeesCount).toEqual(200);
        expect(result.description).toEqual("Responsible for promoting and selling Tesla vehicles and managing customer relationships.");
    }, 15000);

    it("Returns an error from an incorrect departmentId", async () => {
        const context = mockContext({});
        const params = { departmentId: "fakeDepartmentId" };
        await expect(departmentResolvers.Query.getDepartment(null, params, context)).rejects.toThrowError(
            GraphQLError
        );
    });

    it("Creates a new department using createDepartment resolver", async () => {
        const context = mockContext({});
        const args = {input :
            {
            departmentId: "B003",
            name: "New Department",
            location: "New Location",
            head: "Greg Doucette",
            employeesCount: 230,
            description: "The New Department for unit testing"}
        };

        const result: any = await departmentResolvers.Mutation.createDepartment(null, args, context);

        expect(createSpy).toHaveBeenCalledTimes(1);
        expect(result.name).toEqual("New Department");
        expect(result.departmentId).toEqual("B003");
        expect(result.location).toEqual("New Location");
        expect(result.head).toEqual("Greg Doucette");
        expect(result.employeesCount).toEqual(230);
        expect(result.description).toEqual("The New Department for unit testing");
    });

    it("Throws an error from createDepartment resolver with missing required fields", async () => {
        const context = mockContext({});
        const params = {
            // Missing required fields
        };

        await expect(
            departmentResolvers.Mutation.createDepartment(null, params, context)
        ).rejects.toThrowError(GraphQLError);
    });

    it("Updates a departments information based on department input", async () => {
        const context = mockContext({});
        const params = { input: { _id: "64827a5d5ac374af573948df", head: "Dwayne Cutler" } };

        const result = await departmentResolvers.Mutation.updateDepartment(null, params, context);
        expect(result._id.toString()).toEqual("64827a5d5ac374af573948df");
        expect(result.departmentId).toEqual("D003");
        expect(result.name).toEqual("Sales and Marketing");
        expect(result.location).toEqual("Los Angeles, California");
        expect(result.head).toEqual("Dwayne Cutler");
        expect(result.employeesCount).toEqual(200);
        expect(result.description).toEqual("Responsible for promoting and selling Tesla vehicles and managing customer relationships.");
    });

    it("Checks that updating with wrong id throws errors and doesn't work", async () => {
        const context = mockContext({});
        const params = { input: { _id: "falseId", head: "Dwayne Cutler" } };
        await expect(departmentResolvers.Mutation.updateDepartment(null, params, context)).rejects.toThrowError(
            GraphQLError
        );
    });

    it("Checks that having missing parameters or null parameters turns back an error.", async () => {
        const context = mockContext({});
        const params = { input: { _id: "falseId", head: null } };
        await expect(departmentResolvers.Mutation.updateDepartment(null, params, context)).rejects.toThrowError(
            GraphQLError
        );
    });

    it("Deletes a departments information from the database based on id", async () => {
        const context = mockContext({});
        const params = { departmentId: "64827a5d5ac374af573948df" };
        const result = await departmentResolvers.Mutation.deleteDepartment(null, params, context);
        expect(result).toEqual("64827a5d5ac374af573948df");
    });

    it("Checks that delete department returns error if ID is faulty", async () => {
        const context = mockContext({});
        const params = { departmentId: null };
        await expect(departmentResolvers.Mutation.deleteDepartment(null, params, context)).rejects.toThrowError(
            GraphQLError
        );
    });
});
