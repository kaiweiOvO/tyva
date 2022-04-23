"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __importDefault(require("./index"));
(0, index_1.default)(1, "boolean");
(0, index_1.default)("kw", "boolean");
// vaildateType([1], "array");
(0, index_1.default)(true, "number");
(0, index_1.default)(undefined, "number");
// string
(0, index_1.default)({ name: "kw" }, { name: "number" });
(0, index_1.default)({ name: "kw" }, { name: { type: "string", length: 1 } });
(0, index_1.default)({ name: "kw" }, { name: { type: "string", maxLen: 1 } });
(0, index_1.default)({ name: "kw" }, { name: { type: "string", format: /^[a-z]{3}$/ } });
// number
(0, index_1.default)({ age: 18 }, { age: { type: "number", float: true } });
(0, index_1.default)({ age: 18 }, { age: { type: "number", max: 17 } });
(0, index_1.default)({ age: 18 }, { age: { type: "number", min: 19 } });
// object
// vaildateType({ p: { age: 18 } }, { p: { type: "object", value: { age: { type: "string" } } } });
// array
// vaildateType([1], "array" as any);
