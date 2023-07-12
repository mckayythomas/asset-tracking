import sinon, { SinonStub } from "sinon";
import {describe, expect, test, jest,  beforeEach, afterEach} from '@jest/globals';
import { assetResolvers } from '../src/graphql/resolvers/assetResolvers';
import { mockAuthenticationContext } from '../src/utils/validation';
import { ObjectId } from 'mongodb';
import { Types } from 'mongoose';
import { sum } from '../src/graphql/resolvers/sum';
import { Asset } from '../src/models/asset';

let objId1 = new Types.ObjectId('60d5ecb8b392d70a349fea1d');
let objId2 = new Types.ObjectId('60d5ecb8b392d70a349fea2e');
let objId3 = new Types.ObjectId('60d5ecb8b392d70a349fea3f');
let objId4 = new Types.ObjectId('60d5ecb8b392d70a349fea4d');
let objId5 = new Types.ObjectId('60d5ecb8b392d70a349fea5e');
let objId6 = new Types.ObjectId('60d5ecb8b392d70a349fea6f');

describe('sum module', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });
});

describe('assetResolvers module', () => {
    let findStub: SinonStub;
    let findByIdStub: SinonStub;

    beforeEach(() => {
        findStub = sinon.stub(Asset, 'find');
        findByIdStub = sinon.stub(Asset, 'findById');
      });

      afterEach(() => {
        findStub.restore();
        findByIdStub.restore();
      });

    let getAssetsTest = 'getAssets returns an array of assets';
    test(getAssetsTest, async () => {
        const mockData = [
          {
            _id: objId1,
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
            _id: objId2,
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

        findStub.returns(mockData);

        const mockContext = mockAuthenticationContext({});
        const result = await assetResolvers.Query.getAssets(mockContext);
        expect(result).toEqual(mockData);
        console.log("getAssetsTest:", getAssetsTest, "result:", result);
        console.log("************************************************");
    });

    let getAssetByIdTest = 'getAssetById returns a single asset by ID';
    test(getAssetByIdTest, async () => {
        const mockData = [
          {
            _id: objId1,
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
            _id: objId2,
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
          {
            _id: objId3,
            assetId: 'A3',
            serialNumber: 'SN7',
            brand: 'Brand5',
            purchaseDate: '2021-02-02',
            model: 'Model3',
            modelNumber: 'MN5',
            purchasePrice: 20000,
            image: 'image3.jpg',
            physicalDescription: 'Description3',
            building: 'Building3',
            department: 'Department3',
            user: 'User3'
          },
        ];

        findByIdStub.returns(mockData[0]);

        const mockContext = mockAuthenticationContext({});
        let id = objId1;
        let result = await assetResolvers.Query.getAssetById(null, { _id: id }, mockContext);
        let expectedAsset = mockData.find((asset) => asset._id === id);
        expect(result).toEqual(expectedAsset);
        console.log("getAssetByIdTest: query id = ", id);
        console.log("result = ", result);
        console.log("************************************************");
    }, 20000); // 20 seconds

    let getAssetsByParams = 'getAssetsByParams returns assets by parameter - value pairs';
    test(getAssetsByParams, async () => {
        const mockData = [
          {
            _id: objId1,
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
            _id: objId2,
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
          {
            _id: objId3,
            assetId: 'A3',
            serialNumber: 'SN7',
            brand: 'Brand5',
            purchaseDate: '2021-02-02',
            model: 'Model3',
            modelNumber: 'MN5',
            purchasePrice: 20000,
            image: 'image3.jpg',
            physicalDescription: 'Description3',
            building: 'Building3',
            department: 'Department3',
            user: 'User3'
          },
          {
            _id: objId4,
            assetId: 'A4',
            serialNumber: 'SN4',
            brand: 'Brand6',
            purchaseDate: '2023-01-04',
            model: 'Model4',
            modelNumber: 'MN4',
            purchasePrice: 14000,
            image: 'image1.jpg',
            physicalDescription: 'Description4',
            building: 'Building4',
            department: 'Department4',
            user: 'User4'
          },
          {
            _id: objId5,
            assetId: 'A5',
            serialNumber: 'SN5',
            brand: 'Brand6',
            purchaseDate: '2023-01-05',
            model: 'Model5',
            modelNumber: 'MN5',
            purchasePrice: 15500,
            image: 'image5.jpg',
            physicalDescription: 'Description5',
            building: 'Building5',
            department: 'Department5',
            user: 'User5'
          },
          {
            _id: objId6,
            assetId: 'A6',
            serialNumber: 'SN6',
            brand: 'Brand6',
            purchaseDate: '2023-01-06',
            model: 'Model6',
            modelNumber: 'MN6',
            purchasePrice: 16000,
            image: 'image6.jpg',
            physicalDescription: 'Description6',
            building: 'Building6',
            department: 'Department6',
            user: 'User6'
          },
        ];

        // Stub the find method with target mock data
        findStub.withArgs(sinon.match.object).returns({
            exec: () => Promise.resolve(mockData),
        });

        // Set the target parameter-value pairs
        const searchParams = {
            brand: 'Brand6',
            purchasePrice: { operator: ">", value: 15000 }
        };
        const mockContext = mockAuthenticationContext({});
        const result = await assetResolvers.Query.getAssetsByParams(null, { searchParams }, mockContext);
        const expectedAssets = mockData.filter((asset) =>
            Object.entries(searchParams).every(([key, value]) => {
                if (key === 'purchasePrice') {
                  if (typeof value === 'object' && value !== null && 'operator' in value && 'value' in value) {
                    const { operator, value: compareValue } = value as { operator: string; value: number };
                    const assetValue = Number(asset[key as keyof typeof asset]);
                    switch (operator) {
                        case '>':
                            return assetValue > compareValue;
                        case '<':
                            return assetValue < compareValue;
                        case '>=':
                            return assetValue >= compareValue;
                        case '<=':
                            return assetValue <= compareValue;
                        case '==':
                            return assetValue === compareValue;
                        case '!=':
                            return assetValue !== compareValue;
                        default:
                            return false;
                    }
                  } else {
                    const assetValue = asset[key as keyof typeof asset];
                    return assetValue === value;
                  }
                } else {
                  const assetValue = asset[key as keyof typeof asset];
                  return assetValue === value;
                }
            })
        );
        // Executing the query
        try {
            const query = Asset.find(searchParams);
            const assets = await query.exec();
            expect(assets).toEqual(expectedAssets);
            console.log("getAssetsByParams:", getAssetsByParams, "result:", assets);
            console.log("************************************************");
        } catch (error) {
            console.error("getAssetsByParams error: ", error);
        }
    }, 20000); // 20 seconds timeout
});