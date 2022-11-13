// 导入同步循环钩子
const { SyncLoopHook } = require('tapable')

class Lesson {
  constructor() {
    this.index = 0
    // 自定义一些钩子
    this.hooks = {
      // 架构钩子。。 参数可选填
      arch: new SyncLoopHook(['name'])
    }
  }
  // 用来注册监听函数
  tap() {
    this.hooks.arch.tap('node', (name) => {
      console.log('---node----', name)
      return ++this.index === 3 ? undefined : '继续学'
    })

    this.hooks.arch.tap('react', (name) => {
      console.log('---react----', name)
      // return '我是react'
      // return undefined
    })

    this.hooks.arch.tap('vue', (name) => {
      console.log('---vue----', name)
    })
  }

  // 启动钩子
  start() {
    this.hooks.arch.call('lsx')
  }

}

const lesson = new Lesson()
lesson.tap() // 注册钩子
lesson.start() // 启动钩子