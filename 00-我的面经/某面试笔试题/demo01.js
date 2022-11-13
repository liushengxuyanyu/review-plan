/**
 * 1.给定一个二维数组data，实现getter和setter方法。getter方法可以根据输入的编号，获取到二维数组中对应位置的数据；setter方法可以根据输入的编号和值，重置数据。
const data = [
    ['a','c',1,6,5],
    [6,7,'d',9,'3',11],
    [12,13,14,15,16,17]
];

getter(data, 3) => 1
getter(data, 8) => 'd'
getter(data, 13) => 13

setter(data, 1, 'T')
=> 
 [
   ['T','c',1,6,5],
   [6,7,'d',9,'3',11],
   [12,13,14,15,16,17]
]
 */

const data = [
  ['a','c',1,6,5],
  [6,7,'d',9,'3',11],
  [12,13,14,15,16,17]
];

function getter(data, no) {
  let arr = data.flat()
  return arr[no - 1]
}

function setter(data, no, value) {
  for (let i = 0; i < data.length; i ++) {
    if (no <= data[i].length) {
      data[i][no - 1] = value
      return data
    } else {
      no -= data[i].length
    }
  }
  return data
}
console.log(getter(data, 1))
console.log(getter(data, 8))
console.log(setter(data, 1, 'T'))
console.log(setter(data, 8, 'B'))