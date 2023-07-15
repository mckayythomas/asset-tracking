import mongoose from 'mongoose';
// import supertest from 'supertest';
import { ObjectId } from 'mongoose';
import {describe, expect, test, jest,  beforeEach, afterEach} from '@jest/globals';
import { assetResolvers } from '../src/graphql/resolvers/assetResolvers';
import { mockAuthenticationContext } from '../src/utils/validation';
import { sum } from '../src/graphql/resolvers/sum';
import { Asset } from '../src/models/asset';

// test to check if server is active
// let testDesc = 'getAssets returns an array of assets';
// describe('Server', () => {
//     test('should return 200 status code when server is active', async () => {
//       const response = await supertest(app).get('/');
//       expect(response.status).toBe(200);
//     });
//   });

describe('assetResolvers module', () => {
    let testCounter: number = 0;

    beforeEach(() => {

    });

    afterEach(() => {

    });

    let testDesc = 'getAssets returns an array of all assets';
    let modelName = 'Asset';
    test(testDesc, async () => {
        const mockContext = mockAuthenticationContext({});
        const result = await assetResolvers.Query.getAssets(null, null, mockContext);
        expect(result).toHaveLength(40);
        expect(result[0]).toHaveProperty('brand');
        expect(result[0]).toHaveProperty('model');
    });

    testDesc = 'getAssetById returns a single asset matching the OID';
    modelName = 'Asset';
    test(testDesc, async () => {
      const _id = '648279b55ac374af573948d9';
      const objectId = new mongoose.Types.ObjectId(_id);
      const mockContext = mockAuthenticationContext({});
      const result = await assetResolvers.Query.getAssetById(null, { _id }, mockContext);
      expect(result).not.toBeNull();
      expect(typeof result).toBe('object');
      expect(result).toHaveProperty('brand');
      expect(result).toHaveProperty('model');
      expect(result).toHaveProperty('assetId', 'AS039');
      expect(result).toHaveProperty('serialNumber', 'EQP039');
    });

    testDesc = 'getAssetsByParams returns an array of assets matching field value(s)';
    modelName = 'Asset';
    test(testDesc, async () => {
      const searchParams = {
        brand: 'ABB',
        status: 'Active'
      };
      const mockContext = mockAuthenticationContext({});
      const result = await assetResolvers.Query.getAssetsByParams(null, { searchParams }, mockContext);
      expect(result).toHaveLength(4); 
      result.forEach((asset) => {
        expect(asset).toHaveProperty('brand', 'ABB');
        expect(asset).toHaveProperty('status', 'Active');
      });
    });

    testDesc = 'newAsset creates an asset with the specified data';
    modelName = 'Asset';
    test(testDesc, async () => {
      const assetInput = {
        assetId: 'AS099',
        serialNumber: 'EQP099',
        brand: 'ABB',
        purchaseDate: new Date('2020-06-02'),
        model: 'IRB 2600',
        modelNumber: 'ABB-IRB2300',
        purchasePrice: 35000,
        image: 'https://example.com/images/eqp010.jpg',
        physicalDescription: 'Green industrial robot with a compact footprint.',
        status: 'Active',
        condition: 'Good',
        building: '64827e605ac374af5739491b',
        department: '64827a7d5ac374af573948eb',
        user: '649642893014a3e11b469f18',
      };

      const mockContext = mockAuthenticationContext({});
      const result = await assetResolvers.Mutation.newAsset(null, { input: assetInput }, mockContext);

      // Perform assertions on the result
      expect(result).toHaveProperty('_id');
      expect(result).toHaveProperty('assetId', 'AS099');
      expect(result).toHaveProperty('serialNumber', 'EQP099');
      expect(result).toHaveProperty('brand', 'ABB');
      expect(result).toHaveProperty('purchaseDate', assetInput.purchaseDate);
      expect(result).toHaveProperty('model', 'IRB 2600');
      expect(result).toHaveProperty('modelNumber', 'ABB-IRB2300');
      expect(result).toHaveProperty('purchasePrice', 35000);
      expect(result).toHaveProperty('image', 'https://example.com/images/eqp010.jpg');
      expect(result).toHaveProperty('physicalDescription', 'Green industrial robot with a compact footprint.');
      expect(result).toHaveProperty('status', 'Active');
      expect(result).toHaveProperty('condition', 'Good');
      expect(result).toHaveProperty('building', '64827e605ac374af5739491b');
      expect(result).toHaveProperty('department', '64827a7d5ac374af573948eb');
      expect(result).toHaveProperty('user', '649642893014a3e11b469f18');
    });

    testDesc = 'updateAsset modifies an existing asset';
    modelName = 'Asset';
    test(testDesc, async () => {
      const mockContext = mockAuthenticationContext({});
      const assetsBeforeUpdate = await assetResolvers.Query.getAssets(null, null, mockContext);
      // Select an existing asset to update
      const assetToUpdate = assetsBeforeUpdate[0];
      // Define the new data to update the asset
      const updateData = {
        _id: assetToUpdate._id,
        brand: 'New Brand',
        model: 'New Model',
        purchasePrice: 50000,
      };

      // Update the asset
      const updatedAsset = await assetResolvers.Mutation.updateAsset(null, {
        _id: assetToUpdate._id,
        updateData,
      }, mockContext);

      // Retrieve the updated asset from the database
      const retrievedAsset = await assetResolvers.Query.getAssetById(null, { _id: assetToUpdate._id }, mockContext);

      // Convert the updatedAsset and retrievedAsset to plain objects
      const updatedAssetObject = JSON.parse(JSON.stringify(updatedAsset));
      const retrievedAssetObject = JSON.parse(JSON.stringify(retrievedAsset));

      // Perform assertions on the updated asset
      expect(updatedAssetObject).toEqual(retrievedAssetObject);
      expect(updatedAssetObject).toHaveProperty('brand', 'New Brand');
      expect(updatedAssetObject).toHaveProperty('model', 'New Model');
      expect(updatedAssetObject).toHaveProperty('purchasePrice', 50000);
    });

    testDesc = 'deleteAsset deletes asset';
    modelName = 'Asset';
    test(testDesc, async () => {
        const mockContext = mockAuthenticationContext({});
        const assetsBeforeUpdate = await assetResolvers.Query.getAssets(null, null, mockContext);
        // Select the 6th existing asset to delete
        const assetToDelete = assetsBeforeUpdate[5];
        const id = assetToDelete._id;
        const result = await assetResolvers.Mutation.deleteAsset(null, { _id: id }, mockContext);
        expect(result).toBe(1);
        const deletedAsset = await Asset.findById(id);
        expect(deletedAsset).toBeNull();
 });

});
