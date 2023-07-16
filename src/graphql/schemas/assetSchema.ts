const assetSchema = `
    "The Asset object, represents a physical piece of equipment or other asset."
    type Asset {

        "The unique object of the asset within the database."
        _id: ID!

        "The unique identifier for the asset used internally."
        assetId: String!

        "The serial number, assigned by the manufacturer, of the asset."
        serialNumber: String!

        "The brand name of the asset."
        brand: String!

        "The purchase date for the asset."
        purchaseDate: String!

        "The model name of the asset."
        model: String!

        "The model number of the asset."
        modelNumber: String!

        "The image file for the asset."
        image: String!

        "The physical description of the asset."
        physicalDescription: String!

        "The building of the asset."
        building: String!

        "The department the asset is assigned to."
        department: String!

        "The user assigned to the asset."
        image: String!
    }

    "Input to create a new asset. All fields are required and represent the initial properties of the asset."
    input AssetCreateData {

        "The unique identifier for the asset used internally."
        assetId: String!

        "The serial number, assigned by the manufacturer, of the asset."
        serialNumber: String!

        "The brand name of the asset."
        brand: String!

        "The purchase date for the asset."
        purchaseDate: String!

        "The model name of the asset."
        model: String!

        "The model number of the asset."
        modelNumber: String!

        "The image file for the asset."
        image: String!

        "The physical description of the asset."
        physicalDescription: String!

        "The building of the asset."
        building: String!

        "The department the asset is assigned to."
        department: String!

        "The user assigned to the asset."
        image: String!
    }

    "Input for the update of an asset. The only required field is the database id for the asset."
    input AssetUpdateData {

        "The unique identifier of the asset within the database."
        _id: ID!

        "The unique identifier for the asset used internally."
        assetID: String

        "The serial number, assigned by the manufacturer, of the asset."
        serialNumber: String

        "The brand name of the asset."
        brand: String

        "The purchase date for the asset."
        purchaseDate: String

        "The model name of the asset."
        model: String

        "The model number of the asset."
        modelNumber: String

        "The image file for the asset."
        image: String

        "The physical description of the asset."
        physicalDescription: String

        "The building of the asset."
        building: String

        "The department the asset is assigned to."
        department: String

        "The user assigned to the asset."
        image: String
    }

    type Query {

        "Query to obtain a specific asset by id."
        getAsset( assetId: ID! ): Asset!

        "Retrieve all the assets in database."
        getAssets: [Asset!]!

        "Retrieve assets in database by a specific field and value."
        getAssetsByParam(fieldName: String!, fieldValue: String!): [Asset!]!

    }

    type Mutation {

        "Create a new asset document in database."
        newAsset( input: AssetCreateData! ): ID!

        "Update a asset document in database."
        updateAsset( input: AssetUpdateData! ): Asset!

        "Delete a asset document in database."
        deleteAsset( assetId: ID! ): ID!
    }
`;

export { assetSchema };
