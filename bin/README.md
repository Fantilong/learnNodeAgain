<!--
 * @Author: your name
 * @Date: 2020-06-22 20:31:12
 * @LastEditTime: 2020-06-23 11:41:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /learnNodeAgain/bin/README.md
--> 
# 存放命令行相关的代码
在Linux系统下，把JS文件当做Shell脚本来运行，要通过在 #! 注释来指定单签脚本使用的解释器。例如：将该路径下的.JS文件当做Shell脚本运行，需要在头部指定解释器，添加注释（#! /user/bin/env node）即：该.js文件的解释器是 **nodeJS**

## 实现一个命令行程序
使用NodeJS编写的东西，要么是一个包，要么是一个命令行程序。包可以用来开发命令行程序，命令行程序可以用来操作系统。原理是NodeJS内置C语言库，可以用操作系统。例如：我们要用NodeJS写一个程序，需求如下：</br>
> node /home/user/bin/node-echo.js hello world</br>
> hello world

分析：使用 node 命令，执行特定路径下的 node-echo.js 文件，参数是 hello world。然后控制台输出参数 hello world

但是这种方式看起来不像一个命令行程序，下面这种才是我们期待的方式
> node-echo hello world

分析1：先要找到 node-echo 命令</br>
问题：系统中没有 node-echo 命令</br>
解决方案：在系统命令路径下新增软链接指向我们特定的 node-echo.js 文件，</br>

分析2：获取参数 hello world，在 node-echo.js 中获取控制台键入的参数 hello world</br>
问题：怎么获取参数 hello world</br>
解决方案：三方包 argv 可以获取 控制台键入的参数 hello world</br>

* 代码如下:
```
/* bin/node-echo */
var argv = require('argv'),// 载入参数读取模块（三方模块）
    echo = require('../lib/echo');// 载入输出模块(文件模块)
console.log(echo(argv.join(' ')));// 调用输出模块,传入三方模块获取的参数

/* lib/echo.js */
module.exports = function (message) {// 设置导出模块是一个函数
    return message;
};

/* package.json */
{
    "name": "node-echo",// 设置入口模块名是 node-echo
    "main": "./lib/echo.js"// 设置入口模块
}
```









