import { assetResolvers } from '../src/graphql/resolvers/assetResolvers';
import { Asset } from '../src/models/asset';
import mockingoose from 'mockingoose';
import * as validation from '../src/utils/validation';

describe('assetResolvers', () => {
    let authSpy: jest.SpyInstance;

    beforeEach(() => {
        authSpy = jest.spyOn(validation, 'checkAuthentication');
        authSpy.mockReturnValue(undefined);
    });

    afterEach(() => {
        authSpy.mockRestore();
    });

    describe('Query', () => {
        describe('getAssets', () => {
        it('should return all assets', async () => {
            // Setting up expected assets
            const assets = [
            { _id: '1', assetId: 'Asset1', serialNumber: '123' },
            { _id: '2', assetId: 'Asset2', serialNumber: '456' },
            ];

            // Mocking the find() function using Mockingoose
            mockingoose(Asset).toReturn(assets, 'find');

            const context = {
                req: {
                  headers: {
                    authorization: 'Bearer mock-auth-token',
                  },
                },
            };
            const result = await assetResolvers.Query.getAssets(null, null, context);
            expect(result).toEqual(assets);
        });

        it('should throw an error if the database call fails', async () => {
            // Making the mocked find() function reject with an error
            mockingoose(Asset).toReturn(new Error('Database error'), 'find');
            const context = {
                req: {
                    headers: {
                        authorization: 'Bearer dummy-token',
                    },
                },
            };
            // Calling the resolver function and expecting it to throw an error
            await expect(assetResolvers.Query.getAssets(null, null, context)).rejects.toThrow('Cannot find locations!');
        });
        });
    });
});
