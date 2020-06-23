/*
 * @Author: your name
 * @Date: 2020-06-23 15:21:19
 * @LastEditTime: 2020-06-23 15:56:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /learnNodeAgain/libs/myFileSys.js
 */
const fs = require('fs');

/**
 * @description: 复制文件
 * @param {URL} 要复制到目标路径
 * @param {URL} 要被赋值的文件路径
 */
let my_copy_sync = (src, destPath) => {
    fs.writeFileSync(destPath, fs.readFileSync(src)); // 同步读取 与 写入
};

// 设置导出对象为 copy 函数
module.exports = my_copy_sync;