type Linbudu = 'linbudu';
const str = "linbudu";

const obj = { name: "linbudu" };

const nullVar = null;
const undefinedVar = undefined;

const func = (input: string) => {
  return input.length > 10;
}

type Str = typeof str; // "linbudu"
type Obj = typeof obj; // { name: string; }
type Null = typeof nullVar; // null
type Undefined = typeof undefined; // undefined
type Func = typeof func; // (input: string) => boolean

const s2: Str = 'linbudu';
const s3: Linbudu = 'linbudu';

// const func = (input: string) => {
//   return input.length > 10;
// }

const func2: typeof func = (name: string) => {
  return name === 'linbudu'
}

// boolean
type FuncReturnType = ReturnType<typeof func>;

const isInputValid = (input: string) => {
  return input.length > 10;
}

// 不允许表达式
// let isValid: typeof isInputValid("linbudu");

export {

}