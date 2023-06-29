const locationSchema = `
    type Location {
        _id: ID!
        locationId: String!
        name: String!
        address: String!
        type: String!
        departments: [Department!]!
    }

    input LocationInput {
        locationID: String
        name: String
        address: String
        type: String
        departments: [String]
    }

    type Query {
        getLocation( locationId: ID! ): Location!
        getLocations: [Location!]!
    }

    type Mutation {
        newLocation( input: LocationInput! ): ID!
    }
`;

export { locationSchema };
