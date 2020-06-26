<!--
 * @Author: your name
 * @Date: 2020-06-26 09:20:31
 * @LastEditTime: 2020-06-26 09:20:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /learnNodeAgain/libs/process概念.md
--> 
/* 
process 是一个全局变量，类似 __dirname 和 __dirpath 
process.argv 获取命令行参数，
process.argv[0] 固定等于 NodeJS 执行程序的绝对路径，就是 node 所在的路径，
process.argv[1] 固定等于主模块的绝对路径，就是 main.js 的位置
因此第一个命令行参数从 process.argv[2]这个位置开始
*/
