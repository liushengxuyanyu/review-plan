/**
 * 给某个对象实现迭代器接口
 */
let obj = {
  name: 'liu',
  age: 18
}
// 可以挂在原型上，也可以挂在自己身上
obj.__proto__[Symbol.iterator] = function () {
  let _this = this
  let keys = Reflect.ownKeys(this)
  let idx = 0
  return {
    // next方法必须部署
    next() {
      return idx < keys.length 
              ? { value: _this[keys[idx++]], done: false } 
              : { value: undefined, done: true }
    },
    // return方法是可选的，用于循环break或者抛出异常时候用
    // 经测试不加也可以支持break
    return() {
      return { done: true }
    }
  }
}

// 使用Gernerator会更方便
// obj.__proto__[Symbol.iterator] = function* () {
//   let props = Reflect.ownKeys(this)
//   for (let prop of props) {
//     yield [prop, this[prop]]
//   }
// }

let objIt = obj[Symbol.iterator]()
objIt.next() // { value: "liu", done: false }
objIt.next() // { value: 18, done: false }
objIt.next() // { value: undefined, done: true }
for (let item of obj) {
  console.log(item, '--for of---')
}

/**
 * 实现一个迭代器函数
 */
 var it = makeIterator(['a', 'b']);

 it.next() // { value: "a", done: false }
 it.next() // { value: "b", done: false }
 it.next() // { value: undefined, done: true }
 
 function makeIterator(array) {
   var nextIndex = 0;
   return {
     next: function() {
       return nextIndex < array.length ?
         {value: array[nextIndex++], done: false} :
         {value: undefined, done: true};
     }
   };
 }
 
