export const StringType = "string";
export const NumberType = "number";
export const BooleanType = "boolean";
export const ObjectType = "object";
export const UndefinedType = "undefined";
export const ArrayType = "array";

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

export interface ObjectTypeOption<T> {
  values?: {
    [P in keyof T]?: T[P] extends object ? AllTypeOptions<T[P]> : AllTypeOptions<unknown>;
  };
}

export interface ArrayTypeOption {
  length?: number;
  maxLen?: number;
  minLen?: number;
  each?: AllTypeOptions<unknown>;
}

export type TypeOptions<T> = StringTypeOption &
  NumberTypeOption &
  ObjectTypeOption<T> &
  ArrayTypeOption & {
    type: Type;
  };

export type AllTypeOptions<T> = Type | TypeOptions<T>;

export type ValueType<T> = T extends object
  ? T extends Iterable<any>
    ? AllTypeOptions<T>
    : { [K in keyof T]?: AllTypeOptions<T[K] extends object ? T[K] : unknown> }
  : AllTypeOptions<T>;

export declare function vaildateType<T>(
  value: T,
  type: { [k in keyof T]: AllTypeOptions<T> }
): void;

export declare function vaildateType(value: unknown, type: AllTypeOptions<unknown>): void;
