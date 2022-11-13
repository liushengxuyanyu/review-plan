// 函数声明
function foo(name: string): number {
  return name.length;
}

console.log(foo('liu'));

// 函数表达式
const foo2 = function(name: string): number {
  return name.length;
}

// 函数类型签名 (不推荐这样使用。可读性很差)
const foo3: (name: string) => number = function(name: string): number {
  return name.length;
}

// 如果使用函数类型签名，可以使用类型别名进行抽离
type FuncFoo = (name: string) => number;

const foo4: FuncFoo = function(name: string): number {
  return name.length;
}

// void类型
// 在TS中。一个函数没有返回值，类型会被标记为void。虽然实际的值是undefined
function foo5():void {}
console.log('foo5: ', foo5())

// 调用了 return 语句，但没有返回值
function bar(): void {
  return;
}
console.log('bar: ', bar())

// 可选参数和reset参数 (可选参数必须位于必选参数之后)
function foo6(name: string, age?: number):number {
  const inputAge = age || 18;
  return name.length + inputAge;
}

// 也可以使用默认值参数。（就不能用可选了。以为有默认值 就代表可选）
function foo7(name: string, age: number = 18): number {
  const inputAge = age;
  return name.length + inputAge;
}

// rest 可以使用数组类型进行标注
function foo8(name: string, ...rest: any[]):number {
  return name.length + rest.length;
}

console.log('foo8: ', foo8('liu', 2, 'ac'));
// 也可以使用元组
function foo9(name: string, ...rest: [number, string]):number {
  return name.length + rest[0] + rest[1].length;
}

console.log('foo9: ', foo9('liu', 18, 'xu'));

// 函数重载（伪重载）
// 它只有一个具体实现，其重载体现在方法调用的签名上而非具体实现上。
function func(foo: number, bar: true): string;
function func(foo: number, bar?: false): number;
function func(foo: number, bar?: boolean): string | number {
  if (bar) {
    return String(foo);
  } else {
    return foo * 599;
  }
}

const res1 = func(599); // number
const res2 = func(599, true); // string
const res3 = func(599, false); // number
console.log(res1, res2, res3);

class Foo {
  prop: string;

  constructor(inputProp: string) {
    this.prop = inputProp;
  }

  print(addion: string) {
    console.log(`${this.prop} and ${addion}`);
  }

  get():string {
    return this.prop;
  }

  set(prop: string) {
    this.prop = prop;
  }
}

// 修饰符 public / private / protected / readonly。
/**
 * 
 * public：此类成员在类、类的实例、子类中都能被访问。
private：此类成员仅能在类的内部被访问。
protected：此类成员仅能在类与子类中被访问，你可以将类和类的实例当成两种概念，
即一旦实例化完毕（出厂零件），那就和类（工厂）没关系了，即不允许再访问受保护的成员。
 */

class Foo2 {
  // 此时，参数会被直接作为类的成员（即实例的属性），免去后续的手动赋值。
  constructor(public arg1: string, private arg2: boolean) { }
}

const f2 = new Foo2("linbudu", true);
console.log(f2.arg1);

// 继承
class Base {
  printWithLove() { }
}

class Derived extends Base {
  // 此成员不能有 “override”修饰符，因为它未在基类“Base”中声明。
  // override print() {
  //   // ...
  // }
}

// 抽象类
abstract class AbsFoo {
  abstract absProp: string;
  abstract get absGetter(): string;
  abstract absMethod(name: string): string
}

// 实现抽象类
class FooA implements AbsFoo {
  absProp: string = "linbudu"

  get absGetter() {
    return "linbudu"
  }

  absMethod(name: string) {
    return name
  }
}

// 接口
interface FooStruct {
  absProp: string;
  get absGetter(): string;
  absMethod(input: string): string
}
// 类也可以实现一个接口
class FooB implements FooStruct {
  absProp: string = "linbudu"

  get absGetter() {
    return "linbudu"
  }

  absMethod(name: string) {
    return name
  }
}


// SOLID 原则