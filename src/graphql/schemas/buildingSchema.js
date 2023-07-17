"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildingSchema = void 0;
var buildingSchema = "\n    type Building {\n        _id: ID!\n        buildingId: String!\n        locationId: String!\n\n        \"The name of the building.\"\n        name: String!\n\n        \"The number of floors in the building.\"\n        floors: Int!\n\n        \"The departments located in the building.\"\n        departments: [Department!]!\n    }\n\n    type Department {\n        name: String!\n    }\n";
exports.buildingSchema = buildingSchema;
