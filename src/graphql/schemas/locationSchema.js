"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.locationSchema = void 0;
var locationSchema = "\n    \"The Location object, represents a physical location of the buildings.\"\n    type Location {\n\n        \"The unique identifier of the location within the database.\"\n        _id: ID!\n\n        \"The unique identifier for the location used internally.\"\n        locationId: String!\n\n        \"Name of the location.\"\n        name: String!\n\n        \"Physical address of the location.\"\n        address: String!\n\n        \"Category of the location.\"\n        type: String!\n\n        \"Arrays of department ID's associated with the location.\"\n        departments: [Department!]!\n    }\n\n    \"Input for create a new location. All fields are required and represent the initial properties of the location.\"\n    input LocationCreateData {\n\n        \"The unique identifier for the location used internally.\"\n        locationID: String!\n\n        \"Name of the location.\"\n        name: String!\n\n        \"Physical address of the location.\"\n        address: String!\n\n        \"Category of the location.\"\n        type: String!\n\n        \"Arrays of department ID's associated with the location.\"\n        departments: [String!]!\n    }\n\n    \"Input for the update of a location. The only required field is the database id for the location.\"\n    input LocationUpdateData {\n\n        \"The unique identifier of the location within the database.\"\n        _id: ID!\n\n        \"The unique identifier for the location used internally.\"\n        locationID: String\n\n        \"Name of the location.\"\n        name: String\n\n        \"Physical address of the location.\"\n        address: String\n\n        \"Category of the location.\"\n        type: String\n\n        \"Arrays of department ID's associated with the location.\"\n        departments: [String]\n    }\n\n    type Query {\n\n        \"Query to obtain a specific location by id.\"\n        getLocation( locationId: ID! ): Location!\n\n        \"Retrieve all the locations in database.\"\n        getLocations: [Location!]!\n    }\n\n    type Mutation {\n\n        \"Create a new location document in database.\"\n        newLocation( input: LocationCreateData! ): ID!\n\n        \"Update a location document in database.\"\n        updateLocation( input: LocationUpdateData! ): Location!\n\n        \"Delete a location document in database.\"\n        deleteLocation( locationId: ID! ): ID!\n    }\n";
exports.locationSchema = locationSchema;