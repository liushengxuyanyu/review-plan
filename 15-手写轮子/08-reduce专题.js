/**
 * 参数
callbackFn
一个 “reducer” 函数，包含四个参数：
previousValue：上一次调用 callbackFn 时的返回值。在第一次调用时，若指定了初始值 initialValue，其值则为 initialValue，否则为数组索引为 0 的元素 array[0]。
currentValue：数组中正在处理的元素。在第一次调用时，若指定了初始值 initialValue，其值则为数组索引为 0 的元素 array[0]，否则为 array[1]。
currentIndex：数组中正在处理的元素的索引。若指定了初始值 initialValue，则起始索引号为 0，否则从索引 1 起始。
array：用于遍历的数组。
initialValue 可选
作为第一次调用 callback 函数时参数 previousValue 的值。若指定了初始值 initialValue，则 currentValue 则将使用数组第一个元素；否则 previousValue 将使用数组第一个元素，而 currentValue 将使用数组第二个元素。

返回值
使用 “reducer” 回调函数遍历整个数组后的结果。
 */

// 1、求数组中所有元素的值的和
const arr1 = [1, 2, 3, 4, 5]
const result1 = arr1.reduce((pre, cur) => {
  return pre + cur
}, 0)

// 2、求数组中指定元素的和
const arr2 = [{x:10}, {x:20}, {x:30}]
const result2 = arr2.reduce((pre, cur) => {
  return pre + cur.x
}, 0)

// 3、二维数组扁平化
const arr3 = [
  [10, 20, 30, 40],
  [10, 20, 30, 40],
  [10, 20, 30, 40],
  [10, 20, 30, 40]
]

const result3 = arr3.reduce((total, currentValue) => {
  return total.concat(currentValue)
}, [])

// 4. 多维数组扁平化
// 多维数组拉平/平铺为一维数组
let arr4 = [
  [1, 2, 3],
  ['a', 'b', 'c'],
  [6, 7 ,8, ['aa', 'bb']],
  'single',
  [['cc', ['dd', ['ee']]]]
]

function deepFn(preArr, curArr) {
    return curArr.reduce((pre, cur) => {
      if (Array.isArray(cur)) {
        return deepFn(pre, cur)
      }
      return pre.concat(cur)
    }, preArr)
}
console.log(deepFn([], arr4))

// 5、将数组中每个元素（重复）出现的次数进行统计，最后将结果以对象的形式输出。
let arr5 = ['a', 'b', 'c', 'a', 'a', 'c']
    
let result5 = arr5.reduce((pre, cur) => {
  if (Reflect.has(pre, cur)) {
    pre[cur]++
  } else {
    pre[cur] = 0
  }
  return pre
}, {})

console.log(result5)

// 6、数组去重
let arr6 = ['a', 'b', 'c', 'a', 'a', 'c']
    
let result6 = arr6.reduce((pre, cur) => {
  if(!pre.includes(cur)) {
    pre.push(cur)
  }
  return pre
}, [])

console.log(result6)

// 7.用reduce实现map函数
// map:遍历数组的每一项，并执行回调函数的操作，返回一个对每一项进行操作后的新数组，
// arr = []
// arr.map(function(item,idx,arr){
//     item //数组的每一项
//     idx // 当前项的索引
//     arr // 当前遍历的数组
//     this // 函数体内的 this 为 callbackThis参数，
//          如果不指定或者指定为 null和 undefined，则 this指向全局对象
// },callbackThis)
Array.prototype.myMap = function (func, callbackThis) {
  // 定义回调函数的执行环境
  // call 第2个参数传入null 则this指向全部对象
  let cbThis = callbackThis || null;
  return this.reduce((pre, cur, index, arr) => {
    console.log('pre: ', pre, cur, index)
    pre.push(func.call(cbThis, cur, index, arr))
    return pre
  }, [])
}

let arr11 = [1,2,3,4,5,6,7,8]
let result11 = arr11.myMap(function(item) {
  return item * 2
})

console.log(result11)

// 统计数组的维度



