function ajax(url) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest()
    xhr.open('get', url)
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4) {
        if (xhr.status >= 200 && xhr.status <= 300) {
          resolve(JSON.parse(xhr.responseText))
        } else {
          reject('请求出错')
        }
      }
    }
    xhr.send()  //发送hppt请求
  })
}

let url = '/data.json'
ajax(url).then(res => console.log(res))
  .catch(reason => console.log(reason))

/**
 * 利用<script>标签不受跨域限制的特点，缺点是只能支持 get 请求
创建script标签
设置script标签的src属性，以问号传递参数，设置好回调函数callback名称
插入到html文本中
调用回调函数，res参数就是获取的数据
 */

function jsonp(url, params, cbName) {
  return new Promise((resolve, rejecrt) => {
    let script = document.createElement('script')
    let pStr = ''
    for (let p in params) {
      pStr += `&${p}=${params[p]}`
    }
    script.src = `${url}?callback=${cbName}${pStr}`
    console.log(script.src)

    window[cbName] = function(data) {
      resolve(data)
      document.removeChild(script)
    }
    document.appendChild(script)
  })
}

jsonp('http://xxx.com', {name: 'liu', age: 18}, 'liuFn').then((res)=>{
  console.log(res, '-----')
})