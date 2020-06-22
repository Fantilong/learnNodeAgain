<!--
 * @Author: your name
 * @Date: 2020-06-22 20:24:24
 * @LastEditTime: 2020-06-22 21:10:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /learnNodeAgain/bin/README.md
--> 
# 重新学习NodeJS基础知识
## NodeJS基础
### 什么是NodeJS
计算机编程语言分为**解释性语言**和**编译型语言**，例如：Java就是编译型语言，需要先编译，再执行，而JS是解释性语言，是一边编译一边执行，，在Java中有 javac 做编译器，JVM 来具体执行，
JS 需要一个**解释器**才能运行，在网页中的JS，浏览器充当了解释器的角色，而对于需要独立运行的JS，NodeJS是一个好的选择。
> * 答案：NodeJS是JavaScript在计算机中独立运行的解释器，充当上层程序与下层程序之间的转化桥梁
每种*解释器*都是一个运行环境，不仅允许JS定义各种数据结构，进行各种计算，还允许JS使用运行环境提供的，例如：在浏览器中的JS可以操作`DOM`、DOM`，因为浏览器提供了`document`之类的内置对象，
而NodeJS中的JS的用途是操作磁盘文件或搭建HTTP服务器，那NodeJS就响应的提供了`fs`、`http`等内置对象
### 能干什么
简单的可以将JS当做命令使，复杂能编写工具提升工作效率

## 规划工程目录