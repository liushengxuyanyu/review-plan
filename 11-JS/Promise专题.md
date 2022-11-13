https://juejin.cn/post/6892555927770103822

https://zhuanlan.zhihu.com/p/54364581
### Promise的特性以及（优缺点）？

Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。

所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。

**特点**：

（1）对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是Promise这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。

（2）一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise对象的状态改变，只有两种可能：从pending变为fulfilled和从pending变为rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。如果改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

**缺点：**  

首先，无法取消Promise，一旦新建它就会立即执行，无法中途取消。

其次，如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。

---

### Promise.prototype.then()?
> then的链式调用说明then返回结果也是一个promise对象。
---

### Promise.prototype.catch()?
如果 Promise 状态已经变成resolved，再抛出错误是无效的。因为 Promise 的状态一旦改变，就永久保持该状态，不会再变了。 如下案例：
```javascript
const promise = new Promise(function(resolve, reject) {
  resolve('ok');
  throw new Error('test');
});
promise
  .then(function(value) { console.log(value) })
  .catch(function(error) { console.log(error) });
  // ok
```
另外promise会吃掉内部的错误，普通代码报错后如果不进行捕获会退出进程终止脚本执行，但promise内部报错后不会影响外部的代码（但会影响内部接下来的代码）如下：
```javascript
const someAsyncThing = function() {
  return new Promise(function(resolve, reject) {
    // 下面一行会报错，因为x没有声明，但promise外面代码依然会执行
    resolve(x + 2);
    // 注意： 如果上边有异常，这里不会执行。
    console.log("--这里是resolve自后的内部代码-")
  });
};

someAsyncThing().then(function() {
  console.log('everything is great');
});

setTimeout(() => { console.log(123) }, 2000);
// Uncaught (in promise) ReferenceError: x is not defined
// 123
```
---
### Promise.prototype.finally()?
> finally()方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。该方法是 ES2018 引入标准的。
```javascript
promise
.then(result => {···})
.catch(error => {···})
.finally(() => {···});
```
---
### Promise.all()?
Promise.all()方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。  
参数数组，也可以是有Iterator接口，且返回每个成员必须是promise对象。
```javascript
const p = Promise.all([p1, p2, p3]);
```
只有每个promise实例的状态都变成fulfilled（返回每个promises的resolve结果数组），或者其中有一个变为rejected（只返回第一个reject的error结果），才会调用Promise.all方法后面的回调函数。

> 注意：如果作为参数的 Promise 实例，自己定义了catch方法，那么它一旦被rejected，并不会触发Promise.all()的catch方法。 如下：
```javascript
const p1 = new Promise((resolve, reject) => {
  resolve('hello');
})
.then(result => result)
.catch(e => e);

const p2 = new Promise((resolve, reject) => {
  throw new Error('报错了');
})
.then(result => result)
.catch(e => e);

Promise.all([p1, p2])
.then(result => console.log(result))
.catch(e => console.log(e));
// ["hello", Error: 报错了]
```
上面代码中，p1会resolved，p2首先会rejected，但是p2有自己的catch方法，该方法返回的是一个新的 Promise 实例，p2指向的实际上是这个实例。该实例执行完catch方法后，也会变成resolved，导致Promise.all()方法参数里面的两个实例都会resolved，因此会调用then方法指定的回调函数，而不会调用catch方法指定的回调函数。

如果p2没有自己的catch方法，就会调用Promise.all()的catch方法。  

---
### Promise.race()?
和Promise.all()参数一样，只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给p的回调函数。如下：
```javascript
const p = Promise.race([p1, p2, p3]);
```
使用场景：
如果 5 秒之内fetch方法无法返回结果，变量p的状态就会变为rejected，从而触发catch方法指定的回调函数。
```javascript
const p = Promise.race([
  fetch('/resource-that-may-take-a-while'),
  new Promise(function (resolve, reject) {
    setTimeout(() => reject(new Error('request timeout')), 5000)
  })
]);

p
.then(console.log)
.catch(console.error);
```
---
### Promise.allSettled()?
和Promise.all()不同的是，这个只有等到参数数组的所有 Promise 对象都发生状态变更（不管是fulfilled还是rejected），返回的 Promise 对象才会发生状态变更。

返回promise的results的每个成员是一个对象，对象的格式是固定的，对应异步操作的结果。
```javascript
// 异步操作成功时
{status: 'fulfilled', value: value}
// 异步操作失败时
{status: 'rejected', reason: reason}
```
---
### Promise.any()?
跟Promise.race()方法很像，只有一点不同，就是Promise.any()不会因为某个 Promise 变成rejected状态而结束，必须等到所有参数 Promise 变成rejected状态才会结束。  

---
### Promise.resolve()?
将现有对象转换为promise对象。
```javascript
Promise.resolve('foo')
// 等价于
new Promise(resolve => resolve('foo'))
```
---
### Promise.reject()?
Promise.reject(reason)方法也会返回一个新的 Promise 实例，该实例的状态为rejected。
```javascript
const p = Promise.reject('出错了');
// 等同于
const p = new Promise((resolve, reject) => reject('出错了'))

p.then(null, function (s) {
  console.log(s)
});
// 出错了
```
---
### Promise.try()?
正常来说被Promise.resovle().then(f) 包装某个函数后，不管是同步函数还是异步函数，都会变成异步操作。但我们如果想要同步函数就同步操作，异步函数就异步操作的话，就可以使用Promise.try()

```javascript
const f = () => console.log('now');
Promise.try(f);
console.log('next');
// now
// next
```

如果promise内部同步报异常了：例如链接数据库报异常了，promise的catch块是捕获不到的。需要用try catch语句来捕获。
```javascript
try {
  database.users.get({id: userId})
  .then(...)
  .catch(...)
} catch (e) {
  // ...
}
```
上面这样的写法就很笨拙了，这时就可以统一用promise.catch()捕获所有同步和异步的错误
```javascript
Promise.try(() => database.users.get({id: userId}))
  .then(...)
  .catch(...)
```
事实上，Promise.try就是模拟try代码块，就像promise.catch模拟的是catch代码块。



