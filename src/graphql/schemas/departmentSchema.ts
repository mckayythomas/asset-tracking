const departmentSchema = `
    "Department objects represent each department in the API."
    type Department {

        "The unique department ID used internally in the database."
        _id: ID!

        "The human-readable, abbreviated ID for a department."
        departmentId: String!

        "The name of the department."
        name: String!

        "The location associated with this department."
        location: String!

        "The name of the department head."
        head: String!

        "The number of employees in a department."
        employeesCount: Int!

        "A description of the department."
        description: String!
    }

    "Input for the creation of a department. All fields are required, which create a corresponding Department object."
    input DepartmentCreateData {

        "The unique department ID used internally in the database."
        _id: ID!

        "The human-readable, abbreviated ID for a department."
        departmentId: String!

        "The name of the department."
        name: String!

        "The location associated with this department."
        location: String!

        "The name of the department head."
        head: String!

        "The number of employees in a department."
        employeesCount: Int!

        "A description of the department."
        description: String! 
    }

    "Input for the update of a department. The only required field is the database id for the department."
    input DepartmentUpdateData {

        "The unique department ID used internally in the database."
        _id: ID!

        "The name of the department."
        name: String!

        "The location associated with this department."
        location: String!

        "The name of the department head."
        head: String!

        "The number of employees in a department."
        employeesCount: Int!

        "A description of the department."
        description: String!
    }

    type Query {

        "Query to obtain a department's info by id."
        getDepartment( departmentId: ID! ): Department!
        
    }

    type Mutation {

        "Update a department object."
        updateDepartment( input: DepartmentUpdateData! ): Department!

        "Delete a department object."
        deleteDepartment( departmentId: ID! ): Department!

    }
`;

export { departmentSchema };
