/**
     * 深拷贝有几个问题需要考虑：
     * 1、循环引用问题
     * 2、无法拷贝一些特殊的对象，诸如 RegExp, Date, Set, Map等
       3、无法拷贝函数(划重点)。
     */

    // 版本1：简易版本的深拷贝（只考虑数组和对象）
    function deepClone(target) {
      if (typeof target !== 'object' || target === null) {
        return target
      }

      let cloneTarget = Array.isArray(target) ? [] : {}
      for (let key in target) {
        if (target.hasOwnProperty(key)) {
          cloneTarget[key] = deepClone(target[key])
        }
      }
      return cloneTarget
    }

    // 版本2：考虑循环引用的问题
    // 使用map来记录已经拷贝过的对象（使用weakMap弱引用）
    function deepClone2(target, weakMap = new WeakMap()) {

      if (typeof target !== 'object' || target === null) {
        return target
      }

      // 如果已经拷贝过 则直接返回
      if (weakMap.get(target)) {
        return target
      }
      // 记录已经拷贝的引用类型
      weakMap.set(target, true)

      let cloneTarget = Array.isArray(target) ? [] : {}
      for (let key in target) {
        if (target.hasOwnProperty(key)) {
          cloneTarget[key] = deepClone2(target[key], weakMap)
        }
      }
      return cloneTarget
    }
    /**
     *  版本3：在前面版本基础上在加上 其他类型数据
     * 1、可遍历数据类型
     * 2、不可遍历数据类型
     * 3、函数
     */

     function deepClone3(target, weakMap = new WeakMap()) {

      // 基本数据类型直接返回
      if (typeof target !== 'object' || target === null) {
        return target
      }

      // 如果已经拷贝过 则直接返回
      if (weakMap.get(target)) {
        return target
      }
      // 记录已经拷贝的引用类型
      weakMap.set(target, true)

      // 能遍历的数据类型
      const canTraverse = {
        '[object Map]': true,
        '[object Set]': true,
        '[object Array]': true,
        '[object Object]': true
      }

      let cloneTarget;
      let type = Object.prototype.toString.call(target)

      if (!canTraverse[type]) {
        // 不可遍历类型。。TODO:
        return
      }

      // 函数TODO: 

      // 通用创建（原型上也会带过来）
      // let Ctr = Object.getPrototypeOf(target).constructor
      let Ctr = target.constructor
      cloneTarget = new Ctr()
      
      // map类型
      if (type === '[object Map]') {
        // cloneTarget = new Map()
        for (let [key, value] of target) {
          cloneTarget.set(deepClone3(key, weakMap), deepClone3(value, weakMap))
        }
      }

      // set类型
      if (type === '[object Set]') {
        // cloneTarget = new Set()
        for (let item of target) {
          cloneTarget.add(deepClone3(item, weakMap))
        }
      }

      if (type === '[object Object]' || type === '[object Array]') {
        // cloneTarget = Array.isArray(target) ? [] : {}
        for (let key in target) {
          if (target.hasOwnProperty(key)) {
            cloneTarget[key] = deepClone3(target[key], weakMap)
          }
        }
      }
      return cloneTarget
    }

    let obj2 = {
      name: 'liu',
      o: {
        name: 'sheng'
      },
      f: [
        'a', 'b', 'c'
      ],
      age: 28,
      map: new Map([
        ['a', '我是a'],
        ['b', { name: '我是b' }]
      ]),
      set: new Set([33, 22, 44])
    }
    // 测试循环引用
    obj2.target = obj2
    let result = deepClone3(obj2)

    console.log(result)