// 导入异步并行钩子
const { AsyncParallelHook } = require('tapable')

class Lesson {
  constructor() {
    // 自定义一些钩子
    this.hooks = {
      // 架构钩子。。 参数可选填
      arch: new AsyncParallelHook(['name'])
      // 学习 js钩子 。。。
      // js: new SyncHook(['name'])
    }
  }
  // 用来注册监听函数
  tap() {
    this.hooks.arch.tapAsync('node', (name, cb) => {
      setTimeout(() => {
        console.log('---node----', name)
        cb()  
      }, 2000)
    })

    this.hooks.arch.tapAsync('react', (name, cb) => {
      setTimeout(() => {
        console.log('---react----', name)
        cb()  
      }, 1000)
    })
  }

  // 启动钩子
  start() {
    this.hooks.arch.callAsync('lsx', function() {
      console.log("---end---")
    })
  }

}

const lesson = new Lesson()
lesson.tap() // 注册钩子
lesson.start() // 启动钩子