import sinon, { SinonStub, SinonStubbedInstance, stub  } from "sinon";
import {describe, expect, test, jest,  beforeEach, afterEach} from '@jest/globals';
import { assetResolvers } from '../src/graphql/resolvers/assetResolvers';
import { mockAuthenticationContext } from '../src/utils/validation';
import { ObjectId } from 'mongodb';
import { Types, Model } from 'mongoose';
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
    let saveStub: SinonStub;
    let deleteOneStub: SinonStub;

    beforeEach(() => {
        findStub = sinon.stub(Asset, 'find');
        findByIdStub = sinon.stub(Asset, 'findById');
        deleteOneStub = sinon.stub(Asset, 'deleteOne');
      });

      afterEach(() => {
        findStub.restore();
        findByIdStub.restore();
        deleteOneStub.restore();
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
            status: 'Available',
            condition: 'Good',
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
            status: 'Available',
            condition: 'Good',
            building: 'Building2',
            department: 'Department2',
            user: 'User2'
          },
        ];

        findStub.returns(mockData);

        const mockContext = mockAuthenticationContext({});
        const result = await assetResolvers.Query.getAssets(mockContext);
        console.log("Get Assets Test");
        console.log("Expected result:", mockData);
        console.log("Received result:", result);
        expect(result).toEqual(mockData);
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
            status: 'Available',
            condition: 'Good',
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
            status: 'Available',
            condition: 'Good',
            building: 'Building2',
            department: 'Department2',
            user: 'User2'
          },
        ];

        findByIdStub.returns(mockData[0]);

        const mockContext = mockAuthenticationContext({});
        let id = objId1;
        let result = await assetResolvers.Query.getAssetById(null, { _id: id }, mockContext);
        let expectedData = mockData.find((asset) => asset._id === id);
        console.log("Get Asset By ID Test");
        console.log("Expected result:", expectedData);
        console.log("Received result:", result);
        expect(result).toEqual(expectedData);
    }, 20000); // 20 seconds

    // const getAssetsByParamsTest = 'getAssetsByParams accurately returns assets by parameter - value pairs';
    // test(getAssetsByParamsTest, async () => {
    //     const mockData = [
    //         {
    //             _id: objId3,
    //             assetId: 'A3',
    //             serialNumber: 'SN7',
    //             brand: 'Brand5',
    //             purchaseDate: '2021-02-02',
    //             model: 'Model3',
    //             modelNumber: 'MN5',
    //             purchasePrice: 20000,
    //             image: 'image3.jpg',
    //             physicalDescription: 'Description3',
    //             status: 'Available',
    //             condition: 'Good',
    //             building: 'Building3',
    //             department: 'Department3',
    //             user: 'User3'
    //         },
    //         {
    //             _id: objId4,
    //             assetId: 'A4',
    //             serialNumber: 'SN4',
    //             brand: 'Brand6',
    //             purchaseDate: '2023-01-04',
    //             model: 'Model4',
    //             modelNumber: 'MN4',
    //             purchasePrice: 14000,
    //             image: 'image1.jpg',
    //             physicalDescription: 'Description4',
    //             status: 'Available',
    //             condition: 'Good',
    //             building: 'Building4',
    //             department: 'Department4',
    //             user: 'User4'
    //         },
    //         {
    //             _id: objId5,
    //             assetId: 'A5',
    //             serialNumber: 'SN5',
    //             brand: 'Brand6',
    //             purchaseDate: '2023-01-05',
    //             model: 'Model5',
    //             modelNumber: 'MN5',
    //             purchasePrice: 15500,
    //             image: 'image5.jpg',
    //             physicalDescription: 'Description5',
    //             status: 'Available',
    //             condition: 'Good',
    //             building: 'Building5',
    //             department: 'Department5',
    //             user: 'User5',
    //         },
    //         {
    //             _id: objId6,
    //             assetId: 'A6',
    //             serialNumber: 'SN6',
    //             brand: 'Brand6',
    //             purchaseDate: '2023-01-06',
    //             model: 'Model6',
    //             modelNumber: 'MN6',
    //             purchasePrice: 16000,
    //             image: 'image6.jpg',
    //             physicalDescription: 'Description6',
    //             status: 'Available',
    //             condition: 'Good',
    //             building: 'Building6',
    //             department: 'Department6',
    //             user: 'User6',
    //         },
    //     ];

    //     // Set the target parameter-value pairs as query parameters.
    //     const searchParams: { [key: string]: string } = {
    //         brand: 'Brand6',
    //         purchasePrice: '>15000'
    //     };

    //     const operators: { [key: string]: (assetValue: number, value: number) => boolean } = {
    //         '>': (assetValue, value) => assetValue > value,
    //         '<': (assetValue, value) => assetValue < value,
    //         '>=': (assetValue, value) => assetValue >= value,
    //         '<=': (assetValue, value) => assetValue <= value,
    //         '=': (assetValue, value) => assetValue === value,
    //         '!=': (assetValue, value) => assetValue !== value
    //     };

    //     interface AssetDocument {
    //         assetId: string;
    //         serialNumber: string;
    //         brand: string;
    //         purchaseDate: string;
    //         model: string;
    //         modelNumber: string;
    //         purchasePrice: number;
    //         image: string;
    //         physicalDescription: string;
    //         status: string;
    //         condition: string;
    //         building: string;
    //         department: string;
    //         user: string;
    //       }

    //     const findStub: SinonStub = sinon.stub(Asset, 'find') as SinonStub;

    //     const expectedData: AssetDocument[] = mockData.filter((asset: AssetDocument) => {
    //         return Object.entries(searchParams).every(([fieldName, fieldValue]) => {
    //             if (fieldName === 'purchasePrice') {
    //                 const operator = fieldValue[0];
    //                 const value = Number(fieldValue.substring(1));
    //                 const assetValue = Number(asset[fieldName as keyof AssetDocument]);
    //                 const operation = operators[operator];
    //                 return operation(assetValue, value);
    //             } else {
    //                 return asset[fieldName as keyof AssetDocument] === fieldValue;
    //             }
    //         });
    //     });

    //     // Here is the corrected stub setup.
    //     findStub.withArgs(sinon.match.object).returns({
    //         exec: jest.fn().mockResolvedValue(expectedData),
    //     });

    //     const mockContext = mockAuthenticationContext({});
    //     const result = await assetResolvers.Query.getAssetsByParams(null, { searchParams }, mockContext);
    //     console.log("Get Assets by Parameters Test");
    //     console.log("Expected result:", expectedData);
    //     console.log("Received result:", result);
    //     expect(result).toEqual(expectedData);
    // }, 20000);

    // getAssetByParams BAK
    // let getAssetsByParams = 'getAssetsByParams returns assets by parameter - value pairs';
    // test(getAssetsByParams, async () => {
    //     const mockData = [
    //         {
    //             _id: objId3,
    //             assetId: 'A3',
    //             serialNumber: 'SN7',
    //             brand: 'Brand5',
    //             purchaseDate: '2021-02-02',
    //             model: 'Model3',
    //             modelNumber: 'MN5',
    //             purchasePrice: 20000,
    //             image: 'image3.jpg',
    //             physicalDescription: 'Description3',
    //             status: 'Available',
    //             condition: 'Good',
    //             building: 'Building3',
    //             department: 'Department3',
    //             user: 'User3'
    //         },
    //         {
    //             _id: objId4,
    //             assetId: 'A4',
    //             serialNumber: 'SN4',
    //             brand: 'Brand6',
    //             purchaseDate: '2023-01-04',
    //             model: 'Model4',
    //             modelNumber: 'MN4',
    //             purchasePrice: 14000,
    //             image: 'image1.jpg',
    //             physicalDescription: 'Description4',
    //             status: 'Available',
    //             condition: 'Good',
    //             building: 'Building4',
    //             department: 'Department4',
    //             user: 'User4'
    //         },
    //         {
    //             _id: objId5,
    //             assetId: 'A5',
    //             serialNumber: 'SN5',
    //             brand: 'Brand6',
    //             purchaseDate: '2023-01-05',
    //             model: 'Model5',
    //             modelNumber: 'MN5',
    //             purchasePrice: 15500,
    //             image: 'image5.jpg',
    //             physicalDescription: 'Description5',
    //             status: 'Available',
    //             condition: 'Good',
    //             building: 'Building5',
    //             department: 'Department5',
    //             user: 'User5',
    //         },
    //         {
    //             _id: objId6,
    //             assetId: 'A6',
    //             serialNumber: 'SN6',
    //             brand: 'Brand6',
    //             purchaseDate: '2023-01-06',
    //             model: 'Model6',
    //             modelNumber: 'MN6',
    //             purchasePrice: 16000,
    //             image: 'image6.jpg',
    //             physicalDescription: 'Description6',
    //             status: 'Available',
    //             condition: 'Good',
    //             building: 'Building6',
    //             department: 'Department6',
    //             user: 'User6',
    //         },
    //     ];

    //   // Set the target parameter-value pairs as query parameters
    //   const searchParams: { [key: string]: string } = {
    //     brand: 'Brand6',
    //     purchasePrice: '>15000'
    //   };

    //   const operators: { [key: string]: (assetValue: number, value: number) => boolean } = {
    //     '>': (assetValue, value) => assetValue > value,
    //     '<': (assetValue, value) => assetValue < value,
    //     '>=': (assetValue, value) => assetValue >= value,
    //     '<=': (assetValue, value) => assetValue <= value,
    //     '=': (assetValue, value) => assetValue === value,
    //     '!=': (assetValue, value) => assetValue !== value
    //   };

    //   interface AssetDocument {
    //     assetId: string;
    //     serialNumber: string;
    //     brand: string;
    //     purchaseDate: string;
    //     model: string;
    //     modelNumber: string;
    //     purchasePrice: number;
    //     image: string;
    //     physicalDescription: string;
    //     status: string;
    //     condition: string;
    //     building: string;
    //     department: string;
    //     user: string;
    //   }

    //   const findStub: SinonStub = sinon.stub(Asset, 'find') as SinonStub;

    //   const expectedData = mockData.filter((asset: AssetDocument) => {
    //     return Object.entries(searchParams).every(([fieldName, fieldValue]) => {
    //       if (fieldName === 'purchasePrice') {
    //         const operator = fieldValue[0];
    //         const value = Number(fieldValue.substring(1));
    //         const assetValue = Number(asset[fieldName as keyof AssetDocument]);
    //         const operation = operators[operator];
    //         return operation(assetValue, value);
    //       } else {
    //         return asset[fieldName as keyof AssetDocument] === fieldValue;
    //       }
    //     });
    //   });

    //   findStub.withArgs(sinon.match.object).returns({
    //     exec: jest.fn().mockResolvedValue(mockData),
    //   });

    //   const mockContext = mockAuthenticationContext({});
    //   const result = await assetResolvers.Query.getAssetsByParams(null, { searchParams }, mockContext);
    //   console.log("Get Assets by Parameters Test");
    //   console.log("Expected result:", expectedData);
    //   console.log("Received result:", result);
    //   expect(result).toEqual(expectedData);
    // }, 20000);

    let newAssetTest = 'newAsset creates a new asset';
    test(newAssetTest, async () => {
        const mockData = {
            assetId: 'A9',
            serialNumber: 'SN1',
            brand: 'Brand1',
            purchaseDate: '2023-01-01',
            model: 'Model1',
            modelNumber: 'MN1',
            purchasePrice: 15000,
            image: 'image1.jpg',
            physicalDescription: 'Description1',
            status: 'Available',
            condition: 'Good',
            building: 'Building1',
            department: 'Department1',
            user: 'User1',
          };

        saveStub = sinon.stub(Asset.prototype, 'save');
        saveStub.returns(Promise.resolve(mockData));
        const mockContext = mockAuthenticationContext({});
        const result = await assetResolvers.Mutation.newAsset(null, mockData, mockContext);

        const resultWithoutId: any = { ...result };
        console.log("resultWithoutId:", resultWithoutId);
        delete resultWithoutId._id;
        console.log("New Asset Test");
        console.log("Expected result:", mockData);
        console.log("Received result:", resultWithoutId);
        expect(resultWithoutId).toEqual(mockData);
        saveStub.restore();
    }, 20000); // 20 seconds timeout

    let updateAssetTest = 'updateAsset modifies an existing asset';
    test(updateAssetTest, async () => {
        const originalMockData = {
            assetId: 'A1',
            serialNumber: 'SN1',
            brand: 'Brand1',
            purchaseDate: '2023-01-01',
            model: 'Model1',
            modelNumber: 'MN1',
            purchasePrice: 15000,
            image: 'image1.jpg',
            physicalDescription: 'Description1',
            status: 'Available',
            condition: 'Good',
            building: 'Building1',
            department: 'Department1',
            user: 'User1'
        };

        const modifiedMockData = {
            ...originalMockData,
            purchasePrice: 20000,
            department: 'Research & Development',
            user: 'Rich Gervais'
        };

        findByIdStub.returns(Promise.resolve(originalMockData));
        const saveStub = sinon.stub(Asset.prototype, 'save');
        saveStub.returns(Promise.resolve({ ...modifiedMockData, toObject: () => modifiedMockData }));

        const mockContext = mockAuthenticationContext({});
        const result = await assetResolvers.Mutation.updateAsset({}, { _id: objId6, updateData: modifiedMockData }, mockContext);
        console.log("Update Asset Test");
        console.log("Expected result:", modifiedMockData);
        console.log("Received result:", result);
        expect(result).toEqual(modifiedMockData);
        saveStub.restore();
    }, 20000); // 20 seconds timeout

    let deleteAssetTest = 'deleteAsset deletes an asset';
    test(deleteAssetTest, async () => {
        deleteOneStub.returns(Promise.resolve({ deletedCount: 1 }));

        const mockData = {
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
            status: 'Available',
            condition: 'Good',
            building: 'Building2',
            department: 'Department2',
            user: 'User2'
          };

        const mockContext = mockAuthenticationContext({});
        const result = await assetResolvers.Mutation.deleteAsset({}, { _id: objId2 }, mockContext);
        console.log("Delete Asset Test");
        console.log("Expected result:", 1);
        console.log("Received result:", result);
        expect(result).toEqual(1);
    });
});