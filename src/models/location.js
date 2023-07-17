"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Location = void 0;
var mongoose_1 = require("mongoose");
var locationSchema = new mongoose_1.Schema({
    locationId: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    type: { type: String, required: true },
    departments: [{ type: String, required: true }],
});
var Location = mongoose_1.default.model("Location", locationSchema, "location");
exports.Location = Location;
