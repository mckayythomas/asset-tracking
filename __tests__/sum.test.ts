// import mockingoose from 'mockingoose';
import mockingoose from 'mockingoose';
import {describe, expect, test, jest,  beforeEach, afterEach} from '@jest/globals';
import { assetResolvers } from '../src/graphql/resolvers/assetResolvers';
import { sum } from '../src/graphql/resolvers/sum';
import { Asset } from '../src/models/asset';

describe('sum module', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });
});

describe('assetResolvers module', () => {
    beforeEach(() => {
      mockingoose(Asset).toReturn([], 'find');
    });

    afterEach(() => {
      mockingoose.resetAll();
    });

    test('getAssets returns an array of assets', async () => {
      const mockData = [
        {
          _id: '1',
          assetId: 'A1',
          serialNumber: 'SN1',
          brand: 'Brand1',
          purchaseDate: '2023-01-01',
          model: 'Model1',
          modelNumber: 'MN1',
          purchasePrice: 15000,
          image: 'image1.jpg',
          physicalDescription: 'Description1',
          building: 'Building1',
          department: 'Department1',
          user: 'User1'
        },
        {
          _id: '2',
          assetId: 'A2',
          serialNumber: 'SN2',
          brand: 'Brand2',
          purchaseDate: '2023-02-02',
          model: 'Model2',
          modelNumber: 'MN2',
          purchasePrice: 25000,
          image: 'image2.jpg',
          physicalDescription: 'Description2',
          building: 'Building2',
          department: 'Department2',
          user: 'User2'
        },
      ];

      mockingoose(Asset).toReturn(mockData, 'find');

      const result = await assetResolvers.Query.getAssets(null, null, {});

      expect(result).toEqual(mockData);
    });
});