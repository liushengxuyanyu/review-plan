const name: string = 'liu';
const age: number = 24;
const male: boolean = false;
const undef: undefined = undefined;
const nul: null = null;
const obj: object = { name, age, male };
const bigintVar1: bigint = 9007199254740991n;
const bigintVar2: bigint = BigInt(9007199254740991);
const symbolVar: symbol = Symbol('unique');

// console.log(symbolVar);

// JavaScript中的void用法
// 能这么做是因为，void 操作符强制将后面的函数声明转化为了表达式，因此整体其实相当于：void((function iife(){})())。
void function iife() {
  console.log("Invoked!");
}();

// ts中的void代表
// 这里的 void 用于描述一个内部没有 return 语句，或者没有显式 return 一个值的函数的返回值
function func1() {}
function func2() {
  return;
}
// function func3() {
//   return undefined;
// }
// 返回值虽然都是undefined，但在类型推导的过程中不一样
// console.log(func1(), func2(), func3());

const voidVar1: void = undefined;

// const voidVar2: void = null; // 需要关闭 strictNullChecks


// 防止 “无法重新生命块范围变量” 错误
// 解决方案
// 之所以 tslint 会提示这个错误，是因为在 Commonjs 规范里，没有像 ESModule 能形成闭包的「模块」概念，所有的模块在引用时都默认被抛至全局，因此当再次声明某个模块时，TypeScript 会认为重复声明了两次相同的变量进而抛错。
// 对于这个问题，最简单的解决方法是在报错的文件底部添加一行代码：export {}。这行代码会「欺骗」tslint 使其认为当前文件是一个 ESModule 模块，因此不存在变量重复声明的可能性。当使用这个方法时，记得这样配置你的 tsconfig.json 文件：
export {

}