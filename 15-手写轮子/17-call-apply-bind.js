// 模拟 call bar.mycall(null);
//实现一个call方法：
// 原理：利用 context.xxx = self obj.xx = func-->obj.xx()
Function.prototype.myCall = function(context = window, ...args) {
  if (typeof this !== "function") {
    throw new Error('type error')
  }
  // this-->func  context--> obj  args--> 传递过来的参数

  // 在context上加一个唯一值不影响context上的属性
  let key = Symbol('key')
  context[key] = this; // context为调用的上下文,this此处为函数，将这个函数作为context的方法
  // let args = [...arguments].slice(1)   //第一个参数为obj所以删除,伪数组转为数组
  
  // 绑定参数 并执行函数
  let result = context[key](...args);
  // 清除定义的this 不删除会导致context属性越来越多
  delete context[key];

  // 返回结果 
  return result;
};

Function.prototype.myApply = function(context = window, args) {
  // this-->func  context--> obj  args--> 传递过来的参数

  // 在context上加一个唯一值不影响context上的属性
  let key = Symbol('key')
  context[key] = this; // context为调用的上下文,this此处为函数，将这个函数作为context的方法
  // let args = [...arguments].slice(1)   //第一个参数为obj所以删除,伪数组转为数组
  
  let result = context[key](...args); // 这里和call传参不一样

  // 清除定义的this 不删除会导致context属性越来越多
  delete context[key]; 

  // 返回结果
  return result;
}

// 手写bind
Function.prototype._bind = function (context, ...bindArgs) {
  // 利用apply实现，注意绑定参数的拼接
  return (...args) => {
    this.apply(context, bindArgs.concat(args));
  };
};

// 使用
function f(a,b){
  console.log(a,b)
  console.log(this.name)
 }
 let obj={
  name:'张三'
 }
 f.myApply(obj,[1,2])  //arguments[1]