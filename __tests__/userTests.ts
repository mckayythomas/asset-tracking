import { userResolvers } from "../src/graphql/resolvers/userResolvers";
import { User } from "../src/models/user";
import { fakeLogin, fakeArguments } from "../src/test-utils/fakeContext";

jest.mock("../src/models/user");

describe("userResolver test", () => {
    let findMock: jest.Mock;

    beforeEach(() => {
        findMock = jest.fn();
        User.find = findMock;
    });

    let getUserTest = "Check if getUser function returns appropiate user data.";
    test(getUserTest, async () => {
        const mockData = [
            {
                _id: "64973a6b121e7cd9f5d94421",
                googleId: "123",
                displayName: "Greg Greg",
                firstName: "Greg",
                lastName: "Greg",
                picture: "thispiciscool.jpg"
            }
        ];
        findMock.mockResolvedValue(mockData);

        const context = fakeLogin(true);
        const args = fakeArguments(mockData[0]._id);

        const result = await userResolvers.Query.getUser(null, args, context);
        console.log(result)

        expect(result).toEqual(mockData);
        console.log(result)
    })
})