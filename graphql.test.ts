import { verify } from '../src/oauth/google';
import {server as serverPromise} from "../src/app";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from "../src/graphql/schemas/schemas";
import { resolvers } from "../src/graphql/resolvers/resolvers";
import gql from 'graphql-tag';

jest.mock('../src/oauth/google');

interface MyContext {
    token?: String;
}

const testServer = new ApolloServer<MyContext>({ typeDefs, resolvers });
let url: string;

beforeAll(async () => {
    const result = await startStandaloneServer(testServer, {
        context: async ({ req }) => ({ token: req.headers.token }),
        listen: { port: 3000 },
    });
    url = result.url;
    console.log(`🚀  Server ready at ${url}`);
})

describe('GraphQL - Test User Resolvers', () => {

    it('returns hello with the provided name', async () => {

        const response = await testServer.executeOperation({
          query: 'query SayHelloWorld($name: String) { hello(name: $name) }',
          variables: { name: 'world' },
        });

        // Note the use of Node's assert rather than Jest's expect; if using
        // TypeScript, `assert`` will appropriately narrow the type of `body`
        // and `expect` will not.
        // assert(response.body.kind === 'single');
        if (response.body.kind === 'single' && 'data' in response.body) {
            expect(response.body.singleResult.errors).toBeUndefined();
            expect(response.body.singleResult.data?.hello).toBe('Hello world!');
        },
    });

    it('Fetches current user', async () => {
        (verify as jest.Mock).mockResolvedValue({
            userId: 'fakeUserId',
            email: 'fakeemail@gmail.com',
        });

        const GET_ME = `
            query {
            me {
                id
                email
            }
            }
        `;

        const response = await testServer.executeOperation({
            query: GET_ME,
            context: { req: { headers: { authorization: 'Bearer fake-token' } } }
        });

        expect(response.body.singleResult.errors).toBeUndefined();
        expect(response.body.singleResult.data).toHaveProperty('me');
        expect(response.body.singleResult.data.me).toEqual({
            id: 'fakeUserId',
            email: 'fakeemail@gmail.com',
        });

    // Write more test cases...

    });
});
