export const StringType = "string";
export const NumberType = "number";
export const BooleanType = "boolean";
export const ObjectType = "object";
export const UndefinedType = "undefined";
export const ArrayType = "array";

// export type Type = StringType | NumberType | BooleanType | ObjectType | UndefinedType | ArrayType;
export type Type = "string" | "number" | "boolean" | "object" | "undefined" | "array";

export interface StringTypeOption {
  length?: number;
  maxLen?: number;
  minLen?: number;
  format?: RegExp;
}

export interface NumberTypeOption {
  float?: boolean;
  max?: number;
  min?: number;
}

export interface ObjectTypeOption {
  value?: { [k: string]: TypeOptions };
}

export interface ArrayTypeOption {
  length?: number;
  maxLen?: number;
  minLen?: number;
  eachValue?: TypeOptions;
}

export type TypeOptions = StringTypeOption &
  NumberTypeOption &
  ObjectTypeOption &
  ArrayTypeOption & {
    type: Type;
  };

export type AllTypeOptions = Type | TypeOptions;

export declare function vaildateType<T>(value: T, type: { [k in keyof T]: AllTypeOptions }): void;

export declare function vaildateType(value: unknown, type: AllTypeOptions): void;
