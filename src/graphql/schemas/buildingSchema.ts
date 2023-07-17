const buildingSchema = `
    "The Building object, represents a physical building."
    type Building {

        "The unique identifier of the building within the database."
        _id: ID!

        "The unique identifier for the building used internally."
        buildingId: String!

        "Name of the building."
        name: String!

        "Physical address of the building."
        address: String!

        "Category of the building."
        type: String!

        "Arrays of department ID's associated with the building."
        departments: [Department!]!
    }

    "Input for create a new building. All fields are required and represent the initial properties of the building."
    input BuildingCreateData {

        "The unique identifier for the building used internally."
        buildingID: String!

        "Name of the building."
        name: String!

        "Physical address of the building."
        address: String!

        "Category of the building."
        type: String!

        "Arrays of department ID's associated with the building."
        departments: [String!]!
    }

    "Input for the update of a building. The only required field is the database id for the building."
    input BuildingUpdateData {

        "The unique identifier of the building within the database."
        _id: ID!

        "The unique identifier for the building used internally."
        buildingID: String

        "Name of the building."
        name: String

        "Physical address of the building."
        address: String

        "Category of the building."
        type: String

        "Arrays of department ID's associated with the building."
        departments: [String]
    }

    type Query {

        "Query to obtain a specific building by id."
        getBuilding( buildingId: ID! ): Building!

        "Retrieve all the buildings in database."
        getBuildings: [Building!]!
    }

    type Mutation {

        "Create a new building document in database."
        createBuilding( input: BuildingCreateData! ): ID!

        "Update a building document in database."
        updateBuilding( input: BuildingUpdateData! ): Building!

        "Delete a building document in database."
        deleteBuilding( buildingId: ID! ): ID!
    }
`;

export { buildingSchema };