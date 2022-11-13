// 观察者模式（基于发布订阅模式） 有观察者，也有被观察者
// 观察者需要放到被观察者中，被观察者的状态变化需要通知观察者 我变化了 内部也是基于发布订阅模式，收集观察者，状态变化后要主动通知观察者

// 发布者
class Publisher {
  // 监听集合
  observers = []
  constructor() {
    
  }
  
  add(observer) {
    console.log('--- add observer ---')
    this.observes.push(observer)
  }

  remove(observer) {
    console.log('--- remove observer ---')
    const idx = this.observers.indexOf(observer)
    if (idx < 0) {
      console.log('--- not found ---')
      return
    }
    this.observers.splice(i, 1)
  }

  // 通知
  notify() {
    for (const observer of this.observers) {
      observer.update()
      console.log('--- notify ---')
    }
  }
}

// 订阅者
class Observer {
  constructor(name = '') {
    this.name = name
  }

  update() {
    console.log(`update -- ${this.name}`)
  }
}

const o1 = new Observer('o1')
const o2 = new Observer('o2')

const p = new Publisher()
p.add(o1)
p.add(o2)

p.notify()