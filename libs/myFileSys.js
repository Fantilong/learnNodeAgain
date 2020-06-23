/*
 * @Author: your name
 * @Date: 2020-06-23 15:21:19
 * @LastEditTime: 2020-06-23 16:22:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /learnNodeAgain/libs/myFileSys.js
 */
const fs = require('fs');

/**
 * @description: 小文件拷贝
 * @param {URL} 目标路径
 * @param {URL} 源路径
 */
let my_copy_sync = (src, destPath) => {
    //一次性将文件读入到内存中，再一次性写入
    // 问题是：文件过大的话，内存会爆仓
    fs.writeFileSync(destPath, fs.readFileSync(src));
};

/**
 * @description: 大文件拷贝
 * @param {URL} 目标路径
 * @param {URL} 源路径
 */
let my_copy = (src, destPath) => {
    // 蚂蚁搬家式拷贝，读一点，写一点
    fs.createReadStream(src).pipe(fs.createWriteStream(destPath));
};

// 设置导出对象为 copy 函数
module.exports = {
    my_copy,
    my_copy_sync
};