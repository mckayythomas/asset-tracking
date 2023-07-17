"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.departmentSchema = void 0;
var departmentSchema = "\n    type Department {\n        _id: ID!\n        departmentId: String!\n        name: String!\n\n        \"The location associated with this department.\"\n        location: Location!\n        head: String!\n        employeesCount: Int!\n        description: String!\n    }\n";
exports.departmentSchema = departmentSchema;
