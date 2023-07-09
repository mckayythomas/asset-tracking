import { server } from "../src/app";
import { gql } from "@apollo/client";

it("runs a health check against our GraphQL schema", async () => {
    let result = await server.executeOperation({
        query: gql`
        query {
            test(bool: false)
        }
        `,
    });
    
  expect(result).toBeTruthy();
  expect(result).toHaveProperty("data");
  expect((result as any).errors).toBeFalsy();
  expect((result as any).data?.test).toEqual(false);

  result = await server.executeOperation({
    query: gql`
      query {
        test(bool: invalidArgument)
      }
    `,
  });
});