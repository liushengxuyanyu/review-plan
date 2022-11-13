NVM源码地址：https://github.com/nvm-sh/nvm

## nvm介绍
Node 版本管理器是一个用于管理多个已发布的 Node.js 不同版本的 bash 脚本。它允许你执行诸如“安装”、“卸载”以及“版本切换”等诸多功能。

---
## 卸载node
使用nvm管理，最好之前先把node卸载掉。
> 卸载从node官网下载pkg安装的node
```bash
$ sudo rm -rf /usr/local/{bin/{node,npm},lib/node_modules/npm,lib/node,share/man/*/node.*}
```
> 卸载用 homebrew 安装的node
```bash
$ brew uninstall node
```

---
## 安装
```bash
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```
> 安装过程中如果遇到如下错误的话，则需要把电脑中生成的公钥配置到githup的SSH-KEYS中。
```bash
$ fatal: unable to access 'https://github.com/xxx/xxx.git/': LibreSSL SSL_connect: SSL_ERROR_SYSCALL in connection to github.com:443 
```

> 当出现以下信息说明已经自动安装到全局变量中
```bash
$ export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```
> 刷新使全局生效

 取决于 mac下装了哪种shell。很多人的 mac 中会使用 zsh 而不是 bash，一大半是因为 oh-my-zsh 这个配置集，它兼容 bash，还有自动补全等好用的功能。  
 **bash**：
```bash
$ source ~/.bashrc
```
**zsh**：
```bash
$ source ~/.zshrc
```
> 验证一下
```bash
$ command -v nvm
nvm
```

## 例子
```bash
$ nvm use 16
Now using node v16.9.1 (npm v7.21.1)
$ node -v
v16.9.1
$ nvm use 14
Now using node v14.18.0 (npm v6.14.15)
$ node -v
v14.18.0
$ nvm install 12
Now using node v12.22.6 (npm v6.14.5)
$ node -v
v12.22.6
```

## 常用命令
安装指定版本node
```bash
$ nvm install 16
```
删除某个版本
```bash
$ nvm uninstall 16
```
使用某个版本
```bash
$ nvm use 14
Now using node v14.20.1 (npm v6.14.17)
```
查看已安装node版本列表
```bash
$ nvm list
```
查看当前使用的node版本
```bash
$ nvm current
v16.17.1
```
查看node远程已经发布的版本
```bash
$ nvm ls-remote
```
使用指定版本来运行应用
```bash
$ nvm run 16 app.js
```