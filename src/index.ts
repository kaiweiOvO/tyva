import { AllTypeOptions, Type, TypeOptions, ValueType } from "./types";

export default function vaildateType<T>(value: T, type: ValueType<T>, key?: string): void {
  if (typeof value === 'object' && Array.isArray(value) === false) {
      // value type is object
      // object | array | TypeOptions
      if (typeof type === 'string') {
          // error object value called type string
          checkType(value, type, key);
      } else {
          // type.keys
          const keys = Object.keys(type as { [k in keyof T]: AllTypeOptions<T> });

          keys.forEach((k) => {
              const parameter = (value as any)[k];

              const option = (type as { [k: string]: TypeOptions<typeof parameter> })[k];

              if (typeof option === 'object') {
                  checkTypeOption(parameter, option, k);
              } else {
                  checkType(parameter, option, k);
              }
          });
      }
  } else {
      // value type is Type
      // string | number | bool | undefined | TypeOptions
      if (typeof type === 'string') {
          // Type
          checkType(value, type, key);
      } else {
          // TypeOptions
          checkTypeOption(value, type as TypeOptions<typeof value>, key);
      }
  }
}

/**
* check value type
* @param {any} value
* @param {Type} type
*/
function checkType(value: unknown, type: Type, key?: string) {
  if (type === 'array' && Array.isArray(value) === false) {
      // value === array
      throw new Error(`${key ? `parameter ${key} ` : ''}expected type is ${type}, but received ${typeof value}.`);
  } else if (Array.isArray(value) === true && type !== 'array') {
      // value === string | number | bool | object | undefined
      throw new Error(`${key ? `parameter ${key} ` : ''}expected type is ${type}, but received array.`);
      // eslint-disable-next-line valid-typeof
  } else if (Array.isArray(value) === false && typeof value !== type) {
      // value === string | number | bool | object | undefined
      throw new Error(`${key ? `parameter ${key} ` : ''}expected type is ${type}, but received ${typeof value}.`);
  }
}

/**
* check value type options
* @param {any} value
* @param {TypeOptions} option
*/
function checkTypeOption(value: any, option: TypeOptions<any>, key?: string) {
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
              const keys = Object.keys(option.values);
              keys.forEach((k) => {
                  const parameter = (value as any)[k];

                  const op = (option.values as { [k: string]: TypeOptions<typeof option.values> })[k];

                  if (typeof op === 'object') {
                      checkTypeOption(parameter, op, k);
                  } else {
                      checkType(parameter, op, k);
                  }
              });
          } else {
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
              throw new Error(
                  `${key ? `parameter ${key} ` : ''}expected type is ${option.type}, but received ${typeof value}.`
              );
          }
          break;
      default:
          throw new Error(
              `${key ? `parameter ${key} ` : ''}expected type is ${option.type}, but received ${typeof value}.`
          );
  }
}

function validateString(
  value: string,
  length?: number,
  maxLen?: number,
  minLen?: number,
  format?: RegExp,
  key?: string
) {
  checkType(value, 'string', key);
  if (length !== undefined && value.length !== length) {
      throw new Error(
          `${key ? `parameter ${key} ` : ''}expected length ${length}, got value length ${value.length}.`
      );
  }
  if (maxLen !== undefined && value.length > maxLen) {
      throw new Error(
          `${key ? `parameter ${key} ` : ''}expected maximum length ${maxLen}, got value length ${value.length}.`
      );
  }
  if (minLen !== undefined && value.length < minLen) {
      throw new Error(
          `${key ? `parameter ${key} ` : ''}expected minimum length ${minLen}, got value length ${value.length}.`
      );
  }
  if (format !== undefined && format.test(value) === false) {
      throw new Error(`${key ? `parameter ${key} ` : ''}expected format ${format}, got mismatched value ${value}.`);
  }
}

function validateNumber(value: number, float?: boolean, max?: number, min?: number, key?: string) {
  checkType(value, 'number', key);
  if (float === true && value % 1 === 0) {
      throw new Error(`${key ? `parameter ${key} ` : ''}value ${value} is not fload number.`);
  }
  if (max !== undefined && value > max) {
      throw new Error(`${key ? `parameter ${key} ` : ''}value ${value} is bigger than maximum value ${max}.`);
  }
  if (min !== undefined && value < min) {
      throw new Error(`${key ? `parameter ${key} ` : ''}value ${value} is smaller than minimum value ${min}.`);
  }
}

function validateArray(
  value: unknown[],
  length?: number,
  maxLen?: number,
  minLen?: number,
  each?: AllTypeOptions<unknown>,
  key?: string
) {
  checkType(value, 'array', key);
  if (length !== undefined && value.length !== length) {
      throw new Error(
          `${key ? `parameter ${key} ` : ''}expected length ${length}, got value length ${value.length}.`
      );
  }
  if (maxLen !== undefined && value.length > maxLen) {
      throw new Error(
          `${key ? `parameter ${key} ` : ''}expected maximum length ${maxLen}, got value length ${value.length}.`
      );
  }
  if (minLen !== undefined && value.length < minLen) {
      throw new Error(
          `${key ? `parameter ${key} ` : ''}expected minimum length ${minLen}, got value length ${value.length}.`
      );
  }
  if (each !== undefined) {
      value.forEach((v) => {
          if (typeof each === 'string') {
              checkType(v, each, key);
          } else {
              vaildateType(v, each, key);
          }
      });
  }
}
