// tapable SyncLoopHook  简单实现
class SyncLoopHook {
  constructor(args) { // args 就是 ['name']
    this.tasks = [] // 用于存储注册任务
  }

  // 同步注册
  tap(name, task) {
    this.tasks.push(task)
  }

  call(...args) {
    this.tasks.forEach(task => {
      let ret;
      do {
        ret = task(...args)
      } while (ret !== undefined);
    })
  }
}

let hook = new SyncLoopHook(['name'])
let total = 0

hook.tap('react', function(name) {
  console.log('----react---', name)
  return ++total === 3 ? undefined : '继续学'
})

hook.tap('node', function(name) {
  console.log('----node---', name)
  // return 'node ok'
})

hook.tap('vue', function(name) {
  console.log('----vue---', name)
})

hook.call('lsx')