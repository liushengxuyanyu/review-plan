### vscode插件
`TypeScript Importer` 这一插件会收集你项目内所有的类型定义，在你敲出:时提供这些类型来进行补全。如果你选择了一个，它还会自动帮你把这个类型导入进来。

`Move TS` 这一插件在重构以及像我们这样写 demo 的场景下很有帮助。它可以让你通过编辑文件的路径，直接修改项目的目录结构。

`Error Lens` 这一插件能够把你的 VS Code 底部问题栏的错误下直接显示到代码文件中的对应位置。

### 打造执行环境
如果你主要是想执行 TypeScript 文件，就像 node index.js 这样快速地验证代码逻辑，这个时候你就需要 ts-node 以及 ts-node-dev 这一类工具了。它们能直接执行 ts 文件，并且支持监听文件重新执行。同时，它们也支持跳过类型检查这一步骤来获得更快的执行体验。

对于 ts-node，你可以将其安装到项目本地或直接全局安装，我个人更推荐安装到全局然后配置 alias 快速启动，像 tsn index.ts 这样。执行以下命令将 ts-node 与 typescript 安装到全局：
全局安装 `$ npm i ts-node typescript -g`

然后，在项目中执行以下命令创建 TypeScript 的项目配置文件： tsconfig.json。

`npx typescript --init`
// 如果全局安装了 TypeScript，可以这么做
`tsc --init`
接着，创建一个 TS 文件：

console.log("Hello TypeScript");
再使用 ts-node 执行：

`ts-node index.ts`