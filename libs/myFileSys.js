/*
 * @Author: your name
 * @Date: 2020-06-23 15:21:19
 * @LastEditTime: 2020-06-26 11:11:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /learnNodeAgain/libs/myFileSys.js
 */
const fs = require('fs');
const path = require('path');

/**
 * @description: 小文件拷贝 
 * @param {URL} 源路径
 * @param {URL} 目标路径
 */
let my_copy_sync = (src, dest) => {
    //一次性将文件读入到内存中，再一次性写入
    // 问题是：文件过大的话，内存会爆仓
    fs.writeFileSync(destPath, fs.readFileSync(src));
};

/**
 * @description: 大文件拷贝
 * @param {URL} 源路径
 * @param {URL} 目标路径
 */
let my_copy = (src, dest) => {
    // 蚂蚁搬家式拷贝，读一点，写一点
    fs.createReadStream(src).pipe(fs.createWriteStream(destPath));
};

/**
 * @description: 同步遍历目录
 * @param {String} 
 * @callback: 回调函数，处理遍历后的结果
 */
function travel_sync(dir, callback) {
    // 同步读取路径，返回该路径下的所有文件名。数组
    fs.readdirSync(dir).forEach(file => {
        // 拼接文件路径
        let file_path = path.join(dir, file);

        // 如果是一个目录，则向下遍历;否则处理目录
        if (fs.statSync(file_path).isDirectory()) {
            travel(file_path, callback);
        } else {
            callback(file_path);
        }
    });
}

/**
 * @description: 异步遍历目录
 * @param {String} 
 * @callback: 回调函数，处理遍历后的结果
 * @param {String} 
 */
function travel(dir, callback, finish) {
    // 异步读取路径，返回该路径下的所有文件名。数组
    fs.readdir(dir, (err, files) => {
        (function next(i) {
            if (i < files.length) {
                let file_path = path.join(dir, files[i]);
                fs.stat(file_path, (err, status) => {
                    if (status.isDirectory()) {
                        travel(file_path, callback, () => next(i + 1));
                    } else {
                        callback(file_path, () => { next(i + 1) });
                    }
                });
            } else {
                finish && finish(); // 遍历完成后执行
            }
        }(0));
    });
}

// 设置导出对象为 copy 函数
module.exports = {
    my_copy,
    my_copy_sync,
    travel,
    travel_sync
};