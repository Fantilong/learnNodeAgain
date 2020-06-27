/*
 * @Author: your name
 * @Date: 2020-06-23 15:17:02
 * @LastEditTime: 2020-06-27 18:24:46
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
        travel_sync: travel_sync,
        read_text: read_text,
    }
} = require('./libs');
const fs = require('fs');
const http = require('http');
const net = require('net');

// 使用进程获取控制台参数
var param = process.argv.slice(2);
// 执行复制函数
// my_copy_sync(param[0], param[1]); // 小文件拷贝
// my_copy(param[0], param[1]); //大文件拷贝

// travel_sync(param[0], result => {
//     console.log(result);
//     // 文件处理
// });

// travel(param[0], (file_path, callback) => {
//     console.log(file_path);
//     callback();
// });

// var bom = ['0xEF', '0xBB', '0xBF'];
// var bin = fs.readFileSync('./doc/file1.txt');
// let my_bom_buf = Buffer.from([...bom, ...bin]);

// console.log(fs.readFileSync('./doc/file1.txt'));

// http.createServer((req, res) => {
//     res.writeHead(200, {
//         'Content-Type': 'text/plain'
//     });

//     req.on('data', chunk => {
//         res.write(chunk);
//     });

//     req.on('end', () => {
//         res.end();
//     });
// }).listen(5000);

net.createServer(conn => {
    conn.on('data', data => {
        conn.write([
            'HTTP/1.1 200 OK',
            'Content-Type: text/plain',
            'Content-Length: 11',
            '',
            'Hello World'
        ].join('\n'));
    });
}).listen(5000);

/* 
fs.createReadStream 创建一个源文件的只读数据流
fs.createWriteStream 创建一个目标文件的只写数据流
使用 pipe 方法把两个数据流连接起来
*/