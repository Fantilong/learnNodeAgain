<!--
 * @Author: your name
 * @Date: 2020-06-23 21:20:02
 * @LastEditTime: 2020-06-26 09:16:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /learnNodeAgain/libs/Path概念.md
--> 
# Path(路径)
内置模块 | 简化路径相关操作，常用API
* path.normalize</br>
将传入的路径转换为标准路径，解析 `.` 与 `..` ，去掉多余的斜杠，保证路径为唯一性
```
var cache = {};

function store(key, store){
    cache[path.normalize(key)] = value;
}

store('foo/bar', 1);
store('foo//bar//..bar', 2);
console.log(cache);// {"foo/bar":2}
```
> 坑注意：路径里的斜杠在windows系统下是：`\`，在linux系统下是 `/`。保证任何系统下都使用 `/`作为路径分隔符，需要使用 `replace(/\\/g, '/')`再替换下标准路径

* path.join</br>
拼接路径，能在不同系统下正确使用响应的路径分隔符
```
path.join('foo/', 'baz/', '../bar');// => 'foo/bar'
```
* path.extname</br>
获取路径文件的扩展名
```
path.extname('foo/bar.js);// => '.js'
```


