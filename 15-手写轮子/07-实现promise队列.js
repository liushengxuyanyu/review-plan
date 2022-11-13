// function queueReduce(list) {
//   // reduce函数给一个初始值 其值为处于resolved状态的promise对象
//   // 函数开始执行 第一个初始值给pre 所以进入then函数 然后返回一个新的promise对象 这个对象会赋值给
//   // 下一轮的pre 所以就达到了上一轮的promise对象控制下一轮进入then函数的时机
//   // reduce设定初始值后 cur就会从数组的第一项开始(如果不设初始值,那么cur是从第二项)
//   list.reduce((pre, cur) => {
//     return pre.then(res => {
//       return new Promise(resolve => {
//         setTimeout(() => {
//           console.log(cur)
//           resolve()
//         }, 1000)
//       })
//     })
//   }, Promise.resolve())
// }

// queueReduce([1, 2, 3, 4, 5, 6])

let p1 = new Promise((resolve, reject) => {
  setTimeout(()=>{
    // console.log('---p1')
    resolve('p1')
  }, 2000)
  
})
let p2 = new Promise((resolve, reject) => {
  setTimeout(()=>{
    // console.log('---p2')
    resolve('p2')
  }, 1000)
})
let p3 = new Promise((resolve, reject) => {
  setTimeout(()=>{
    // console.log('---p3')
    resolve('p3')
  }, 5500)
})
let p4 = new Promise((resolve, reject) => {
  setTimeout(()=>{
    // console.log('---p4')
    resolve('p4')
  }, 1200)
})

function queue(arr = []) {
  arr.reduce((pre, cur) => {
    return pre.then(() => {
      // return new Promise((resolve, reject) => {
      //   cur.then(res1 => {
      //     console.log(res1)
      //     resolve()
      //   })
      // })
      return cur.then(res => {
        console.log(res)
      })
    })
  }, Promise.resolve())
}

queue([p1, p3, p4, p2])

/**
 * promise队列就是保证上一个执行完再执行下一个 所以需要让上一个promise影响到下一个
    将一个新的promise对象赋值给p 这样下一轮时p就可以变成上一轮的promise对象了
    然后通过resolve将其状态改变 从而使得下一轮可以进入then函数
*/

// let arr = [1, 2, 3, 4, 5]
let arr = [
  { interval: 2000, val: 1},
  { interval: 5000, val: 2},
  { interval: 500, val: 3},
  { interval: 1000, val: 4},
]

function queue() {
  let p = Promise.resolve()
  arr.map(val => {
    p = p.then(()=> {
      setTimeout(() => {
        console.log("------", val)
        resolve()
      }, val.interval)
    })
  })
}

queue()