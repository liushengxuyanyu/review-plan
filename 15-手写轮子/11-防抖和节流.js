// 防抖动是将多次执行变为最后一次执行，节流是将多次执行变成每隔一段时间执行

// 防抖：多次触发，在规定时间内只触发最后一次
function debounce(func, wait) {
  // 定时器id
  let timer = null
  // 这里返回的函数是每次用户实际调用的防抖函数
  // 如果已经设定过定时器了就清空上一次的定时器
  // 开始一个新的定时器，延迟执行用户传入的方法
  return function(...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, wait)
  }
}

const btn = document.querySelector('#btn')
btn.addEventListener('click', debounce(function() {
  console.log('点击了')
}, 1000))

// 节流
function throttle(func, wait) {
  // 定时器id
  let timer = null

  return function(...args) {
    if (timer) {
      return
    }
    timer = setTimeout(() => {
      func.apply(this, args)
      timer = null
    }, wait)
  }
}

