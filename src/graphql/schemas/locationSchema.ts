const locationSchema = `
    "The Location object, represents a physical location of the buildings."
    type Location {

        "The unique identifier of the location within the database."
        _id: ID!

        "The unique identifier for the location used internally."
        locationId: String!

        "Name of the location."
        name: String!

        "Physical address of the location."
        address: String!

        "Category of the location."
        type: String!

        "Arrays of department ID's associated with the location."
        departments: [Department!]!
    }

    "Input for create a new location. All fields are required and represent the initial properties of the location."
    input LocationCreateData {

        "The unique identifier for the location used internally."
        locationID: String!

        "Name of the location."
        name: String!

        "Physical address of the location."
        address: String!

        "Category of the location."
        type: String!

        "Arrays of department ID's associated with the location."
        departments: [String!]!
    }

    "Input for the update of a location. The only required field is the database id for the location."
    input LocationUpdateData {

        "The unique identifier of the location within the database."
        _id: ID!

        "The unique identifier for the location used internally."
        locationID: String

        "Name of the location."
        name: String

        "Physical address of the location."
        address: String

        "Category of the location."
        type: String

        "Arrays of department ID's associated with the location."
        departments: [String]
    }

    type Query {

        "Query to obtain a specific location by id."
        getLocation( locationId: ID! ): Location!

        "Retrieve all the locations in database."
        getLocations: [Location!]!
    }

    type Mutation {

        "Create a new location document in database."
        newLocation( input: LocationCreateData! ): ID!

        "Update a location document in database."
        updateLocation( input: LocationUpdateData! ): Location!

        "Delete a location document in database."
        deleteLocation( locationId: ID! ): ID!
    }
`;

export { locationSchema };
