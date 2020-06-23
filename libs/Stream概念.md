<!--
 * @Author: your name
 * @Date: 2020-06-23 20:10:10
 * @LastEditTime: 2020-06-23 20:40:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /learnNodeAgain/libs/Stream概念.md
--> 
# Stream（数据流）
内存中无法一次装下需要处理的数据时，或者一边读取一边处理更加高效时，这是 `数据流` 就有了用武之地，NodeJS中通过各种 `Stream` 来提供对数据流的操作，比如要拷贝大数据文件时，我们可以为数据来源创建一个 `只读数据流`,示例如下：
```
var rs = fs.createReadStream(pathname);// 创建只读数据流，
rs.on('data', chunk => dosomething(chunk));// 给只读数据流对象注册 获取数据 时的处理函数
rs.end('end', () => cleanUp());// 结束数据读取时 的处理函数
```
* PS：`Stream`基于事件机制工作，所有 `Stream` 的实例都继承于 NodeJS 提供的 EventEmitter 

上面的代码中 `data` 事件会不断的触发，只有还在读取数据。不管 dosomething 函数是否处理得过来，所以代码可以继续做如下改造，以解决这个问题。
```
var rs = fs.createReadStream(pathname);// 创建只读数据流，

// 给只读数据流对象注册 获取数据 时的处理函数
rs.on('data', chunk => {
    rs.pause();// 暂停读取，先处理这部分读取到的数据
    // 给处理函数，传一个回调进去，使用回调，来让数据流继续读取
    dosomething(chunk, () => rs.resume());
});

rs.end('end', () => cleanUp());// 结束数据读取时 的处理函数
```
继续优化，添加写入。
```
var rs = fs.createReadStream(pathname);// 创建只读数据流，
var ws = fs.createWriteStream(destname);// 创建只写数据流，

// 当读取到数据流时，写入数据
rs.on('data', chunk => {
    ws.write(chunk);
});

// 读取流结束时，写入流也结束
rs.end('end', () => ws.end());
```
上面的问题在于，如果写入速度跟不上读取速度的话，只写数据流内部的缓存就会爆仓。如果能根据写入的状态来判定是否继续读取就好了，写入流提供了 返回值来判定传入的数据是否已经写入目标还是临时放在缓存了，而且提供 `drain` 事件来判断什么时候只写流已经将缓存中的数据写入目标了，可以传入下一个代写数据。===》继续优化
```
var rs = fs.createReadStream(pathname);// 创建只读数据流，
var ws = fs.createWriteStream(destname);// 创建只写数据流，

// 当读取到数据流时，写入数据
rs.on('data', chunk => {
    if(ws.write(chunk) === false){// 判断写入流缓存没有数据，true =》没有，false =》 有
        rs.pause();// 暂停读取
    }
});

// 读取流结束时，写入流也结束
rs.end('end', () => ws.end());
// 写入流干枯时，读取流继续读取数据
ws.end('drain', () => rs.resume());
```
PS:以上代码实现了数据从只读数据流到只写数据流的搬运，并包括了防爆仓控制。场景较多，所以 NodeJS 直接提供了 `.pipe` 方法来做这件事情。