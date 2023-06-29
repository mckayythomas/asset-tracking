const departmentSchema = `
    type Department {
        _id: ID!
        departmentId: String!
        name: String!

        "The location associated with this department."
        location: Location!
        head: String!
        employeesCount: Int!
        description: String!
    }
`;

export { departmentSchema };
