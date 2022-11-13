// 类型别名
type A = string;

// 抽离一组联合类型
type StatusCode = 200 | 301 | 400 | 500 | 502;
type PossibleDataTypes = string | number | (() => unknown);

const status: StatusCode = 502;

// 抽离一个函数类型
type Handler = (e: Event) => void;

const clickHandler: Handler = (e) => { };
const moveHandler: Handler = (e) => { };
const dragHandler: Handler = (e) => { };

// 声明一个对象类型，就像接口那样：
type ObjType = {
  name: string;
  age?: number;
}

const obj: ObjType = {
  name: 'liu',
  age: 18
}

// 工具类型 实现更灵活的类型创建功能。 
type Factory<T> = T | number | string;

const foo: Factory<boolean> = true;
// 我们一般不会直接使用工具类型来做类型标注，而是再度声明一个新的类型别名：
type FactoryWithBool = Factory<boolean>;
const foo2: FactoryWithBool = true;

// 声明一个简单、有实际意义的工具类型：
type MaybeNull<T> = T | null;
function process(input: MaybeNull<{ handler: () => {} }>) {
  input?.handler();
}

// 类似的还有 MaybePromise、MaybeArray。这也是我在日常开发中最常使用的一类工具类型：
type MaybeArray<T> = T | T[];
function ensureArray<T>(input: MaybeArray<T>): T[] {
  return Array.isArray(input) ? input : [input];
}

// 交叉类型 A & B，需要同时满足 A 与 B 两个类型才行
interface NameStruct {
  name: string;
}

interface AgeStruct {
  age: number;
}

type ProfileStruct = NameStruct & AgeStruct;

const profile: ProfileStruct = {
  name: 'liu',
  age: 18
}

// 原始类型使用 交叉的话，不存在 所以是 never
// 这也是 never 这一 BottomType 的实际意义之一，描述根本不存在的类型嘛。
type StrAndNum = string & number; // never


// 对于对象类型的交叉类型，其内部的同名属性类型同样会按照交叉类型进行合并：
type Struct1 = {
  primitiveProp: string;
  objectProp: {
    name: string;
  }
}

type Struct2 = {
  primitiveProp: number;
  objectProp: {
    age: number;
  }
}

type Composed = Struct1 & Struct2;
type PrimitivePropType = Composed['primitiveProp']; // never
type ObjectPropType = Composed['objectProp']; // { name: string; age: number; }

const o1: ObjectPropType = {
  name: 'liu',
  age: 19
}

// 两个联合类型组成的交叉类型 也是同样道理
type UnionIntersection1 = (1 | 2 | 3) & (1 | 2); // 1 | 2
type UnionIntersection2 = (string | number | symbol) & string; // string


// 索引签名类型
interface AllStringTypes {
  [key: string]: string;
}

const fo: AllStringTypes = {
  'liu': "599"
}

// 索引类型查询 keyof
interface Foo {
  liu: 1,
  288: 2
}

type Fookey = keyof Foo; // "liu" | 288

const str1: Fookey = 'liu';
const str2: Fookey = 288;

// type Fookey2 = keyof any;
type Fookey2 = keyof number;
const s1: Fookey2 = 'toString';
// keyof 的产物必定是一个联合类型

// 索引类型访问
interface NumberRecord {
  [key: string]: number;
}

type PropType = NumberRecord[string]; // numbe

interface Foo {
  propA: number;
  propB: boolean;
  propC: string;
}

type PropAType = Foo['propA']; // number
type PropBType = Foo['propB']; // boolean

// 使用keyof获取
type PropTypeUnion = Foo[keyof Foo]; // string | number | boolean

export {

}