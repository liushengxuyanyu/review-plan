new Promise((resolve,reject)=>{
  console.log(1)
  resolve()
}).then(()=>{
  console.log(2)
  new Promise((resolve,reject)=>{
      console.log(3)
      resolve('arg33')
  }).then(()=>{
      console.log(4)
      return Promise.resolve('aaaaaa')
  }).then((res)=>{
      console.log(5, 'res', res)
  })
}).then((res)=>{
  console.log(6, '666', res)
})