/*
 * @Author: your name
 * @Date: 2020-06-23 15:17:02
 * @LastEditTime: 2020-06-28 11:40:49
 * @LastEditors: Please set LastEditors
 * @Description: 项目主模块，
 * @FilePath: /learnNodeAgain/main.js
 */
// 载入文件模块
const fs = require('fs'),
    path = require('path'),
    http = require('http');
const {argv} = require('process');

// 预定义响应内容类型
let MIME = {
    '.js': 'application/javascript',
    '.css': 'text/css'
};

function main(argvs) {
    let config = JSON.parse(fs.readFileSync(argvs[0], 'utf-8')),
        root = config.root || '.',
        port = config.port || 5000;

    http.createServer((req, res) => {
        let url_info = parse_url(root, req.url);

        combine_files(url_info.pathnames, (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end(err.message);
            }

            res.writeHead(200, {
                'Content-Type': url_info.mime
            });
            res.end(data);
        });
    }).listen(port);
}

main(process.argv.slice(2));
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
                if(err){
                    callback(err);
                }
                else {
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
fs.createReadStream 创建一个源文件的只读数据流
fs.createWriteStream 创建一个目标文件的只写数据流
使用 pipe 方法把两个数据流连接起来
*/

