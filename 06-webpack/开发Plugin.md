## Plugin
从形态上webpack插件就是一个实现`apply`方法的类。Webpack 在启动时会调用插件对象的 `apply` 函数，并以参数方式传递核心对象 `compiler` ，以此为起点，插件内可以注册 `compiler` 对象及其子对象的钩子(`Hook`)回调
```js
  class SomePlugin {
    apply(compiler) {
      compiler.hooks.thisCompilation.tap("SomePlugin", (compilation) => {
        compilation.addModule(/* ... */);
      });
    }
  }

```

## Compiler？

全局构建管理器，Webpack 启动后会首先创建 compiler 对象，负责管理配置信息、Loader、Plugin 等。