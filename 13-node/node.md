## node部署管理
* 安装  
`npm install pm2 -g`
* 相关命令  
  * 运行`pm2 start app.js`
  * 查看运行状态 `pm2 list`
  * 追踪资源运行情况 `pm2 monit`
  * 查看日志 `pm2 logs`
  * 重启应用 `pm2 restart appId`
  * 停止应用 `pm2 stop app.js`
  * 开启api访问 `pm2 web`
  * 自动重启 `pm2 start app.js --watch`

## request模块（三方）
一个第三方的模块，可用于发起 http 或 https 请求，可理解成服务端的 ajax 请求。可用于代简单的服务器代理，用法和 ajax 类似。  
在使用前需要先安装 `npm install request --save`

## 简单http爬虫demo
又被称为网页蜘蛛，网络机器人，主要是在服务端去请求外部的 url 拿到对方的资源，然后进行分析并抓取有效数据。

这里用 request 实现一个简单的图片抓取的小爬虫
```javascript
const request = require('request');
const fs = require('fs');
const cheerio = require('cheerio'); // 类似于jQuery，用来服务端做爬虫的库

request('http://www.lanrentuku.com/', (error, response, body) => {
    let $ = cheerio.load(body);
    $('img', '.in-ne').each((i, e) => {
        let src = $(e).attr('src');
        let name = src.substr(src.lastIndexOf('/') + 1);
        request(src).pipe(fs.createWriteStream(name))
    })
})
```
用async/await更简洁
```js
let spider = (url) => {
    return new Promise((resolve, reject) => {
        request(url, (error, response, body) => {
            resolve(body);
        })
    })
}

let start = async () => {
    let dom = await spider('http://www.lanrentuku.com/');
    let $ = cheerio.load(dom);
    $('img', '.in-ne').each((i, e) => {
        let src = $(e).attr('src');
        let name = src.substr(src.lastIndexOf('/') + 1);
        request(src).pipe(fs.createWriteStream(name))
    })
}

start();
```


## http模块
1. 引入模块
```javascript 
var http = require('http'); 
```
2. 创建服务并监听端口
```javascript 
http.createServer(function (req, res) {
  // req为接收请求的对象
  // res为相应的对象
}).listen(3000); // 监听的端口
``` 

## url模块
1. 引入模块
```javascript
var url = require('url')
```

## fs模块
