/*
 * @Author: your name
 * @Date: 2020-06-23 15:17:02
 * @LastEditTime: 2020-06-26 11:04:44
 * @LastEditors: Please set LastEditors
 * @Description: 项目主模块，
 * @FilePath: /learnNodeAgain/main.js
 */
// 载入文件模块
const {
    myFileSys: {
        my_copy_sync: my_copy_sync,
        my_copy: my_copy,
        travel: travel,
        travel_sync: travel_sync
    }
} = require('./libs');

// 使用进程获取控制台参数
var param = process.argv.slice(2);
// 执行复制函数
// my_copy_sync(param[0], param[1]); // 小文件拷贝
// my_copy(param[0], param[1]); //大文件拷贝

// travel_sync(param[0], result => {
//     console.log(result);
//     // 文件处理
// });

travel(param[0], (file_path, callback) => {
    console.log(file_path);
    callback();
});

/* 
fs.createReadStream 创建一个源文件的只读数据流
fs.createWriteStream 创建一个目标文件的只写数据流
使用 pipe 方法把两个数据流连接起来
*/