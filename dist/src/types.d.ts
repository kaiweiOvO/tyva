export declare const StringType = "string";
export declare const NumberType = "number";
export declare const BooleanType = "boolean";
export declare const ObjectType = "object";
export declare const UndefinedType = "undefined";
export declare const ArrayType = "array";
export declare type Type = "string" | "number" | "boolean" | "object" | "undefined" | "array";
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
    value?: {
        [k: string]: TypeOptions;
    };
}
export interface ArrayTypeOption {
    length?: number;
    maxLen?: number;
    minLen?: number;
    eachValue?: TypeOptions;
}
export declare type TypeOptions = StringTypeOption & NumberTypeOption & ObjectTypeOption & ArrayTypeOption & {
    type: Type;
};
export declare type AllTypeOptions = Type | TypeOptions;
export declare function vaildateType<T>(value: T, type: {
    [k in keyof T]: AllTypeOptions;
}): void;
export declare function vaildateType(value: unknown, type: AllTypeOptions): void;
