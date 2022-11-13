// 数组 在 TypeScript 中有两种方式来声明一个数组类型：
const arr1: string[] = [];
const arr2: Array<string> = [];
const arr3: string[] = ['lin', 'bu', 'du'];

// 在TypeScript中 数组是定长的。 不会报错
console.log(arr3[599]);

// 元祖（Tuple）
const arr4: [string, string, string] = ['lin', 'bu', 'du'];

// console.log(arr4[599]);
// 用类型强绑定元祖
const arr5: [string, number, boolean] = ['linbudu', 599, true];

// 支持可选
const arr6: [string, number?, boolean?] = ['liu'];

// 具名元祖
const arr7: [name: string, age: number, male?: boolean] = ['liu', 18, true];
console.log('arr7: ', arr7);

// 实际上除了显式地越界访问，还可能存在隐式地越界访问，如通过解构赋值的形式
// 对于数组 仍然无法检查出是否存在隐式访问，因为类型层面并不知道它到底有多少个元素。
const [ele1, ele2, ...rest] = arr1;

// 但对于元组，隐式的越界访问也能够被揪出来给一个警告：
// 长度为 "3" 的元组类型 "[string, number, boolean]" 在索引 "3" 处没有元素。
// const [name1, age2, male3, other] = arr5;

// 首先我们使用 interface 声明一个结构，然后使用这个结构来作为一个对象的类型标注即可
// ? 可选，readonly 只读
interface IDescription {
  readonly name: string,
  age: number,
  readonly male?: boolean,
  func?: Function
}

const obj1: IDescription = {
  name: 'liu',
  age: 18,
  male: true
}

// 无法分配到 “male”， 因为它是只读属性。
// obj1.male = false;
obj1.func = () => {};

// 数组和元组 也有只读属性，只不过是将整个数组或者元祖进行 只读。
const arr8: readonly string[] = ['bb', 'aa'];
// 不能push、 pop等改变数组的方法
// arr8.push()

// Object object {} 

// 对于 undefined、null、void 0 ，需要关闭 strictNullChecks

// Object, Boolean, String, Number, Symbol 这几个装箱类型
const tmp1: Object = undefined;
const tmp2: Object = null;
const tmp3: Object = void 0;

const tmp4: Object = 'linbudu';
const tmp5: Object = 599;
const tmp6: Object = { name: 'linbudu' };
const tmp7: Object = () => {};
const tmp8: Object = [];

// 在任何情况下，你都不应该使用这些装箱类型。
// object 的引入就是为了解决对 Object 类型的错误使用，它代表所有非原始类型的类型，即数组、对象与函数类型这些：

const tmp17: object = undefined;
const tmp18: object = null;
const tmp19: object = void 0;

// const tmp20: object = 'linbudu';  // X 不成立，值为原始类型
// const tmp21: object = 599; // X 不成立，值为原始类型

const tmp22: object = { name: 'linbudu' };
const tmp23: object = () => {};
const tmp24: object = [];

export {

}