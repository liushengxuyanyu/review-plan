/** 
3.实现Animal类，可以同时达到以下效果:

输入: 
new Animal('dog');
输出: 
This is dog

输入:
new Animal('cat').sleep(5).eat('dinner');
输出：
This is cat
Sleep 5s ...
Wake up after 5s
Eat dinner~

输入:
new Animal(‘cat’).eat(‘dinner’).eat(‘supper’);
输出：
This is cat
Eat dinner~
Eat supper~

输入:
new Animal(‘cat’).sleepFirst(5).eat(‘supper’);
输出：
Sleep 5s ...
Wake up after 5s
Hi This is cat!
Eat supper~
*/

class Animal {
  // 函数队列
  #queue = []
  constructor(animal = 'animal') {
    // console.log(`this is ${animal}`)
    this._initPrint(animal)
    // this._execute()
  }

  // 初始化打印
  _initPrint(animal) {
    this.#queue.push(() => {
      console.log(`this is ${animal}`)
      this._execute()
    })
    setTimeout(() => this._execute());
    // console.log(`this is ${animal}`)
    // this._execute()
  }

  // 执行队列里的方法
  _execute() {
    let fn = this.#queue.shift()
    // console.log(fn, '-ex--', this.#queue)
    if (fn) {
      fn()
    }
  }

  // 睡眠
  sleep(delay = 1) {
    // console.log(`Sleep ${delay}s ...`)
    this.#queue.push(() => {
      console.log(`Sleep ${delay}s ...`)
      setTimeout(() => {
        console.log(`Wake up after ${delay}s`)
        this._execute()
      }, delay * 1000)
    })
    // console.log(this.#queue)
    return this
  }

  // 放到第一个睡眠
  sleepFirst(delay = 1) {
    this.#queue.unshift(() => {
      // console.log(`SleepFirst ${delay}s ...`)
      console.log(`Sleep ${delay}s ...`)
      setTimeout(() => {
        console.log(`Wake up after ${delay}s`)
        this._execute()
      }, delay * 1000)
    })
    // console.log(this.#queue)
    return this
  }

  // 吃饭
  eat(food = 'food') {
    this.#queue.push(() => {
      console.log(`Eat ${food}~`)
      this._execute()
    })
    // console.log(this.#queue)
    return this
  }
}

// 1.
new Animal('dog')

// 2.
// new Animal('cat').sleep(5).eat('dinner')

// 3.
// new Animal('cat').eat('dinner').eat('supper')

// 4.
// new Animal('cat').sleepFirst(5).eat('supper')