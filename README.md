# Tyva
✨This package provide a validator function to verify the type of parameters and validate the content of the parameters. An exception message is thrown when the content of the parameter does not meet the limitations.

✨Common scenarios include parameter determination of network requests and request parameter limitations, as shown below 👇.
```typescript
   // get response data from some server
   const person = await request('https://api.???.com/person');

   // variable [person] is type [any]
   try {
     validateType(person as any, {
       name: "string",
       age: {
         type: "number",
         min: 1,
         max: 120,
       },
       gender: {
         type: "string",
         format: /^(male)|(female)$/,
       },
       job: {
         position: "string",
         salary: {
           type: "number",
           float: true,
         },
         tasks: {
           type: "array",
           maxLen: 5,
         },
       },
     });
   } catch (error) {
     // throw an error if validation fails
     throw error;
   }
```

## Useage✈
1. install📦.
   ```shell
   $> npm install tyva
   ```
2. import the function📚.
   ```typescript
   import validateType from 'tyva';
   ```
3. how to use🔧.
   ```typescript
   // simple useage
   validateType("s", "string") // => OK
   validateType(undefined, "number") // => ERROR this will be throw an error.

   // how about numbers?
   validateType(1, { type: "number", max: 1 }) // => OK
   validateType(3.14, { type: "number", float: false }) // => ERROR 3.14 is a float number.

   // validate object
   validateType({ name: "test" }, { name: "string" }) // => OK
   validateType({ name: "test" }, { age: "string" }) // => Error key mismatched.
   
   // validate array
   validateType([1, 2], { type: "array", maxLen: 2 }) // => OK
   validateType([1, "a"], { type: "array", each: "number" }) // => ERROR not all elements are numbers.
   ```
## Support🧩
☎️If you have ideas or suggestions, please push some issues on this [GitHub Repository](http://github.com/kaiweiOvO/tyva). Salute！！