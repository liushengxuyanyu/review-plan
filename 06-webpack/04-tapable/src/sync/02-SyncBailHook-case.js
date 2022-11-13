// tapable syncBailHook 同步钩子 简单实现
class SyncBailHook {
  constructor(args) { // args 就是 ['name']
    this.tasks = [] // 用于存储注册任务
  }

  // 同步注册
  tap(name, task) {
    this.tasks.push(task)
  }

  call(...args) {
    // this.tasks.forEach(task => task(...args))
    let ret; // 当前函数的返回值
    let index = 0; // 索引
    do {
      ret = this.tasks[index++](...args)
    } while (ret === undefined && index < this.tasks.length );
  }
}

let hook = new SyncBailHook(['name'])

hook.tap('react', function(name) {
  console.log('----react---', name)
  // return 'xxx'
})

hook.tap('node', function(name) {
  console.log('----node---', name)
})

hook.call('lsx')