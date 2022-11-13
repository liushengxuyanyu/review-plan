### 一口气了解babel（文章较老）
https://zhuanlan.zhihu.com/p/43249121

## babel
Babel 是一个 JavaScript 编译器

## babel核心库
核心库 @babel/core

## babel插件的使用
如果插件发布在 `npm` 上，可以直接填写插件的名称， `Babel` 会自动检查它是否已经被安装在 `node_modules` 目录下，在项目目录下新建 `.babelrc` 文件 (下文会具体介绍配置文件)，配置如下：
```json
//.babelrc
{
    "plugins": ["@babel/plugin-transform-arrow-functions"]
}
```

## 预设preset
上边只是其中一个转换箭头函数的插件，如果要转换`ES6+`等，需要设置很多从插件，但可以通过官方提供的`预设`可以简化`babel`插件的配置。

## @babel/preset-env（预设）
`@babel/preset-env` 主要作用是对我们所使用的并且目标浏览器中缺失的功能进行代码转换和加载 `polyfill`，在不进行任何配置的情况下，`@babel/preset-env`所包含的插件将支持所有最新的JS特性(ES2015,ES2016等，不包含 stage 阶段)，将其转换成ES5代码。例如，如果你的代码中使用了可选链(目前，仍在 stage 阶段)，那么只配置 `@babel/preset-env`，转换时会抛出错误，需要另外安装相应的插件。
```json
//.babelrc
{
    "presets": ["@babel/preset-env"]
}
```

## .browserslistrc
`@babel/preset-env` 会根据你配置的目标环境，生成插件列表来编译。对于基于浏览器或 Electron 的项目，官方推荐使用 `.browserslistrc` 文件来指定目标环境。默认情况下，如果你没有在 Babel 配置文件中(如 `.babelrc`)设置 `targets` 或 `ignoreBrowserslistConfig`，`@babel/preset-env` 会使用 `browserslist` 配置源。
如果你不是要兼容所有的浏览器和环境，推荐你指定目标环境，这样你的编译代码能够保持最小。
例如，仅包括浏览器市场份额超过0.25％的用户所需的 `polyfill` 和代码转换（忽略没有安全更新的浏览器，如 IE10 和 BlackBerry）:
```json
//.browserslistrc
> 0.25%
not dead
```
例如，你将 `.browserslistrc` 的内容配置为:
`last 2 Chrome versions`
你会发现箭头函数不会被编译成ES5，因为 chrome 的最新2个版本都能够支持箭头函数。

## @babel/polyfill（垫片）
`@babel/polyfill` 模块包括 `core-js` 和一个自定义的 `regenerator runtime` 模块，可以模拟完整的 ES2015+ 环境, 可以使用`Promise`、`Map`、等内置组件或者静态、实例方法等新功能。

安装：注意：不使用 `--save-dev`，因为这是一个需要在源码之前运行的垫片。
`npm install --save @babel/polyfill`

使用
```js
import '@babel/polyfill';

const isHas = [1,2,3].includes(2);

const p = new Promise((resolve, reject) => {
    resolve(100);
});

```