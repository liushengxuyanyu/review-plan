// any
let foo;

// foo、bar 均为 any
// function func(foo, bar){}

// 被标记为 any 类型的变量可以拥有任意类型的值
let anyVar: any = "linbudu";

anyVar = false;
anyVar = "linbudu";
anyVar = {
  site: "juejin"
};

anyVar = () => { }

// 标记为具体类型的变量也可以接受任何 any 类型的值
const val1: string = anyVar;
const val2: number = anyVar;
const val3: () => {} = anyVar;
const val4: {} = anyVar;

// 无法进行 类型推导 与 检查
let anyVar1: any = null;

// anyVar1.foo.bar.baz();
// anyVar1[0][1][2].prop1;


// 可以被任何类型赋值，但只能赋值于any和unknown
let unknownVar: unknown = "linbudu";

unknownVar = false;
unknownVar = "linbudu";
unknownVar = {
  site: "juejin"
};

unknownVar = () => { }

// const val1: string = unknownVar; // Error
// const val2: number = unknownVar; // Error
// const val3: () => {} = unknownVar; // Error
// const val4: {} = unknownVar; // Error

const val5: any = unknownVar;
const val6: unknown = unknownVar;

// 虚无的 never 类型
type UnionWithNever = "linbudu" | 599 | true | void | never;

// function justThrow(): never {
//   throw new Error()
// }

function justThrow(): never {
  throw new Error()
}

function foo1 (input:number){
  if(input > 1){
    justThrow();
    // 等同于 return 语句后的代码，即 Dead Code
    const name = "linbudu";
  }
}

// foo1(2);

// 类型断言 它的基本语法是 as NewType
// let unknownVar1: unknown;

// (unknownVar1 as { foo: () => {} }).foo();

// const str: string = "linbudu";

// (str as any).func().foo().prop;


// interface IFoo {
//   name: string;
// }

// declare const obj: {
//   foo: IFoo
// }

// const {foo = {} as IFoo} = obj

// 非空断言 !
declare const foo3: {
  func?: () => ({
    prop?: number | null;
  })
};

foo3.func().prop.toFixed();

foo3.func!().prop!.toFixed();
foo3.func?.().prop?.toFixed();

export {

}