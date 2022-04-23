import vaildateType from "./src/index";

vaildateType(1, "boolean");
vaildateType("kw", "boolean");
// vaildateType([1], "array");
vaildateType(true, "number");
vaildateType(undefined, "number");

// string
vaildateType({ name: "kw" }, { name: "number" });
vaildateType({ name: "kw" }, { name: { type: "string", length: 1 } });
vaildateType({ name: "kw" }, { name: { type: "string", maxLen: 1 } });
vaildateType({ name: "kw" }, { name: { type: "string", format: /^[a-z]{3}$/ } });

// number
vaildateType({ age: 18 }, { age: { type: "number", float: true } });
vaildateType({ age: 18 }, { age: { type: "number", max: 17 } });
vaildateType({ age: 18 }, { age: { type: "number", min: 19 } });

// object
// vaildateType({ p: { age: 18 } }, { p: { type: "object", value: { age: { type: "string" } } } });

// array
// vaildateType([1], "array" as any);
