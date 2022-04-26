"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function vaildateType(value, type, key) {
    if (typeof value === 'object' && Array.isArray(value) === false) {
        // value type is object
        // object | array | TypeOptions
        if (typeof type === 'string') {
            // error object value called type string
            checkType(value, type, key);
        }
        else {
            // type.keys
            var keys = Object.keys(type);
            keys.forEach(function (k) {
                var parameter = value[k];
                var option = type[k];
                if (typeof option === 'object') {
                    checkTypeOption(parameter, option, k);
                }
                else {
                    checkType(parameter, option, k);
                }
            });
        }
    }
    else {
        // value type is Type
        // string | number | bool | undefined | TypeOptions
        if (typeof type === 'string') {
            // Type
            checkType(value, type, key);
        }
        else {
            // TypeOptions
            checkTypeOption(value, type, key);
        }
    }
}
exports.default = vaildateType;
/**
* check value type
* @param {any} value
* @param {Type} type
*/
function checkType(value, type, key) {
    if (type === 'array' && Array.isArray(value) === false) {
        // value === array
        throw new Error("".concat(key ? "parameter ".concat(key, " ") : '', "expected type is ").concat(type, ", but received ").concat(typeof value, "."));
    }
    else if (Array.isArray(value) === true && type !== 'array') {
        // value === string | number | bool | object | undefined
        throw new Error("".concat(key ? "parameter ".concat(key, " ") : '', "expected type is ").concat(type, ", but received array."));
        // eslint-disable-next-line valid-typeof
    }
    else if (Array.isArray(value) === false && typeof value !== type) {
        // value === string | number | bool | object | undefined
        throw new Error("".concat(key ? "parameter ".concat(key, " ") : '', "expected type is ").concat(type, ", but received ").concat(typeof value, "."));
    }
}
/**
* check value type options
* @param {any} value
* @param {TypeOptions} option
*/
function checkTypeOption(value, option, key) {
    switch (option.type) {
        case 'string':
            // validate string type option
            validateString(value, option.length, option.maxLen, option.minLen, option.format, key);
            break;
        case 'number':
            // validate number type option
            validateNumber(value, option.float, option.max, option.min, key);
            break;
        case 'object':
            // todo check object
            if (option.values) {
                var keys = Object.keys(option.values);
                keys.forEach(function (k) {
                    var parameter = value[k];
                    var op = option.values[k];
                    if (typeof op === 'object') {
                        checkTypeOption(parameter, op, k);
                    }
                    else {
                        checkType(parameter, op, k);
                    }
                });
            }
            else {
                checkType(value, 'object', key);
            }
            break;
        case 'array':
            // validate array type option
            validateArray(value, option.length, option.maxLen, option.minLen, option.each, key);
            break;
        // other type option
        case 'boolean':
            checkType(value, 'boolean', key);
            break;
        case 'undefined':
            // eslint-disable-next-line valid-typeof
            if (typeof value !== option.type) {
                throw new Error("".concat(key ? "parameter ".concat(key, " ") : '', "expected type is ").concat(option.type, ", but received ").concat(typeof value, "."));
            }
            break;
        default:
            throw new Error("".concat(key ? "parameter ".concat(key, " ") : '', "expected type is ").concat(option.type, ", but received ").concat(typeof value, "."));
    }
}
function validateString(value, length, maxLen, minLen, format, key) {
    checkType(value, 'string', key);
    if (length !== undefined && value.length !== length) {
        throw new Error("".concat(key ? "parameter ".concat(key, " ") : '', "expected length ").concat(length, ", got value length ").concat(value.length, "."));
    }
    if (maxLen !== undefined && value.length > maxLen) {
        throw new Error("".concat(key ? "parameter ".concat(key, " ") : '', "expected maximum length ").concat(maxLen, ", got value length ").concat(value.length, "."));
    }
    if (minLen !== undefined && value.length < minLen) {
        throw new Error("".concat(key ? "parameter ".concat(key, " ") : '', "expected minimum length ").concat(minLen, ", got value length ").concat(value.length, "."));
    }
    if (format !== undefined && format.test(value) === false) {
        throw new Error("".concat(key ? "parameter ".concat(key, " ") : '', "expected format ").concat(format, ", got mismatched value ").concat(value, "."));
    }
}
function validateNumber(value, float, max, min, key) {
    checkType(value, 'number', key);
    if (float === true && value % 1 === 0) {
        throw new Error("".concat(key ? "parameter ".concat(key, " ") : '', "value ").concat(value, " is not fload number."));
    }
    if (max !== undefined && value > max) {
        throw new Error("".concat(key ? "parameter ".concat(key, " ") : '', "value ").concat(value, " is bigger than maximum value ").concat(max, "."));
    }
    if (min !== undefined && value < min) {
        throw new Error("".concat(key ? "parameter ".concat(key, " ") : '', "value ").concat(value, " is smaller than minimum value ").concat(min, "."));
    }
}
function validateArray(value, length, maxLen, minLen, each, key) {
    checkType(value, 'array', key);
    if (length !== undefined && value.length !== length) {
        throw new Error("".concat(key ? "parameter ".concat(key, " ") : '', "expected length ").concat(length, ", got value length ").concat(value.length, "."));
    }
    if (maxLen !== undefined && value.length > maxLen) {
        throw new Error("".concat(key ? "parameter ".concat(key, " ") : '', "expected maximum length ").concat(maxLen, ", got value length ").concat(value.length, "."));
    }
    if (minLen !== undefined && value.length < minLen) {
        throw new Error("".concat(key ? "parameter ".concat(key, " ") : '', "expected minimum length ").concat(minLen, ", got value length ").concat(value.length, "."));
    }
    if (each !== undefined) {
        value.forEach(function (v) {
            if (typeof each === 'string') {
                checkType(v, each, key);
            }
            else {
                vaildateType(v, each, key);
            }
        });
    }
}
