// tapable syncHook 同步钩子 简单实现
class SyncHook {
  constructor(args) { // args 就是 ['name']
    this.tasks = [] // 用于存储注册任务
  }

  // 同步注册
  tap(name, task) {
    this.tasks.push(task)
  }

  call(...args) {
    this.tasks.forEach(task => task(...args))
  }
}

let hook = new SyncHook(['name'])

hook.tap('react', function(name) {
  console.log('----react---', name)
})

hook.tap('node', function(name) {
  console.log('----node---', name)
})

hook.call('lsx')