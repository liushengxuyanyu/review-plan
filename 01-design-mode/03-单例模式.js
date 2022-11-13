// 保证一个类仅有一个实例，并提供一个访问它的全局访问点，这样的模式就叫做单例模式。
class SingleDog {
  show() {
      console.log('我是一个单例对象')
  }
  static getInstance() {
      // 判断是否已经new过1个实例
      if (!SingleDog.instance) {
          // 若这个唯一的实例不存在，那么先创建它
          SingleDog.instance = new SingleDog()
      }
      // 如果这个唯一的实例已经存在，则直接返回
      return SingleDog.instance
  }
}

const s1 = SingleDog.getInstance()
const s2 = SingleDog.getInstance()

// true
console.log(s1 === s2)


// 闭包来实现单例模式
class SingleCat {
  show() {
    console.log('我是一个单例对象')
  }
  static getInstance = (function() {
    let instance = null
    return function () {
      if (!instance) {
        instance = new SingleCat()
      }
      return instance
    }
  })()
}

const s3 = SingleCat.getInstance()
const s4 = SingleCat.getInstance()

console.log(s3 === s4)

// 实现Storage，使得该对象为单例，基于 localStorage 进行封装。
// 实现方法 setItem(key,value) 和 getItem(key)。
class SingleStorage {
  static getInstance() {
      if (!SingleStorage.instance) {
        SingleStorage.instance = new SingleStorage()
      }
      return SingleStorage.instance
  }
  setItem(key, value) {
    localStorage.setItem(key, value)
  }
  getItem(key) {
    return localStorage.getItem(key)
  }
}

// 闭包版 也可以这样写
// 先实现一个基础的StorageBase类，把getItem和setItem方法放在它的原型链上
function SingleStorageBase() {}
SingleStorageBase.prototype.setItem = function(key, value) {
  localStorage.setItem(key, value)
}

SingleStorageBase.prototype.getItem = function(key) {
  return localStorage.getItem(key)
}

const Storage = (function () {
  let instance = null
  return function() {
    if (!instance) {
      instance = new SingleStorageBase()
    }
    return instance
  }
})()

// 用不用new都一样
let s5 = new Storage()
let s6 = Storage()

console.log('s5 === s6', s5 === s6)


// 单例弹框 案例

{/* <style>
    #modal {
        height: 200px;
        width: 200px;
        line-height: 200px;
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border: 1px solid black;
        text-align: center;
    }
</style>
<body>
	<button id='open'>打开弹框</button>
	<button id='close'>关闭弹框</button>
</body>
<script>
    // 核心逻辑，这里采用了闭包思路来实现单例模式
    const Modal = (function() {
    	let modal = null
    	return function() {
            if(!modal) {
            	modal = document.createElement('div')
            	modal.innerHTML = '我是一个全局唯一的Modal'
            	modal.id = 'modal'
            	modal.style.display = 'none'
            	document.body.appendChild(modal)
            }
            return modal
    	}
    })()
    
    // 点击打开按钮展示模态框
    document.getElementById('open').addEventListener('click', function() {
        // 未点击则不创建modal实例，避免不必要的内存占用;此处不用 new Modal 的形式调用也可以，和 Storage 同理
    	const modal = new Modal()
    	modal.style.display = 'block'
    })
    
    // 点击关闭按钮隐藏模态框
    document.getElementById('close').addEventListener('click', function() {
    	const modal = new Modal()
    	if(modal) {
    	    modal.style.display = 'none'
    	}
    })
</script> */}