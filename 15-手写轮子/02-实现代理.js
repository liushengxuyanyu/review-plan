let vm = {
  _data: {
    name: 'liu',
    age: 18
  },
  _props: {
    // ...
  }
}


// 将 key代理到target上
function proxyFn(target, sourcekey, key) {
  Object.defineProperty(target, key, {
    enumerable: true,
    configurable: true,
    get() {
      return target[sourcekey][key]
    },
    set(newVal) {
      target[sourcekey][key] = newVal
    }
  })
}


  proxyFn(data, '_data', key)    





  