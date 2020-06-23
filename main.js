/*
 * @Author: your name
 * @Date: 2020-06-23 15:17:02
 * @LastEditTime: 2020-06-23 16:58:04
 * @LastEditors: Please set LastEditors
 * @Description: 项目主模块，
 * @FilePath: /learnNodeAgain/main.js
 */
// 载入文件模块
const {
    myFileSys: {
        my_copy_sync: my_copy_sync,
        my_copy: my_copy,
    }
} = require('./libs');

// 使用进程获取控制台参数
var param = process.argv.slice(2);
// 执行复制函数
// my_copy_sync(param[0], param[1]); // 小文件拷贝
my_copy(param[0], param[1]); //大文件拷贝

/* 
process 是一个全局变量，类似 __dirname 和 __dirpath 
process.argv 获取命令行参数，
process.argv[0] 固定等于 NodeJS 执行程序的绝对路径，就是 node 所在的路径，
process.argv[1] 固定等于主模块的绝对路径，就是 main.js 的位置
因此第一个命令行参数从 process.argv[2]这个位置开始
*/

/* 
fs.createReadStream 创建一个源文件的只读数据流
fs.createWriteStream 创建一个目标文件的只写数据流
使用 pipe 方法把两个数据流连接起来
*/

/* 

*/