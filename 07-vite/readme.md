## vite?
* Vite 是 Vue 框架的作者尤雨溪最新推出的基于 Native-ESM 的 Web 构建工具。

* 在开发环境下基于 `Native-ESM 处理构建过程，只编译不打包`，在生产环境下则基于 `Rollup 打包`

---
## vite浏览器支持？
默认的构建目标是能支持 
* `原生 ESM 语法的 script 标签`
* `原生 ESM 动态导入`
* `import.meta` 的浏览器。
* 传统浏览器可以通过官方插件 `@vitejs/plugin-legacy` 支持。

---
## no-bundle 构建原理?
* 它的构建方式是：
  * 在构建时只需处理模块的编译而无须打包，把模块间的相互依赖关系完全交给浏览器来处理。
  * 浏览器会加载入口模块，分析依赖后，再通过网络请求加载被依赖的模块。

---
## vite的使用限制？
* 面向支持 ES6 的现代浏览器，在生产环境下，编译目标参数 esBuildTarget 的默认值为 es2019，最低支持版本为 es2015（因为内部会使用 esbuild 处理编译压缩，用来获得最快的构建速度）。

* 对 Vue 框架的支持目前仅限于最新的 Vue 3 版本，不兼容更低版本。

---
## vite能完全代替webpack吗？
* 从产生定位来看：
  * webpack core 是一个纯打包工具（对标 Rollup），
  * 而 Vite 其实是一个更上层的工具链方案，对标的是 （webpack + 针对 web 的常用配置 + webpack-dev-server）。