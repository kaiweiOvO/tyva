import { AllTypeOptions } from "./src/types";
export default function vaildateType<T>(value: T, type: T extends object ? {
    [k in keyof T]: AllTypeOptions;
} : AllTypeOptions): void;
