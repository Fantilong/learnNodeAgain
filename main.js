/*
 * @Author: your name
 * @Date: 2020-06-23 15:17:02
 * @LastEditTime: 2020-06-23 15:58:11
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