const departmentSchema = `
    type Department {
        _id: ID!
        departmentId: String!
        name: String!
        location: Location!
        head: String!
        employeesCount: Int!
        description: String!
    }
`;

export { departmentSchema };
