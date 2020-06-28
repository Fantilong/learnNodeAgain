/*
 * @Author: your name
 * @Date: 2020-06-23 15:17:02
 * @LastEditTime: 2020-06-28 11:40:49
 * @LastEditors: Please set LastEditors
 * @Description: 项目主模块，
 * @FilePath: /learnNodeAgain/main.js
 */
// 载入文件模块
const http = require('http');
const fs = require('fs');
const {parse_url, combine_files, validateFiles, outputFiles} = require('./libs/common');

// 预定义响应内容类型

function main() {
    let config = JSON.parse(fs.readFileSync('./config.json', 'utf-8')),
        root = config.root || '.',
        port = config.port || 5000;

    http.createServer((req, res) => {
        let url_info = parse_url(root, req.url);

        validateFiles(url_info.pathnames, (err, pathnames) => {
            if(err) {
                res.writeHead(404);
                res.end(err.message);
                return;
            }

            res.writeHead(200, {
                'Content-Type': url_info.mime
            });
            outputFiles(pathnames, res);
        });
    }).listen(port);
}

main();
/*
fs.createReadStream 创建一个源文件的只读数据流
fs.createWriteStream 创建一个目标文件的只写数据流
使用 pipe 方法把两个数据流连接起来
*/

