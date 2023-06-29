import mongoose, { Schema } from "mongoose";

const departmentSchema = new Schema({
    departmentId: { type: String, required: true },
    name: { type: String, required: true },
    location: {},
    head: { type: String, required: true },
    employeesCount: { type: Number, required: true },
    description: { type: String, required: true }
});

const Department = mongoose.model("Department", departmentSchema, "department");

export { Department };
