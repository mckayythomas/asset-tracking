const buildingSchema = `
    type Building {
        _id: ID!
        buildingId: String!
        locationId: String!

        "The name of the building."
        name: String!

        "The number of floors in the building."
        floors: Int!

        "The departments located in the building."
        departments: [Department!]!
    }

    type Department {
        name: String!
    }
`;

export { buildingSchema };