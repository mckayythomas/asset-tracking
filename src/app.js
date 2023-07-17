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
exports.server = void 0;
var express_1 = require("express");
var cors_1 = require("cors");
var passport_1 = require("passport");
var express_session_1 = require("express-session");
var server_1 = require("@apollo/server");
var default_1 = require("@apollo/server/plugin/landingPage/default");
var express4_1 = require("@apollo/server/express4");
var connection_1 = require("./db/connection");
var schemas_1 = require("./graphql/schemas/schemas");
var resolvers_1 = require("./graphql/resolvers/resolvers");
var graphql_passport_1 = require("graphql-passport");
require("./oauth/google");
var port = process.env.PORT || 3000;
var app = (0, express_1.default)();
var server;
function startServer() {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    exports.server = server = new server_1.ApolloServer({
                        typeDefs: schemas_1.typeDefs,
                        resolvers: resolvers_1.resolvers,
                        plugins: [(0, default_1.ApolloServerPluginLandingPageLocalDefault)()],
                        introspection: true
                    });
                    app.use((0, express_session_1.default)({ secret: process.env.SECRET, resave: false, saveUninitialized: false }));
                    app.use(passport_1.default.initialize());
                    app.use(passport_1.default.session());
                    return [4 /*yield*/, server.start()];
                case 1:
                    _a.sent();
                    app.use("/graphql", (0, cors_1.default)(), express_1.default.json(), (0, express4_1.expressMiddleware)(server, {
                        context: function (_a) {
                            var req = _a.req, res = _a.res;
                            return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_b) {
                                return [2 /*return*/, (0, graphql_passport_1.buildContext)({ req: req, res: res })];
                            }); });
                        }
                    }));
                    app.get("/login", passport_1.default.authenticate("google", { scope: ["profile"] }));
                    app.get("/auth/google/callback", passport_1.default.authenticate("google", { failureRedirect: "/login" }), function (req, res) { return res.redirect("/graphql"); });
                    app.get("/logout", function (req, res) {
                        req.logout(function () { return res.redirect("/graphql"); });
                    });
                    (0, connection_1.initDb)(function (err) {
                        if (err) {
                            console.error(err);
                        }
                        else {
                            app.listen(port);
                            console.log("Web Server is listening at http://localhost:".concat(port, "/graphql"));
                            return server;
                        }
                    });
                    return [2 /*return*/];
            }
        });
    });
}
startServer().catch(function (error) {
    console.error("Error starting the server:", error);
});
