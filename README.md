<!--
 * @Author: your name
 * @Date: 2020-06-22 20:24:24
 * @LastEditTime: 2020-06-23 15:00:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /learnNodeAgain/bin/README.md
--> 
# 重新学习NodeJS基础知识
## NodeJS基础
### 什么是NodeJS
计算机编程语言分为**解释性语言**和**编译型语言**，例如：Java就是编译型语言，需要先编译，再执行，而JS是解释性语言，是一边编译一边执行，，在Java中有 javac 做编译器，JVM 来具体执行，
JS 需要一个**解释器**才能运行，在网页中的JS，浏览器充当了解释器的角色，而对于需要独立运行的JS，NodeJS是一个好的选择。
> 答案：NodeJS是JavaScript在计算机中独立运行的解释器，充当上层程序与下层程序之间的转化桥梁

每种*解释器*都是一个运行环境，不仅允许JS定义各种数据结构，进行各种计算，还允许JS使用运行环境提供的，例如：在浏览器中的JS可以操作`DOM`、`DOM`，因为浏览器提供了`document`之类的内置对象，
而NodeJS中的JS的用途是操作磁盘文件或搭建HTTP服务器，那NodeJS就响应的提供了`fs`、`http`等内置对象
### 能干什么
简单的可以将JS当做命令使，复杂能编写工具提升工作效率

## node中的模块概念
在编写稍大一点的程序时，会将代码*模块化*。将应用于不同场景的功能，拆分到不同的文件中。这样每一个文件就是一个模块，文件路径就是模块名。nodeJS也是一样，不过nodeJS在解析每个文件时，都会添加三个变量到解析到的文件对象中。
> require 

该变量指向一个函数，该函数的作用是：在当前模块加和使用别的模块，需要的参数是模块名，返回一个模块导出对象，(后面的另一个变量 `exports` 就是 `模块导出对象`)模块名可以是**相对路径** 或 **绝对路径**，模块名中的.js扩展名可以省略。因为NodeJS在模块加载时会按`.js``.node``.json`的次序补足扩展名，一次尝试。
> exports

上文中说道，使用`require`函数导入的模块，会返回一个模块导出对象。exports就是这个导出对象，用于导出模块公有的方法和属性。
> module

该变量可以访问到当前模块的一些相关信息，可以理解成`module`就是文件本身，`exports`是`module`下的一个属性。
### 模块初始化
一个模块中的JS代码仅在模块 `第一次被使用时执行一次`，并在执行过程中初始化为模块的到导出对象，然后就`缓存起来`,这个缓存起来的导出对象可以被重复利用。在nodeJS中一般会分为主模块与其他模块
> 主模块

通过`命令行参数`传给NodeJS用以启动程序的模块被称为`主模块`,主模块负责 *调度*组成*整个程序*的其他*模块*完成工作。

> 二进制模块

我们这里不是说的JS吗？怎么又扯到二进制模块了，这是因为JS是上层编程语言，上层编程语言计算机是无法直接执行。需要编译成计算机可读的二进制文件。文件模块/核心模块 > 内建模块(C语言写的模块) > 汇编语言 > 微指令 = 计算机执行。这里说的`二进制模块`是指，NodeJS支持直接执行`C语言`编写的模块。PS: 除非你特牛，否则轻易不要使用二进制模块。
## NodeJS中的代码组织与部署
任何一个软件工程项目在开工前，首先需要准备好的是代码的目录结构和部署方式。如同修房子要先搭脚手架。
### nodeJS 中的模块路径解析规则

1、对于**内置模块**: 不做路径解析，直接返回内部模块的导出对象</br>
2、对于**三方模块**: NodeJS定义了一个特殊的目录`node_module`用于存放三方模块.例如有个模块绝对路径是 `/home/user/hello.js`,在该模块中使用**require('foo/bar')**,则NodeJS会一次尝试使用以下路径。
> /home/user/node_modules/foo/bar</br> 
> /home/node_modules/foo/bar</br>
> /node_modules/foo/bar</br>
> ** 根据当前模块的路径向上回溯，找node_modules路径

3、对于`NODE_PATH`环境变量: NodeJS允许通过`NODE_PATH`环境变量来指定额外的模块搜索路径，NODE_PATH环境变量中包含一到多个目录路径，路径之间在linux下使用`:`分隔，在windows下使用`;`分隔，例如定义了以下NODE_PATH环境变量：
> NODE_PATH=/home/user/lib:/home/lib

当使用`使用require('foo/bar)`的方式加载模块时，则NodeJS一次尝试以下路径
> /home/user/lib</br>
> /home/lib
> ** 常用于加载全局模块

### NodeJS中的包概念（package）
JS模块的基本单位是单个JS文件，但复杂的模块往往由多个子模块组成，为了便于管理和使用，我们将由多个 `子模块`组成的 `大模块`称作 `包`，并把所有子模块放在同一个目录里。
* 包入口模块

组成包的所有子模块中需要有一个入口模块，入口模块的导出对象被作为包的导出对象，入口模块名，常用index命名。
入口模块的导出对象，其属性就是包中的子模块，入口模块完全是为了集成，在其他模块中多次引入子模块。而且NodeJS导入包时，可以只写index所在的路径，NodeJS会默认引入该路径下的index.js文件。
* package.json文件

自定义入口模块的文件名和存放位置，可以使用`package.json`文件，并在其中指定入口模块的路径。用于设定的属性如下：
```
{
    "name": "cat",
    "main": "./lib/main.js"
}
```
### NodeJS中工程目录

```
learnNodeAgain           # 工程目录
    .
    ├── README.md        # 工程说明文档
    ├── bin              # 存放命令行相关代码
    │   └── README.md    # 路径功能说明文档（可放可不放）
    ├── doc              # 存放文档
    │   └── README.md    # 路径功能说明文档（可放可不放）
    ├── libs             # 存放API相关代码
    │   └── README.md    # 路径功能说明文档（可放可不放）
    ├── node_modules     # 存放三方包
    │   └── README.md    # 路径功能说明文档（可放可不放）
    ├── package.json     # 元数据文件（说明了项目，在编码角度的需求，主要是npm需要）
    └── tests            # 存放测试用例
        └── README.md    # 路径功能说明文档（可放可不放）
```
### NPM（NodeJS Package Manager）
随同NodeJS一起安装的包管理工具，能解决NodeJS代码部署上的很多问题，常用场景如下：
* 允许用户从NPM服务器下载别人编写的三方包到本地使用
* 允许用户从NPM服务器下载并安装别人编写的命令行到本地使用
* 允许用户将自己编写的包或命令行程序上传到NPM服务器供别人使用

#### 下载三方包
> npm install argv

下载好的 `argv` 包就放在工程目录的 `node_modules` 目录中，因此在代码中只需要通过 `require('argv')` 就可以了，以上命令默认下载最新版的三方包，如果想下载指定版本，可以在包后面加上 `包名@<version>`,例如：下载 0.0.1半的 `argv`。
> npm install argv@0.0.1

#### 一行命令下载多个三方包
NPM对 `package.json` 的字段做了扩展，允许在其中申明三方包依赖。使用其中 dependencies 属性：说明工程需要的包依赖
```
{
    "name": "node-echo",
    "main": "./lib/echo.js",
    "dependencies": {
        "argv": "0.0.2"
    }
}
```
> npm install

* 这样使用命令 npm install，npm会检索 package.json 中的 dependencies 属性中定义的包依赖及其版本。
* 同时也会检索三包依赖，其包本身需要的其他包依赖，也会一并下载。这样好处在于用户只需要关心自己项目需要的包依赖就行了。

#### 安装命令行程序
> npm install node-echo -g

-g 表示全局安装，程序包会默认安装到以下位置，并且NPM自动会创建好Linux系统下需要的软链接文件或Windows系统下需要的.cmd文件
```
- /usr/local/               # Linux系统下
    - lib/node_modules/
        + 包位置/
        ...
    - bin/
        软链接
        ...
    ...

- %APPDATA%\npm\            # Windows系统下
    - node_modules\
        + 包位置\
        ...
    node-echo.cmd
    ...
```
#### 发布代码
   1. 注册NPM账号，终端运行 `npm adduser` ,按提示做即可
   2. 编辑 `package.json` 文件，加入 `NPM`必需的字段
   ```
   {
        "name": "node-echo",           # 包名，在NPM服务器上须要保持唯一
        "version": "1.0.0",            # 当前版本号
        "dependencies": {              # 三方包依赖，需要指定包名和版本号
            "argv": "0.0.2"
        },
        "main": "./lib/echo.js",       # 入口模块位置
        "bin" : {
            "node-echo": "./bin/node-echo"      # 命令行程序名和主模块位置
        }
    }
   ```
   3. 在 `package.json` 所在目录下运行 `npm  publish` 命令发布代码

   > PS:版本号的语义：1.0.0 -> X.Y.Z</br>
   > X: 大变动，向下不兼容，需要更新X位</br>
   > Y: 新增功能，向下兼容，需要更新Y位</br>
   > Z: 修复Bug，需要更新Z位</br>




















