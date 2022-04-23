import { AllTypeOptions, Type, TypeOptions } from "./types";

export default function vaildateType<T>(
  value: T,
  type: T extends object ? { [k in keyof T]: AllTypeOptions } : AllTypeOptions
): void {
  console.log(value, type);
  if (typeof value === "object") {
    // object | array | TypeOptions
    if (type !== "array" && typeof type === "string") {
      // error object value called type string
      console.log(`\x1B[31munexpected object type ${type}. \x1B[0m`);
    } else {
      // type.keys
      const keys = Object.keys(type as { [k in keyof T]: AllTypeOptions });

      keys.forEach(key => {
        const parameter = (value as any)[key];

        if (parameter === undefined) {
          // unmatched parameter
          console.log(`\x1B[31munmatched parameter ${key}. \x1B[0m`);
        }
        const option = (type as { [k: string]: TypeOptions })[key];

        if (typeof option === "object") {
          checkTypeOption(parameter, option, key);
        } else {
          checkType(parameter, option);
        }
      });
    }
  } else {
    // string | number | bool | undefined | TypeOptions
    if (typeof type === "string") {
      // Type
      checkType(value, type);
    } else {
      // TypeOptions
      checkTypeOption(value, type as TypeOptions);
    }
  }
}

/**
 * check value type
 * @param {any} value
 * @param {Type} type
 */
function checkType(value: unknown, type: Type) {
  if (type === "array" && Array.isArray(value) === false) {
    // value === array
    console.log(`\x1B[31mexpected type is ${type}, but received ${typeof value}. \x1B[0m`);
  } else if (typeof value !== type) {
    // value === string | number | bool | undefined
    console.log(`\x1B[31mexpected type is ${type}, but received ${typeof value}. \x1B[0m`);
  }
}

/**
 * check value type options
 * @param {any} value
 * @param {TypeOptions} option
 */
function checkTypeOption(value: any, option: TypeOptions, key?: string) {
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
        console.log(
          `\x1B[31m${key ? key + " " : ""}expected type is ${
            option.type
          }, but received ${typeof value}. \x1B[0m`
        );
      }
      break;
    default:
      console.log(
        `\x1B[31m${key ? key + " " : ""}expected type is ${
          option.type
        }, but received ${typeof value}. \x1B[0m`
      );
  }
}

function validateString(
  value: string,
  length?: number,
  maxLen?: number,
  minLen?: number,
  format?: RegExp
) {
  if (length && value.length !== length) {
    console.log(`\x1B[31mexpected length ${length}, got value length ${value.length}. \x1B[0m`);
  }
  if (maxLen && value.length > maxLen) {
    console.log(`\x1B[31mexpected max length ${maxLen}, got value length ${value.length}. \x1B[0m`);
  }
  if (minLen && value.length < minLen) {
    console.log(`\x1B[31mexpected min length ${minLen}, got value length ${value.length}. \x1B[0m`);
  }
  if (format && format.test(value) === false) {
    console.log(`\x1B[31mexpected format ${format}, got mismatched value ${value}. \x1B[0m`);
  }
}

function validateNumber(value: number, float?: boolean, max?: number, min?: number) {
  if (float && ~~value === value) {
    console.log(`\x1B[31mvalue ${value} is not fload number. \x1B[0m`);
  }
  if (max && value > max) {
    console.log(`\x1B[31mvalue ${value} is bigger than maximum value ${max}. \x1B[0m`);
  }
  if (min && value < min) {
    console.log(`\x1B[31mvalue ${value} is smaller than minimum value ${min}. \x1B[0m`);
  }
}

function validateArray(
  value: unknown[],
  length?: number,
  maxLen?: number,
  minLen?: number,
  eachValue?: TypeOptions
) {
  if (length && value.length !== length) {
    console.log(`\x1B[31mexpected length ${length}, got value length ${value.length}. \x1B[0m`);
  }
  if (maxLen && value.length > maxLen) {
    console.log(`\x1B[31mexpected max length ${maxLen}, got value length ${value.length}. \x1B[0m`);
  }
  if (minLen && value.length < minLen) {
    console.log(`\x1B[31mexpected min length ${minLen}, got value length ${value.length}. \x1B[0m`);
  }
  if (eachValue && value.some(v => v !== eachValue)) {
    console.log(
      `\x1B[31mexpected array value ${eachValue}, got mismatched value ${value}. \x1B[0m`
    );
  }
}
