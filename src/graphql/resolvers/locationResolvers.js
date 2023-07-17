"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.locationResolvers = void 0;
var location_1 = require("../../models/location");
var department_1 = require("../../models/department");
var graphql_1 = require("graphql");
var validation_1 = require("../../utils/validation");
var locationResolvers = {
    Query: {
        getLocation: function (parent, args, context) { return __awaiter(void 0, void 0, void 0, function () {
            var id, location_2, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        (0, validation_1.checkAuthentication)(context);
                        id = args.locationId;
                        (0, validation_1.checkId)(id);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, location_1.Location.findById(id)];
                    case 2:
                        location_2 = _a.sent();
                        return [2 /*return*/, location_2];
                    case 3:
                        error_1 = _a.sent();
                        throw new graphql_1.GraphQLError("An error occurs, please try again.");
                    case 4: return [2 /*return*/];
                }
            });
        }); },
        getLocations: function (parent, args, context) { return __awaiter(void 0, void 0, void 0, function () {
            var locations, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        (0, validation_1.checkAuthentication)(context);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, location_1.Location.find()];
                    case 2:
                        locations = _a.sent();
                        return [2 /*return*/, locations];
                    case 3:
                        error_2 = _a.sent();
                        throw new graphql_1.GraphQLError("Cannot find locations!");
                    case 4: return [2 /*return*/];
                }
            });
        }); }
    },
    Location: {
        departments: function (parent) { return __awaiter(void 0, void 0, void 0, function () {
            var departments, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, department_1.Department.find({ _id: parent.departments })];
                    case 1:
                        departments = _a.sent();
                        return [2 /*return*/, departments];
                    case 2:
                        error_3 = _a.sent();
                        throw new graphql_1.GraphQLError("Cannot find departments, please review the departments id!");
                    case 3: return [2 /*return*/];
                }
            });
        }); }
    },
    Mutation: {
        newLocation: function (parent, args, context) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                (0, validation_1.checkAuthentication)(context);
                (0, validation_1.checkRequiredFields)(args, []);
                return [2 /*return*/];
            });
        }); }
    }
};
exports.locationResolvers = locationResolvers;
