// tapable SyncWaterfallHook  简单实现
class SyncWaterfallHook {
  constructor(args) { // args 就是 ['name']
    this.tasks = [] // 用于存储注册任务
  }

  // 同步注册
  tap(name, task) {
    this.tasks.push(task)
  }

  call(...args) {
    let [first, ...others] = this.tasks
    let ret = first(...args)

    others.reduce((pre, cur) => {
      return cur(pre)
    }, ret)

  }
}

let hook = new SyncWaterfallHook(['name'])

hook.tap('react', function(name) {
  console.log('----react---', name)
  return 'react ok'
})

hook.tap('node', function(name) {
  console.log('----node---', name)
  return 'node ok'
})

hook.tap('vue', function(name) {
  console.log('----vue---', name)
})

hook.call('lsx')