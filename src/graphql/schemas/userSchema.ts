const userSchema = `
    "The User object, represents a user of the API."
    type User {

        "The unique identifier of the user within the database."
        _id: ID!

        "The user's unique ID associated with their google account."
        googleId: String!

        "The users display name for their account."
        displayName: String!

        "The users first name associated with their account."
        firstName: String!

        "The users last name associated with their account."
        lastName: String!

        "The users profile picture associated with their account."
        picture: String!
    }

    "Input for the creation of a user. All fields are required and represent the initial properties of the user."
    input UserCreateData {

        "The unique identifier of the user with in the database"
        _id: ID!

        "The unique profile id from the users google profile"
        googleId: String!

        "The users display name for their account."
        displayName: String!

        "The users first name associated with their account."
        firstName: String!

        "The users last name associated with their account."
        lastName: String!

        "The users profile picture associated with their account."
        picture: String!    
    
    }

    "Input for the update of a user. The only required field is the database id for the user."
    input UserUpdateData {

        "The unique identifier of the user within the database."
        _id: ID!

        "The users display name for their account."
        displayName: String

        "The users first name associated with their account."
        firstName: String

        "The users last name associated with their account."
        lastName: String

        "The users profile picture associated with their account."
        picture: String
    }

    type Query {

        "Query to obtain a specific user's info by id."
        getUser( userId: ID! ): User!
        
    }

    type Mutation {

        "Update a user profile."
        updateUser( input: UserUpdateData! ): User!

        "Delete a user profile"
        deleteUser( userId: ID! ): ID!

    }
`;

export { userSchema };
