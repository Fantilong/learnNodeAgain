<!--
 * @Author: your name
 * @Date: 2020-06-22 20:24:24
 * @LastEditTime: 2020-06-28 10:19:29
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

# 大示例
一个完整的 NodeJS 开发的 Web 服务器示例
## 需求 
一个简单的静态文件合并服务器，该服务器需要支持类似以下格式的 JS 或 CSS 问价 合并请求
```
http://assets.example.com/foo/??bar.js,baz.js
```
在以上 URL 中，`??` 是一个分隔符，`??` 之前是需要合并的多个文件的 URL 公共部分， `??` 之后是使用 `,` 分割的差异部分。因此服务器处理这个 URL 时，返回的是以下 `两个文件` 按顺序 `合并后` 的内容。
```
/foo/bar.js
/foo/baz.js
```
另外，服务业需要能支持类似以下格式的普通的 JS 或 CSS 文件请求
```
http://assets.example.com/foo/bar.js
```
以上就是整个需求

## 第一次迭代
快速迭代是一种不错的开发方式，因此我们再第一次迭代时先实现服务器的基本功能。
### 设计
程序大概解析过程
```
request --> 解析URL, 获取 URL 要求 --> 处理要求 --> 输出 --> 响应
```
1. 分析 URL，得到请求的文件路径 和 类型（MIME）
2. 读取文件，并按顺序合并文件内容
3. 返回响应,完成一次请求的处理

> PS: 服务器在读取文件时需要有个根目录，并且服务器监听的 HTTP 端口最好写不要写死在代码里，因此服务器需要是可配置的
 ### 实现
 ```
 const fs = require('fs'),
     path = require('path'),
     http = require('http');
 const {argv} = require('process');
 
 // 预定义响应内容类型
 let MIME = {
     '.js': 'application/javascript',
     '.css': 'text/css'
 };
 
 function main(argvs) {
     let config = JSON.parse(fs.readFileSync(argvs[0], 'utf-8')),
         root = config.root || '.',
         port = config.port || 5000;
 
     http.createServer((req, res) => {
         let url_info = parse_url(root, req.url);
 
         combine_files(url_info.pathnames, (err, data) => {
             if (err) {
                 res.writeHead(404);
                 res.end(err.message);
             }
 
             res.writeHead(200, {
                 'Content-Type': url_info.mime
             });
             res.end(data);
         });
     }).listen(port);
 }
 
 main(process.argv.slice(2));
 /**
  * @description: 解析 url
  * @param {String} 项目根路径
  * @param {String} 文件相对项目路径
  * @return:
  */
 function parse_url(root, url) {
     /*
     需求：将 多文件请求的 url 路径，解析成 多个 单文件请求的 url 路径，同时支持单文件请求
     例如：
     多文件：/foo/??bar.js,baz.js  /foo/bar/bar.js,baz/baz.js
     变成两个单文件：/foo/bar.js  foo/baz.js
 
     思路：
     1、 统一格式 => /foo/bar.js --> /foo/??bar.js 方便统一解析：
     判定路径中是否有 ?? 这种特定的需要两个文件的标识，
     如果有？则下一步，如果没有？则使用 replace 函数替换，’/‘, '/??'
     2、分割路径与文件名称 /foo/??bar.js,foo.js --> /foo/ bar.js,foo.js
         2.1、分割文件名 bar.js,foo.js --> bar.js foo.js
         2.2、拼接路径
     3、拼接返回数据    
     */
 
     let base, pathnames, parts;
 
     // 1、 统一格式
     if (url.indexOf('??') === -1) {
         url = url.replace('/', '/??');
     }
     // 2、分割路径与文件名称
     parts = url.split('??');
     base = parts[0];
     // 2.1、分割文件名
     pathnames = parts[1].split(',').map(value => {
         // 2.2、拼接路径
         return (root + base + value);
     });
 
     // 响应一个数据说明字段
     // 3、拼接返回数据
     return {
         mime: MIME[path.extname(pathnames[0])] || 'text/plain',
         pathnames: pathnames
     }
 }
 
 /**
  * @description: 合并文件
  * @param {Array} 要合并的文件的路径
  * @callback {Function} 处理错误或结果
  */
 function combine_files(pathnames, callback) {
     /*
     * 需求：串行数组中文件路径中的文件内容，并拼接到一起。
     * 使用回调函数，处理错误和数据
     * 思路：闭包中设一个数据存储容器，用于存读取到的 文件 Buffer，
     * 自执行函数，读取文件，数组长度做结束自执行条件
     * */
     var output = [];
     (function next(i, len) {
         if (i < len) {
             fs.readFile(pathnames[i], (err, data) => {
                 if(err){
                     callback(err);
                 }
                 else {
                     output.push(data);
                     next(i + 1, len);
                 }
             });
         } else {
             callback(null, Buffer.concat(output));
         }
     }(0, pathnames.length));
 }
 ```
 
## 第二次迭代
需求：从程序性能触发，改进代码
### 设计
把 `map` 方法换成 `for` 或许会更快些，但第一版代码最大的性能问题存在于从读取到输出响应的过程当中。
以处理 `/??a.js,b.js,c,js` 这个请求为例
，看看整个处理过程中耗时在哪里。
### 实现
1. 校验了路径
2. 使用 pipe 做readFile做只读数据流，response 对象做只写数据流

## 第三次迭代
### 设计
新增守护进程，让服务挂掉的时候，立即重启服务。利用NodeJS的进程管理机制，将守护进程作为父进程，
将服务器程序作为子进程，并让父进程监控子进程的运行状态。在其异常退出时重启zjc。
### 实现
根据以上设计，守护进程代码如下：
```
/* daemon.js */ 
const child_pro = require('child_process');
let worker;

/*
 * @description:
 * @param
 * @param
 * */
function spawn(server, config){
    console.log("守护进程让服务器进程启动..");
    worker = child_pro.spawn('node', [server, config]);
    worker.on('exit', code => {
        console.log("守护进程监控到服务器进程退出");

        if(code !== 0){
            console.log("守护进程监控到服务器进程退出码不等于0，重启服务器进程");
            spawn(server, config);
        }
    });
}

/*
 * @description:
 * @param 
 * */
 function main(argvs){
    spawn('main.js', argvs[0]);
     process.on('SIGTERM', () => {
         console.log("守护进程收到通信，向服务器进程通信");
         worker.kill();
         process.exit(0);
     });
 }

main(process.argv.slice(2));

/* main.js */ 
const http = require('http');
const fs = require('fs');
const {parse_url, combine_files, validateFiles, outputFiles} = require('./libs/common');


function main(argvs) {
    let config = JSON.parse(fs.readFileSync(argvs[0], 'utf-8')),
        root = config.root || '.',
        port = config.port || 5000,
        server;

    server = http.createServer((req, res) => {
        let url_info = parse_url(root, req.url);

        validateFiles(url_info.pathnames, (err, pathnames) => {
            if(err) {
                res.writeHead(404);
                res.end(err.message);
                return;
            }

            res.writeHead(200, {
                'Content-Type': url_info.mime
            });
            outputFiles(pathnames, res);
        });
    }).listen(port);

    process.on('SIGTERM', () => {
        console.log("服务器进程收到通信消息");
        server.close(() => {
            console.log("服务器进程停止，回调函数设置服务器进程退出码为0");
            process.exit(0);
        });
    });
}

main(process.argv.slice(2));
```
## 第四次迭代
### 设计
### 实现