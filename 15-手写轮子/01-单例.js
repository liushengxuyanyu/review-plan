// 普通写法
// class Singleton {
//   name = 'liu'
//   constructor() {

//   }

//   sayHello() {
//     console.log(`----${this.name}`)
//   }

//   static getInstance() {
//     if (!Singleton.instance) {
//       Singleton.instance = new Singleton
//     }
//     return Singleton.instance
//   }
// }

// const s1 = Singleton.getInstance()
// const s2 = Singleton.getInstance()
// s1.name = 'wang'
// s1.sayHello()
// s2.sayHello()
// console.log(s1 === s2)

// 闭包写法
class Singleton {
  constructor() {}
  
  static getInstance = (function() {
    let instance = null
    return function() {
      if (!instance) {
        instance = new Singleton()
      }
      return instance
    }
  })()
}




