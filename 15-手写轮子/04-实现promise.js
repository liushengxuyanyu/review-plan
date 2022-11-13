function myPromise(constructor) {
  let self = this;
  self.status = "pending"   // 定义状态改变前的初始状态
  self.value = undefined;   // 定义状态为resolved的时候的状态
  self.reason = undefined;  // 定义状态为rejected的时候的状态

  function resolve(value) {
     if(self.status === "pending") {
        self.value = value;
        self.status = "resolved";
     }
  }
  function reject(reason) {
     if(self.status === "pending") {
        self.reason = reason;
        self.status = "rejected";
     }
  }
  // 捕获构造异常
  try {
     constructor(resolve,reject);
  } catch(e) {
     reject(e);
  }
}

// 添加 then 方法
myPromise.prototype.then = function(onFullfilled,onRejected) {
  let self = this;
  switch(self.status) {
     case "resolved":
       onFullfilled(self.value);
       break;
     case "rejected":
       onRejected(self.reason);
       break;
     default:       
  }
}

Promise.all = function(promises) {
  return new Promise((resolve, reject) => {
    let result = [];
    let index = 0;
    let len = promises.length;
    if(len === 0) {
      resolve(result);
      return;
    }
   
    for(let i = 0; i < len; i++) {
      // 为什么不直接 promise[i].then, 因为promise[i]可能不是一个promise
      Promise.resolve(promise[i]).then(data => {
        result[i] = data;
        index++;
        if(index === len) resolve(result);
      }).catch(err => {
        reject(err);
      })
    }
  })
}

Promise.race = function(promises) {
  return new Promise((resolve, reject) => {
    let len = promises.length;
    if(len === 0) return;
    for(let i = 0; i < len; i++) {
      Promise.resolve(promise[i]).then(data => {
        resolve(data);
        return;
      }).catch(err => {
        reject(err);
        return;
      })
    }
  })
}