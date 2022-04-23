"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function vaildateType(value, type) {
    console.log(value, type);
    if (typeof value === "object") {
        // object | array | TypeOptions
        if (type !== "array" && typeof type === "string") {
            // error object value called type string
            console.log("\u001B[31munexpected object type ".concat(type, ". \u001B[0m"));
        }
        else {
            // type.keys
            var keys = Object.keys(type);
            keys.forEach(function (key) {
                var parameter = value[key];
                if (parameter === undefined) {
                    // unmatched parameter
                    console.log("\u001B[31munmatched parameter ".concat(key, ". \u001B[0m"));
                }
                var option = type[key];
                if (typeof option === "object") {
                    checkTypeOption(parameter, option, key);
                }
                else {
                    checkType(parameter, option);
                }
            });
        }
    }
    else {
        // string | number | bool | undefined | TypeOptions
        if (typeof type === "string") {
            // Type
            checkType(value, type);
        }
        else {
            // TypeOptions
            checkTypeOption(value, type);
        }
    }
}
exports.default = vaildateType;
/**
 * check value type
 * @param {any} value
 * @param {Type} type
 */
function checkType(value, type) {
    if (type === "array" && Array.isArray(value) === false) {
        // value === array
        console.log("\u001B[31mexpected type is ".concat(type, ", but received ").concat(typeof value, ". \u001B[0m"));
    }
    else if (typeof value !== type) {
        // value === string | number | bool | undefined
        console.log("\u001B[31mexpected type is ".concat(type, ", but received ").concat(typeof value, ". \u001B[0m"));
    }
}
/**
 * check value type options
 * @param {any} value
 * @param {TypeOptions} option
 */
function checkTypeOption(value, option, key) {
    switch (option.type) {
        case "string":
            // validate string type option
            validateString(value, option.length, option.maxLen, option.minLen, option.format);
            break;
        case "number":
            // validate number type option
            validateNumber(value, option.float, option.max, option.min);
            break;
        case "object":
            // todo check object
            break;
        case "array":
            // validate array type option
            validateArray(value, option.length, option.maxLen, option.minLen, option.eachValue);
            break;
        // other type option
        case "boolean":
        case "undefined":
            if (typeof value !== option.type) {
                console.log("\u001B[31m".concat(key ? key + " " : "", "expected type is ").concat(option.type, ", but received ").concat(typeof value, ". \u001B[0m"));
            }
            break;
        default:
            console.log("\u001B[31m".concat(key ? key + " " : "", "expected type is ").concat(option.type, ", but received ").concat(typeof value, ". \u001B[0m"));
    }
}
function validateString(value, length, maxLen, minLen, format) {
    if (length && value.length !== length) {
        console.log("\u001B[31mexpected length ".concat(length, ", got value length ").concat(value.length, ". \u001B[0m"));
    }
    if (maxLen && value.length > maxLen) {
        console.log("\u001B[31mexpected max length ".concat(maxLen, ", got value length ").concat(value.length, ". \u001B[0m"));
    }
    if (minLen && value.length < minLen) {
        console.log("\u001B[31mexpected min length ".concat(minLen, ", got value length ").concat(value.length, ". \u001B[0m"));
    }
    if (format && format.test(value) === false) {
        console.log("\u001B[31mexpected format ".concat(format, ", got mismatched value ").concat(value, ". \u001B[0m"));
    }
}
function validateNumber(value, float, max, min) {
    if (float && ~~value === value) {
        console.log("\u001B[31mvalue ".concat(value, " is not fload number. \u001B[0m"));
    }
    if (max && value > max) {
        console.log("\u001B[31mvalue ".concat(value, " is bigger than maximum value ").concat(max, ". \u001B[0m"));
    }
    if (min && value < min) {
        console.log("\u001B[31mvalue ".concat(value, " is smaller than minimum value ").concat(min, ". \u001B[0m"));
    }
}
function validateArray(value, length, maxLen, minLen, eachValue) {
    if (length && value.length !== length) {
        console.log("\u001B[31mexpected length ".concat(length, ", got value length ").concat(value.length, ". \u001B[0m"));
    }
    if (maxLen && value.length > maxLen) {
        console.log("\u001B[31mexpected max length ".concat(maxLen, ", got value length ").concat(value.length, ". \u001B[0m"));
    }
    if (minLen && value.length < minLen) {
        console.log("\u001B[31mexpected min length ".concat(minLen, ", got value length ").concat(value.length, ". \u001B[0m"));
    }
    if (eachValue && value.some(function (v) { return v !== eachValue; })) {
        console.log("\u001B[31mexpected array value ".concat(eachValue, ", got mismatched value ").concat(value, ". \u001B[0m"));
    }
}
