/*
  JS中没有像Java中的sleep()睡眠函数
*/

  function sleep(interval) {
    return new Promise(resolve => {
      setTimeout(resolve, interval)
    })
  }

  async function fn(interval) {
    for(let i = 1; i <= 5; i++) {
      // console.log(i);
      await sleep(interval);
      console.log('----i---', i)
    }
  }

  console.log("--1--")
  fn(3000)
  console.log("--2--")

// 红绿灯问题
  function sleep2(color, delay) {
    return new Promise((resolve) => {
      // let timer = setInterval(() => {
      //   console.log(color)  
      // }, 1000);
      
      setTimeout(() => {
        // clearInterval(timer)
        console.log(color)
        resolve()
      }, delay)
    })
  }

  async function fn() {
    await sleep2('red', 3000)
    await sleep2('green', 1000)
    await sleep2('yellow', 2000)
  }

  fn()