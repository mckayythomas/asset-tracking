"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Department = void 0;
var mongoose_1 = require("mongoose");
var departmentSchema = new mongoose_1.Schema({
    departmentId: { type: String, required: true },
    name: { type: String, required: true },
    location: {},
    head: { type: String, required: true },
    employeesCount: { type: Number, required: true },
    description: { type: String, required: true }
});
var Department = mongoose_1.default.model("Department", departmentSchema, "department");
exports.Department = Department;
