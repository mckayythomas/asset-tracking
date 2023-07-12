import { server } from "../src/app";
import { gql } from "@apollo/client";
import { describe, expect, test} from "@jest/globals"

it("Checks that the get user resolver returns correct fields", async () => {
    const result = await server.executeOperation({
        query: gql`
            query {
                getUser(userId: "64973a6b121e7cd9f5d94421")
            }
        `
    });
    expect(result).toBeDefined();
    expect(result).toBe("64973a6b121e7cd9f5d94421")
});