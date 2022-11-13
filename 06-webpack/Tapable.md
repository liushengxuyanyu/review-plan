## Tapable
webpack本质上是一种事件流的机制，它的工作流程就是将各个插件串联起来，而实现这一切的核心就是`Tapable`, Tapable有点类似于node events库，核心原理也是依赖于`发布订阅模式`。

## 钩子类型？

* `同步钩子：` 每个事件（监听函数）依次同步执行
  * `SyncHook(同步钩子)：` 钩子内的注册的事件监听函数同步依次执行

  * `SyncBailHook(同步熔断钩子)：` 肯定会执行第一个监听函数，之后遇到的监听函数如果`return`的不是`undefined`就会停止下边监听函数的运行

  * `SyncWaterfallHook(同步瀑布钩子)：` 每个监听函数的`执行结果`传递给下个监听函数, 如果函数队列中某个`return`的是`undefined`，那下一个监听函数会拿之前不是`undefined`的`reutrn结果`

  * `SyncLoopHook(同步循环钩子)：` 遇到不返回`undefined`的监听函数会多次执行

```js
  // 同步使用tap 进行注册事件
  hook.tap('a', (name) => {
    console.log('-----', name)
  })
  hook.tap('b', (name) => {
    console.log('-----', name)
  })

  // 使用call 同步调用注册的事件 监听函数
  hook.call('xxx')
```

* `异步钩子：` 同时可以发送多个请求，`串行`或者`并行`（需要等待所有并发的异步事件执行后，在执行回调）

  * `AsyncParallelHook(异步并行钩子)：` 钩子内部所有异步事件 `全部执行(并行执行)完毕`，整个钩子系统(`callAsync/promise`)才会执行回调(或者then)。类似于`Promise.all()`

  * `AsyncParallelBailHook(异步并行熔断钩子)：` 相比上边只是多加入了 `异常/reject`的情况，一旦有一个`异常/reject` 整个钩子系统就会执行完毕。类似于`Promise.race() `

  * 异步串行钩子
  * 异步串行熔断钩子