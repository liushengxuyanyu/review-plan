[webpack loader实战](https://juejin.cn/post/7135097908763820063)

## `开发loader - 签名函数？`
```js
  module.exports = function(source, sourceMap?, data?) {
    return source;
  };
```

* `Loader 接受的三个参数：`
  * source：资源输入，对于第一个执行的 Loader 为资源文件的内容；后续执行的 Loader 则为前一个 Loader 的执行结果，可能是字符串，也可能是代码的 AST 结构；

  * sourceMap: 可选参数，代码的 sourcemap 结构；

  * data: 可选参数，其它需要在 Loader 链中传递的信息，比如 `posthtml/posthtml-loader` 就会通过这个参数传递额外的 AST 对象。

> 其中 `source` 是最重要的参数，大多数 Loader 要做的事情就是将 source 转译为另一种形式的 output ，比如 `webpack-contrib/raw-loader` 的核心源码：
```js
//... 
export default function rawLoader(source) {
  // ...
  const json = JSON.stringify(source)
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');

  const esModule =
    typeof options.esModule !== 'undefined' ? options.esModule : true;

  return `${esModule ? 'export default' : 'module.exports ='} ${json};`;
}
```
> 这段代码的作用是将文本内容包裹成 JavaScript 模块，例如：
```js
// source
I am liusx

// output
module.exports = "I am liusx"
```

---
## `开发loader - loader类型？`
* `同步 loader` ： return 或调用 this.callback 都是同步返回值

* `异步 loader` ：是用 this.async() 获取异步函数，是用 this.callback() 返回值

* `raw loader` ：默认情况下接受 utf-8 类型的字符串作为入参，若标记 raw 属性为 true ，则入参的类型为二进制数据

* `pitch loader` ： loader 总是从右到左被调用。有些情况下，loader 只关心 request 后面的 元数据(metadata)，并且忽略前一个 loader 的结果。在实际（从右到左）执行 loader 之前，会先从左到右调用 loader 上的 pitch 方法。


---
## `开发loader - 上下文接口`
* `loader上下文接口：` 除了作为内容转换器外，Loader 运行过程还可以通过一些上下文接口，有限制地影响 Webpack 编译过程，上下文接口将在运行 Loader 时以 `this` 方式注入到 Loader 函数：

  * `this.cacheable：`取消loader缓存
  ```js
    module.exports = function(source) {
      this.cacheable(false);
      // ...
      return output;
    };
  ```
  * `this.callback：` 返回多个结果`（eslint-loader）`, 签名如下：
  ```js
    this.callback(
      // 异常信息，Loader 正常运行时传递 null 值即可
      err: Error | null,
      // 转译结果
      content: string | Buffer,
      // 源码的 sourcemap 信息
      sourceMap?: SourceMap,
      // 任意需要在 Loader 间传递的值
      // 经常用来传递 ast 对象，避免重复解析
      data?: any
  );
  ```
  * `this.async：` 返回异步结果`（less-loader）`，签名和callback相同。

  * `this.emitFile：` 在 Loader 中直接写出文件`（file-loader）`

  * `this.addDependency：` 在 Loader 中添加额外依赖`（less-loader）`

  * `处理二进制资源：` 此时只需要添加 export const raw = true 语句即可
  ```js
    export default function loader(source) {/* ... */}
    export const raw = true;
  ```

  * `this.getLogger：` 在 Loader 中处理日志
  ```js
    export default function loader(source) {
      const logger = this.getLogger("xxx-loader");
      // 使用适当的 logging 接口
      // 支持：verbose/log/info/warn/error
      logger.info("information");

      return source;
    }
  ```
---
## `开发loader - 什么是 pitch？`
* 在loader调用的时候，Loader 链条一旦启动之后，需要所有 Loader 都执行完毕才会结束，没有中断的机会 —— 除非显式抛出异常；

* 某些场景下并不需要关心资源的具体内容，但 Loader 需要在 source 内容被读取出来之后才会执行。

> 为了解决这两个问题，Webpack 在 Loader 基础上叠加了 `pitch` 的概念。

Webpack 允许在 Loader 函数上挂载名为 `pitch` 的函数，运行时 `pitch` 会比 `Loader` 本身更早执行，例如：
```js
const loader = function (source){
    console.log('后执行')
    return source;
}

loader.pitch = function(requestString) {
    console.log('先执行')
}

module.exports = loader
```

`Pitch 函数的完整签名：`
```js
  function pitch(
    remainingRequest: string, previousRequest: string, 
    data = {}
  ): void {}

  // remainingRequest : 当前 loader 之后的资源请求字符串；
  // previousRequest : 在执行当前 loader 之前经历过的 loader 列表；
  // data : 与 Loader 函数的 data 相同，用于传递需要在 Loader 传播的信息
```

---
## `开发loader - 工具库?`
> `tips: 涉及到的npm包基本会使用@babel/core、@babel/cli、@babel/preset-env等`

* `schema-utils：` 如果我们开发的loader有额外的配置项，schema-utils 工具库校验用户传入的配置。底层主要依赖于 `ajv`, 这是一个应用广泛、功能强大且性能优异的校验工具
  * 编写配置对象的 Schema 描述
    ```json
    // options.json
    {
      "type": "object",
      "properties": {
        "name": {
          "type": "boolean"
        }
      },
      "required": ["name"],
      "additionalProperties": false
    }
    ```
  * 在 Loader 中调用 schema-utils 校验配置对象：
    ```js
      import { validate } from "schema-utils";
      import schema from "./options.json";

      // 调用 schema-utils 完成校验
      export default function loader(source) {
        const options = this.getOptions();
        validate(schema, options);

        return source;
      }

      // Webpack5 之后还可以借助 Loader Context 的 `getOptions` 接口完成校验
      export default function loader(source) {
        const options = this.getOptions(schema);

        return source;
      }
    ```
* `loader-utils：` `webpack5`之后很多`loader-utils`的接口都迁移到了内部的loader context上。
被裁减后的 loader-utils 仅保留了四个接口：

* `urlToRequest：`用于将模块路径转换为文件路径的工具函数；
* `isUrlRequest：`用于判定字符串是否为模块请求路径；
* `getHashDigest：`用于计算内容 Hash 值；
* `interpolateName(常用)：` 用于拼接文件名的模板工具；

---
## `开发loader - 如何测试使用？`
* 编写完loader后（可以利用babel等工具进行转移等），在该`自定义loader`目录下创建一个webpack工程。
```js
// webpack.config.js
module.exports = {
  mode: "development",
  // ...
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          { loader: path.resolve(__dirname, "../dist/index.js") },
          { loader: path.resolve(__dirname, "../dist/logger_loader.js") }
        ],
      }
    ],
  },
};

// npx webpack
```
---
## `开发laoder - 方法论总结？`

* Loader 主要负责将资源内容转译为 Webpack 能够理解、处理的标准 JavaScript 形式，所以通常需要做 Loader 内通过 `return` / `this.callback `方式返回翻译结果；

* `Loader Context` 提供了许多实用接口，我们可以借助这些接口读取上下文信息，或改变 Webpack 运行状态(相当于产生 Side Effect，例如通过 `emitFile` 接口)；

* 假若我们开发的 Loader 需要对外提供配置选项，建议使用 `schema-utils` 校验配置参数是否合法；

* 假若 Loader 需要生成额外的资源文件，建议使用 `loader-utils` 拼接产物路径；

* 执行时，Webpack 会按照 use 定义的顺序从前到后执行 `Pitch Loader`，从后到前执行 Normal Loader，我们可以将一些预处理逻辑放在 `Pitch` 中(如 vue-loader)；等等。

> `阅读其他开原loader的源码！！！`