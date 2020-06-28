const fs = require('fs'),
    path = require('path');

let MIME = {
    '.js': 'application/javascript',
    '.css': 'text/css'
};

/**
 * @description: 解析 url
 * @param {String} 项目根路径
 * @param {String} 文件相对项目路径
 * @return:
 */
function parse_url(root, url) {
    /*
    需求：将 多文件请求的 url 路径，解析成 多个 单文件请求的 url 路径，同时支持单文件请求
    例如：
    多文件：/foo/??bar.js,baz.js  /foo/bar/bar.js,baz/baz.js
    变成两个单文件：/foo/bar.js  foo/baz.js

    思路：
    1、 统一格式 => /foo/bar.js --> /foo/??bar.js 方便统一解析：
    判定路径中是否有 ?? 这种特定的需要两个文件的标识，
    如果有？则下一步，如果没有？则使用 replace 函数替换，’/‘, '/??'
    2、分割路径与文件名称 /foo/??bar.js,foo.js --> /foo/ bar.js,foo.js
        2.1、分割文件名 bar.js,foo.js --> bar.js foo.js
        2.2、拼接路径
    3、拼接返回数据
    */

    let base, pathnames, parts;

    // 1、 统一格式
    if (url.indexOf('??') === -1) {
        url = url.replace('/', '/??');
    }
    // 2、分割路径与文件名称
    parts = url.split('??');
    base = parts[0];
    // 2.1、分割文件名
    pathnames = parts[1].split(',').map(value => {
        // 2.2、拼接路径
        return (root + base + value);
    });

    // 响应一个数据说明字段
    // 3、拼接返回数据
    return {
        mime: MIME[path.extname(pathnames[0])] || 'text/plain',
        pathnames: pathnames
    }
}

/**
 * @description: 合并文件
 * @param {Array} 要合并的文件的路径
 * @callback {Function} 处理错误或结果
 */
function combine_files(pathnames, callback) {
    /*
    * 需求：串行数组中文件路径中的文件内容，并拼接到一起。
    * 使用回调函数，处理错误和数据
    * 思路：闭包中设一个数据存储容器，用于存读取到的 文件 Buffer，
    * 自执行函数，读取文件，数组长度做结束自执行条件
    * */
    var output = [];
    (function next(i, len) {
        if (i < len) {
            fs.readFile(pathnames[i], (err, data) => {
                if (err) {
                    callback(err);
                } else {
                    output.push(data);
                    next(i + 1, len);
                }
            });
        } else {
            callback(null, Buffer.concat(output));
        }
    }(0, pathnames.length));
}

/*
 * @description: 校验路径是否正确
 * @param {Array}
 * @callback {err, Array}
 * */
function validateFiles(pathnames, callback) {
    (function next(i, len) {
        if (i < len) {
            fs.stat(pathnames[i], (err, stats) => {
                if (err) {
                    return callback(err);
                } else if (!stats.isFile()) {
                    return callback(new Error());
                } else {
                    next(i + 1, len);
                }
            });
        } else {
            return callback(null, pathnames);
        }
    }(0, pathnames.length));
}

/*
 * @description: pipe 方式读取与写入
 * @param {Array}
 * @param {WriteStream}
 * */
function outputFiles(pathnames, writeStr) {
    (function next(i, len) {
        if (i < len) {
            let readStr = fs.createReadStream(pathnames[i]);

            readStr.pipe(writeStr, {end: false});
            readStr.on('end', () => {
                next(i + 1, len);
            });
        } else {
            writeStr.end();
        }
    }(0, pathnames.length));
}


module.exports = {
    parse_url: parse_url,
    combine_files: combine_files,
    validateFiles: validateFiles,
    outputFiles: outputFiles
}