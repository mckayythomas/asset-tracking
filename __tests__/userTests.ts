import { userResolvers } from "../src/graphql/resolvers/userResolvers";
import { User } from "../src/models/user";
import { fakeLogin } from "../src/test-utils/fakeContext";

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
                _id: "abc",
                googleId: "123",
                displayName: "Greg Greg",
                firstName: "Greg",
                lastName: "Greg",
                picture: "thispiciscool.jpg"
            }
        ];
        findMock.mockResolvedValue(mockData);
        const context = fakeLogin(true);
        const result = await userResolvers.Query.getUser(null, null, context);
        expect(result).toEqual(mockData);
    })
})