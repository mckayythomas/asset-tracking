const buildingSchema = `
    "The Building object, represents a physical building."
    type Building {

        "The unique identifier of the building within the database."
        _id: ID!

        "The unique identifier for the building used internally."
        buildingId: String!

        "The unique identifier for the location used internally."
        locationId: String!

        "Name of the building."
        name: String!

        "Number of floors the building has."
        floors: Int!

        "Arrays of department ID's associated with the building."
        departments: [Department!]!
    }

    "Input for create a new building. All fields are required and represent the initial properties of the building."
    input BuildingCreateData {

        "The unique identifier for the building used internally."
        buildingId: String!

        "The unique identifier for the location used internally."
        locationId: String!

        "Name of the building."
        name: String!

        "Number of floors the building has."
        floors: Int!

        "Arrays of department ID's associated with the building."
        departments: [String!]!
    }

    "Input for the update of a building. The only required field is the database id for the building."
    input BuildingUpdateData {

        "The unique identifier of the building within the database."
        _id: ID!

        "The unique identifier for the building used internally."
        buildingId: String

        "The unique identifier for the location used internally."
        locationId: String

        "Name of the building."
        name: String

        "Number of floors the building has."
        floors: Int!

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
        createBuilding( input: BuildingCreateData! ): Building!

        "Update a building document in database."
        updateBuilding( input: BuildingUpdateData! ): Building!

        "Delete a building document in database."
        deleteBuilding( buildingId: ID! ): ID!
    }
`;

export { buildingSchema };
