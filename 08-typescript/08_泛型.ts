// 泛型在 类型别名 中的使用
type Foctory<T> = T | number | string;

// 伪代码 相当于一个函数，T是一个变量
// function Factory(typeArg){
//   return [typeArg, number, string]
// }

// Stringify 会将一个对象类型的所有属性类型置为 string ，
//而 Clone 则会进行类型的完全复制。
type Stringify<T> = {
  [K in keyof T]: string;
};

type Clone<T> = {
  [K in keyof T]: T[K];
};

// 我们可以提前看一个 TypeScript 的内置工具类型实现：
type Partial<T> = {
  [P in keyof T]?: T[P];
};

interface IFoo {
  prop1: string;
  prop2: number;
  prop3: boolean;
  prop4: () => void;
}

type PartialIFoo = Partial<IFoo>;

// 等价于
// interface PartialIFoo {
//   prop1?: string;
//   prop2?: number;
//   prop3?: boolean;
//   prop4?: () => void;
// }

const obj: PartialIFoo = {
  prop1: 'liu'
}

// 条件类型
type IsEqual<T> = T extends true ? 1 : 2;

type A = IsEqual<true>; // 1
type B = IsEqual<false>; // 2
type C = IsEqual<'linbudu'>; // 2

// 泛型约束与默认值
// 像函数可以声明一个参数的默认值一样，泛型同样有着默认值的设定
type Factory<T = boolean> = T | number | string;

const foo: Factory = false;

type ResStatus<ResCode extends number> = ResCode extends 10000 | 10001 | 10002
  ? 'success'
  : 'failure';


type Res1 = ResStatus<10000>; // "success"
type Res2 = ResStatus<20000>; // "failure"

// type Res3 = ResStatus<'10000'>; // 类型“string”不满足约束“number”。

// 带默认值
type ResStatus2<ResCode extends number = 10000> = ResCode extends 10000 | 10001 | 10002
  ? 'success'
  : 'failure';

type Res4 = ResStatus2; // "success"

// 多泛型关联
type Conditional<Type, Condition, TruthyResult, FalsyResult> =
  Type extends Condition ? TruthyResult : FalsyResult;

//  "passed!"
type Result1 = Conditional<'linbudu', string, 'passed!', 'rejected!'>;

// "rejected!"
type Result2 = Conditional<'linbudu', boolean, 'passed!', 'rejected!'>;

// 对象中的泛型
interface IRes<TData = unknown> {
  code: number;
  error?: string;
  data: TData;
}

interface IUserProfileRes {
  name: string;
  homepage: string;
  avatar: string;
}

// 嵌套使用
function fetchUserProfile(): Promise<IRes<IUserProfileRes>> {
  return Promise.resolve({
    code: 10001,
    data: {
      name: 'liu',
      homepage: 'xu',
      avatar: '11'
    }
  })
}
// function handleOperation(): Promise<IRes<StatusSucceed>> {}

// 分页结构的数据
interface IPaginationRes<TItem = unknown> {
  data: TItem[];
  page: number;
  totalCount: number;
  hasNextPage: boolean;
}

// function fetchUserProfileList(): Promise<IRes<IPaginationRes<IUserProfileRes>>> {}

function handle<T>(input: T): T {return input}

const author = "linbudu"; // 使用 const 声明，被推导为 "linbudu"

let authorAge = 18; // 使用 let 声明，被推导为 number

handle(author); // 填充为字面量类型 "linbudu"
handle(authorAge); // 填充为基础类型 number

function swap<T, U>([start, end]: [T, U]): [U, T] {
  return [end, start];
}

const swapped1 = swap(["linbudu", 599]);
const swapped2 = swap([null, 599]);
const swapped3 = swap([{ name: "linbudu" }, {}]);

console.log('swapped1: ', swapped1)

// 不在处理 对象类型了
// function handle<T extends string | number>(input: T): T {}

// 处理 数字 元组的情况

// function swap<T extends number, U extends number>([start, end]: [T, U]): [U, T] {
//   return [end, start];
// }

// function pick<T extends object, U extends keyof T>(object: T, ...props: Array<U>): Pick<T, U> {
//   return
// }

function handle2<T>(payload: T): Promise<[T]> {
  return new Promise<[T]>((res, rej) => {
    res([payload]);
  });
}

// const handle3 = <T extends any>(input: T): T => {}


export {

}