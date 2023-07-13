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
        building: Building

        "The department the asset is assigned to."
        department: Department

        "The user assigned to the asset."
        user: User
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
        user: String!
    }

    "Input for the update of an asset. All fields are optional and represent the properties of the asset to be updated"
    input AssetUpdateData {
        "The unique identifier for the asset used internally."
        assetId: String
    
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
        user: String
    }

    type User {
        id: ID!
        email: String!
    }

    type Query {

        "Query to obtain a specific asset by id."
        getAsset( assetId: ID! ): Asset!

        "Retrieve all the assets in database."
        getAssets: [Asset!]!

        "Retrieve assets in database by a specific field and value."
        getAssetsByParam(fieldName: String!, fieldValue: String!): [Asset!]!

        "Retrieve user information from Google OAuth using the token."
        me: User!

        "Test query to check if the server is running."
        hello(name: String): String!
    }

    type Mutation {

        "Create a new asset document in database."
        newAsset( input: AssetCreateData! ): ID!

        "Update an asset document in database."
        updateAsset(_id: ID!, updateData: AssetUpdateData!): Asset

        "Delete a asset document in database."
        deleteAsset( assetId: ID! ): ID!
    }
`;

export { assetSchema };
