[探索NPM安装机制](https://juejin.cn/book/7053736179887243267/section/7053801025311866912)

[NPM的所有功能](https://juejin.cn/post/6844903870578032647#heading-40)


## `什么是npm？`
Node.js 完全是基于模块化构建的，因此需要一个高质量的包管理器。而npm就是其中一个包管理工具。

## `npm install的机制？`

`第一步：首先会去查找npm的配置信息。`  
npm install执行之后, 首先会检查和获取 npm的配置,这里的优先级为:  
> 项目级的.npmrc文件 > 用户级的 .npmrc文件 > 全局级的 .npmrc > npm内置的 .npmrc 文件   

npm提供了几个 npm config 指令来进行用户级和全局级配置 `npm config set <key> <value> [-g|--global]` 使用-g|--global标志修改或新增全局级配置，不使用的话修改或者新增用户级配置（相应级别的.npmrc文件会更新）。

`第二步：获取完配置文件之后，就会构建依赖树。`
 * 无lock文件：
    * 从 npm 远程仓库获取包信息。
    * 根据 package.json 构建依赖树，构建过程：
      * 构建依赖树时，不管其是直接依赖还是子依赖的依赖，优先将其放置在 node_modules 根目录。
      * 当遇到相同模块时，判断已放置在依赖树的模块版本是否符合新模块的版本范围，如果符合则跳过，不符合则在当前模块的 node_modules 下放置该模块。
      * 注意这一步只是确定逻辑上的依赖树，并非真正的安装，后面会根据这个依赖结构去下载或拿到缓存中的依赖包
  * 有lock文件：
    * 检查 package.json 中的依赖版本是否和 package-lock.json 中的依赖有冲突。会按照`semver(语义化)`版本规范检测。
      * 如果一致，直接跳过获取包信息、构建依赖树过程，开始在缓存中查找包信息。
      * 如果不一致，经测试。。是在有`^`符号的前提下
        * 如果使用`^x.x.x`大版本不同的话按照package.json版本安装。例如：lock文件`^3.1.0`，package.json是 `^2.1.0` 则会安装 2这个大版本下的最新小版本。
        * 如果大版本相同的话，谁的小版本大按照谁的安装。

`第三步：在有了依赖树之后，就可以根据依赖树下载完整的依赖资源。`  
> 在下载之前，会先检查下是否有缓存资源，如果存在缓存资源的话，那么直接将缓存资源解压到 node_modules 中。如果没有缓存资源，那么会先将 npm 远程仓库中的包下载至本地，然后会进行包的完整性校验，校验通过后将其添加的缓存中并解压到 node_modules 中。

`第四步：会生成 package-lock.json 文件。`  
整体流程图：
![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c87b3d0879fc411fbbde141261c0720d~tplv-k3u1fbpfcp-zoom-in-crop-mark:3326:0:0:0.awebp?)


## `npm不同版本生成依赖树的区别?`
> 不同的版本生成依赖树的方式是有区别的，其中主要是 v2、v3 和 v5 的版本之间的区别

* npm2.x  
在 npm 2.X 时期，还是使用的最简单的循环遍历方式，递归地下载所有的依赖包，只要有用到的依赖，都进行安装。在 npm 2.X 时期，还是使用的最简单的循环遍历方式，递归地下载所有的依赖包，只要有用到的依赖，都进行安装。
  * 优点：简单、理解
  * 缺点：项目之间难免有相同的依赖，然后就会有大量冗余的依赖。而且windows系统文件路径过长会报错。

![npm2.x依赖树图](https://s.poetries.work/cos/202203251206573.png)

* npm3.x  
在 3.X 版本，npm 团队就对生成依赖树的方式进行了优化：将原有的循环遍历的方式改成了更为扁平的层级结构，将依赖进行平铺（扁平化）。

  * 原理：
  在生成依赖树的时候，首先会遍历所有的依赖并将其放入树的第一层节点，然后再继续遍历每一个依赖。当有重复的模块时，如果依赖版本相同，就丢弃不放入依赖树中。如果依赖版本不一致，那么就将其放在该依赖下。

  ![有可能是这种](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c7ab9c6706b44930b4ee87fc6fbb66a6~tplv-k3u1fbpfcp-zoom-in-crop-mark:3326:0:0:0.awebp?)
  ![也有可能是这种](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/97f08391827f47b991b49eaa47fa2615~tplv-k3u1fbpfcp-zoom-in-crop-mark:3326:0:0:0.awebp?)
  * 结论：所以，在 npm 3.X 版本中，虽然将生成依赖树的方式由无脑的循环遍历改为了平铺的方式，但是会因为依赖的先后顺序不同而导致安装的依赖结果不同。

* npm5.x  
为了解决 3.x 版本安装的不确定性问题，同时还会有一个风险就是在不同时机可能安装依赖的版本不同（比如我们常见到的在版本号前加 ^ 符号，就只会匹配最大版本的依赖包，自动升级小版本），所以在 npm 5.X 版本中新增了 `package-lock.json` 锁文件。  
同时，在项目中使用 package-lock.json 还可以减少安装时间。因为在 package-lock.json 锁文件中已经存放了每个包具体的版本信息和下载链接，这就不需要再去远程仓库进行查询，优先会使用缓存内容从而减少了大量的网络请求，并且对于弱网环境和离线环境更加友好。
![lock文件结构图](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6bb617bc1b3b4e338eb2cac1b59b6e9d~tplv-k3u1fbpfcp-zoom-in-crop-mark:3326:0:0:0.awebp?)

## npm缓存原理？
使用`npm config get cache`查看缓存位置，缓存`_cache`目录下会有`conteng-v2` 和 `index-v5`目录。

* 在安装资源的时候，npm 会根据 lock 中的 integrity、version、name 信息生成一个唯一的 key。
* 然后用这个 key 经过 SHA256 算法生成一个 hash，根据这个 hash 在 index-v5 中找到对应的缓存文件，该缓存文件中记录着该包的信息。
* 根据该文件中的信息我们在 content-v2 中去找对应的压缩包，这样就找到了对应的缓存资源了。
* 最后再将该压缩包解压到 node_modules 中，节省了网络开销和安装时间，完美！

## npm 如何检查资源的完整性？

## npm开发中的实践？
* 不同的 npm 版本的安装流程会有所不同，我们尽量使用 npm v5.7 以上版本（因为 package-lock.json 生成逻辑 在 5.0 - 5.6 版本中有过几次更新，npm 5.6 以上才逐渐稳定)。

* 建议在项目中使用 package-lock.json 文件，并将其提交到远端仓库，从而提升依赖安装时间以及安装包的稳定性。

* 创建项目的时候使用 npm install 安装依赖，在提交代码的时候将 package.json、package-lock.json 提交到远端仓库，同时 ignore掉 node_modules文件。

* 其他成员在 clone 过代码之后执行 npm install 安装依赖，npm 会根据 package.json 和 package-lock.json 文件一起确定 node_modules 文件。

* 升级依赖使用 npm 命令安装\更新\删除依赖，此时 package-lock.json 文件会一同修改。然后将 package.json 文件和 package-lock.json 文件一起提交到远端仓库。

* 在远端的 package.json 文件和 package-lock.json 文件更新后，其他成员应该拉取最新的代码并执行 npm install 更新依赖。

* 如果 package-lock.json 文件冲突，应该先手动解决 package.json 的冲突，然后执行 npm install --package-lock-only，让 npm 自动帮你解冲突。可以参考 官方推荐做法。

## npm脚本？
> npm 允许在`package.json`文件里面，使用`scripts`字段定义脚本命令。package.json 里面的scripts 字段是一个对象。它的每一个属性，对应一段脚本。定义在package.json里面的脚本，就称为 npm 脚本。

查看当前项目的所有 npm 脚本命令，可以使用不带任何参数的`npm run`命令。

* 使用：
  * `npm run 脚本名称`

  * 如果是并行执行（即同时的平行执行），可以使用&符号。 `npm run script1.js & npm run script2.js`
  * 如果是继发执行（即只有前一个任务成功，才执行下一个任务），可以使用&&符号。`npm run script1.js && npm run script2.js`

* 简写：
  * npm start 即 npm run start
  * npm stop 即 npm run stop
  * npm test 即 npm run test
  * npm restart 即 npm run stop && npm run restart && npm run start

## `npx是什么？`
> npm 从5.2版开始，增加了 npx 命令.  
2个核心功能  
1. 调用项目安装的模块（默认调用必须在script字段中或者项目脚本中）例如：
```$ node-modules/.bin/mocha --version``` 现在只需要```$ npx mocha --version``` 即可

2. 避免全局安装模块 (如果没有该模块，就临时下载，使用后会自动删除)  
详细查看 [阮一峰npx文章](https://www.ruanyifeng.com/blog/2019/02/npx.html)

## `npm run xxx的原理？`
https://juejin.cn/post/7078924628525056007

总结

* 运行 npm run xxx的时候，npm 会先在当前目录的 node_modules/.bin 查找要执行的程序，如果找到则运行；
* 没有找到则从全局的 node_modules/.bin 中查找，npm i -g xxx就是安装到到全局目录；
* 如果全局目录还是没找到，那么就从 path 环境变量中查找有没有其他同名的可执行程序。

## `npm link的作用？`
