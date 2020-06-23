<!--
 * @Author: your name
 * @Date: 2020-06-23 20:42:59
 * @LastEditTime: 2020-06-23 21:15:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /learnNodeAgain/libs/FIle_System概念.md
--> 
# File System(文件系统)
NodeJS通过 `fs` 内置模块提供对文件的操作，fs 模块提供的 API 基本可以分为以下三类:

* 文件属性读写</br>
常用：`fs.stat` | `fs.chmod` | `fs.chowm` 等等
* 文件内容读写</br>
常用：`fs.readFile` | `fs.readdir` | `fs.writeFile` | `fs.mkdir` 等等
* 底层文件操作</br>
常用：`fs.open` | `fs.read` | `fs.write` | `fs.close` 等等

NodeJS最精华的 `异步I/O` 在 `fs` 模块里有充分的提现，例如上面提到的API都通过回调函数传递结果，以 `fs.readFile` 为例：
```
fs.readFile(pathname, (err, data) => {
    if(err){
        // Deal with error.
    }
    else {
        // Deal with data.
    }
});
```
fs模块所有的API几乎都有两个版本，还是以 fs.readFile 为例：就是异步操作 readFile 和 同步操作 readFileSync 两个函数，readFileSync 的异常处理如下：
```
try{
    var data = fs.readFileSync(pathname);
    // Deal with data.
}
catch(err){
    // Deal with error.
}
```

