interface IRes {
  code: number,
  status: string,
  data: any
}

const obj1: IRes = {
  code: 200,
  status: 'aaa',
  data: []
}

console.log('obj1: ', obj1);

// 联合类型加上字面量类型
interface Res {
  code: 10001 | 10002 | 10003,
  status: 'success' | 'failure',
  data: any
}

const obj2: Res = {
  code: 10002,
  status: 'success',
  data: []
}

console.log('obj2: ', obj2)

// 联合类型 它代表了一组类型的可用集合
interface Tmp {
  mixed?: true | string | 599 | object | (() => {}) | (1 | 2),
  age: object,
  user:
    {
        vip: true;
        expires: string;
      }
    | {
        vip: false;
        promotion: string;
      };
}

const obj3: Tmp = {
  mixed: 2,
  age: [],
  user: {
    vip: false,
    promotion: 'liu'
  }
}

// type是类型别名
type Code = 10000 | 10001 | 10002
type Status = "success" | "failure";

interface Res2 {
  code: Code,
  data: object
}

// declare var res2: Res2;
// console.log(res2)
// if (res2.code === 10001) {
//   console.log('10001')
// }

// 需要注意的是，无论是原始类型还是对象类型的字面量类型，它们的本质都是类型而不是值。
// 它们在编译时同样会被擦除，同时也是被存储在内存中的类型空间而非值空间。

// 枚举

// 之前JS写法
// export default {
//   Home_Page_Url: "url1",
//   Setting_Page_Url: "url2",
//   Share_Page_Url: "url3",
// }

// 或是这样：
// export const PageUrl = {
//   Home_Page_Url: "url1",
//   Setting_Page_Url: "url2",
//   Share_Page_Url: "url3",
// }

// 枚举写法
enum PageUrl {
  Home_Page_Url = "url1",
  Setting_Page_Url = "url2",
  Share_Page_Url = "url3",
}

console.log(PageUrl.Home_Page_Url)


enum Items {
  Foo, // 0
  Bar, // 1
  Baz // 2
}

console.log(Items)

enum Items2 {
  // 0 
  Foo,
  Bar = 599,
  // 600
  Baz
}

console.log(Items2)

// 延迟枚举 必须放在第一位
const returnNum = () => 100 + 499;

enum Items3 {
  Foo = returnNum(),
  Bar = 599,
  Baz
}

console.log(Items3)

// 对象是单向映射的。只能从键映射到值。
// 枚举是双向映射的（只有数字枚举才可以）

console.log(Items3.Baz, Items3[599])

// 常量枚举 你只能通过枚举成员访问枚举值（而不能通过值访问成员）。
const enum Items4 {
  Foo,
  Bar,
  Baz
}

const fooValue = Items.Foo; // 0