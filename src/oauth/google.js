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
exports.verify = void 0;
var passport_1 = require("passport");
var passport_google_oauth20_1 = require("passport-google-oauth20");
var user_1 = require("../models/user");
var googleOptions = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URI
};
var googleCallBack = function (accessToken, refreshToken, profile, done) { return __awaiter(void 0, void 0, void 0, function () {
    var user, newUser, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_1.User.find({ googleId: profile.id })];
            case 1:
                user = _a.sent();
                if (!!user) return [3 /*break*/, 5];
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                newUser = new user_1.User({
                    googleId: profile.id,
                    displayName: profile.displayName,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    picture: profile.photos[0].value
                });
                return [4 /*yield*/, newUser.save()];
            case 3:
                user = _a.sent();
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                throw new Error("Failed to create user!");
            case 5: return [2 /*return*/, done(null, user)];
        }
    });
}); };
// __mocks__/googleOAuth.ts
exports.verify = jest.fn().mockImplementation(function () {
    return Promise.resolve({
        userId: 'fakeUserId',
        email: 'fakeemail@gmail.com',
    });
});
passport_1.default.use(new passport_google_oauth20_1.Strategy(googleOptions, googleCallBack));
passport_1.default.serializeUser(function (user, done) { return done(null, user); });
passport_1.default.deserializeUser(function (user, done) { return done(null, user); });
