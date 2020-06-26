/*
 * @Author: your name
 * @Date: 2020-06-23 15:21:19
 * @LastEditTime: 2020-06-26 15:21:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /learnNodeAgain/libs/myFileSys.js
 */
const fs = require('fs');
const path = require('path');
const iconv = require('iconv-lite'); // 读取GBK编码的文本

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
                let file_path = path.join(dir, files[i]); // 拼接路径
                fs.stat(file_path, (err, status) => {
                    if (status.isDirectory()) {
                        // 是目录？递归调用，传入 finish 函数
                        travel(file_path, callback, () => next(i + 1));
                    } else {
                        callback(file_path, () => { next(i + 1) });
                    }
                });
            } else {
                finish && finish(); // 该分支遍历完成，下一个分支
            }
        }(0));
    });
}

/**
 * @description: 读文件时，去除BOM
 * @param {String} 文件路径
 * @return: {String}
 */
function read_text(dir) {
    let bin = fs.readFileSync(dir);

    if (bin[0] === '0xEF' && bin[1] === '0xBB' && bin[2] === '0xBF') {
        bin = bin.slice(3);
    }

    return bin.toString('utf-8');
}


/**
 * @description: 借用三方包 iconv-lite ，读取 GBK 编码的文本文件
 * @param {URL} 文件路径
 * @return: {String} 文本内容
 */
function readGBKText(pathname) {
    var bin = fs.readFileSync(pathname);
    return iconv.decode(bin, 'gbk')
}

// 设置导出对象为 copy 函数
module.exports = {
    my_copy,
    my_copy_sync,
    travel,
    travel_sync,
    read_text
};