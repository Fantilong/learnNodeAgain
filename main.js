/*
 * @Author: your name
 * @Date: 2020-06-23 15:17:02
 * @LastEditTime: 2020-06-23 16:06:10
 * @LastEditors: Please set LastEditors
 * @Description: 项目主模块，
 * @FilePath: /learnNodeAgain/main.js
 */
// 载入文件模块
const { my_copy_sync: my_copy_sync } = require('./libs');

// 使用进程获取控制台参数
var param = process.argv.slice(2);
//  执行复制函数
my_copy_sync(param[0], param[1]);

/* 
process 是一个全局变量，类似 __dirname 和 __dirpath 
process.argv 获取命令行参数，
process.argv[0] 固定等于 NodeJS 执行程序的绝对路径，就是 node 所在的路径，
process.argv[1] 固定等于主模块的绝对路径，就是 main.js 的位置
因此第一个命令行参数从 process.argv[2]这个位置开始
*/