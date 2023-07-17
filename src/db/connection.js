"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDb = exports.initDb = void 0;
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
var mongoose_1 = require("mongoose");
var _db;
var initDb = function (callback) {
    if (_db) {
        return callback(null, _db);
    }
    mongoose_1.default
        .connect(process.env.MONGODB_URI)
        .then(function (client) {
        _db = client.connection;
        callback(null, _db);
    })
        .catch(function (err) {
        callback(err);
    });
};
exports.initDb = initDb;
var getDb = function () {
    if (!_db) {
        throw Error("Db not initialized");
    }
    return _db;
};
exports.getDb = getDb;
