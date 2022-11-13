// 导入同步钩子
const { SyncHook } = require('tapable')

class Lesson {
  constructor() {
    // 自定义一些钩子
    this.hooks = {
      // 架构钩子。。 参数可选填
      arch: new SyncHook(['name'])
      // 学习 js钩子 。。。
      // js: new SyncHook(['name'])
    }
  }
  // 用来注册监听函数
  tap() {
    // SyncHook 实例中 tap方法用于注册 钩子
    this.hooks.arch.tap('node', (name) => {
      console.log('---node----', name)
    })

    this.hooks.arch.tap('react', (name) => {
      console.log('---react----', name)
    })
  }

  // 启动钩子
  start() {
    // SyncHook 实例中 call方法用于调用 钩子
    this.hooks.arch.call('lsx')
  }

}

const lesson = new Lesson()
lesson.tap() // 注册钩子
lesson.start() // 启动钩子