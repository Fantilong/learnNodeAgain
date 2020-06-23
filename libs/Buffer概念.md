<!--
 * @Author: your name
 * @Date: 2020-06-23 16:55:53
 * @LastEditTime: 2020-06-23 19:48:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /learnNodeAgain/libs/Buffer概念.md
--> 
# Buffer（数据块）
NodeJS提供的对二进制数据做操作的构造函数，
> 自然语言编码（UTF-8、GBK）》 字节码（byte） 》二进制

* 与 String 等全局构造函数对等
* 可以通过读取文件得到 Buffer，也可以直接构造
```
var bin = new Buffer([0x68, 0x65, 0x6c, 0x6c, 0x6f]);
```
* Buffer 与字符串类似，除了可以用 `.length` 属性得到字节长度外，还可以用[index]方式读取指定位置的字节，例如：
```
bin[0];// => 0x68
```
Buffer与字符串能够相互转化，例如可以使用指定编码将二进制数据转化为字符串：
```
var str = bin.toString('utf-8'); // => "hello"
var bin = new Buffer('hello', 'utf-8'); // => <Buffer 68 65 6c 6c 6f>
```
* 英文字母和中文汉字单个字符在不同字符集编码下的字节数

| 英文 | 汉字 | 编码 |
| :-: | :-: | :--: |
| 1 | 2 | GB2312 |
| 1 | 2 | GBK |
| 1 | 2 | GB18030 |
| 1 | 1 | ISO-8859-1 |
| 1 | 3 | UTF-8 |
| 4 | 4 | UTF-16 |
| 2 | 2 | UTF-16BE |
| 2 | 2 | UTF-16LE |

* Buffer 与 字符串重要区别，</br>
字符串：只读，并且对字符串的任何修改得到导师一个新字符串，原字符串保持不变，</br>
Buffer：更像是可以做指针操作的C语言数组，例如：可以用[index]方式直接修改某个位置的字节。读进内存的是字符，返回的是指向内存的指针，单纯理解就是引用，操作Buffer就是操作引用
```
bin[0] = 0x48;// 栈地址，栈地址存储堆地址
```
* .slice 方法也不是返回一个新的Buffer，而是返回了指向原Buffer中的某个位置的指针，如下所示：</br>
```
[ 0x68, 0x65, 0x6c, 0x6c, 0x6f ]
    ^           ^
    |           |
   bin     bin.slice(2)
```
* 由于是返回的是引用，修改返回的引用指向的Buffer也会作用于原Buffer，例如：
```
var bin = new Buffer([0x68, 0x65, 0x6c, 0x6c, 0x6f]);// 初始化 Buffer 实例
var sub_buffer = bin.slice(2);// => [0x6c, 0x6c, 0x6f]
sub[0] = 0x65;//修改0位置上引用，指向存储另一个字节码的引用
console.log(bin);// => <Buffer 68 65 65 6c 6f>
```
* 拷贝Buffer不是拷贝Buffer指向的数据，而是拷贝引用。
* 如果要拷贝一份Buffer指向的数据，首先要创建一个新的Buffer，通过`.copy`方法把原Buffer中的数据复制过去，类似于申请一块新的内存，并把已有内存中的数据复制过去，以下是一个例子；
```
var bin = new Buffer([0x68, 0x65, 0x6c, 0x6c, 0x6f]);
var dup = new Buffer(bin.length);
bin.copy(dup);
dup[0] = 0x48;
console.log(bin);// => <Buffer 68 65 6c 6c 6f>
console.log(dup);// => <Buffer 48 65 6c 6c 6f>
```
总结：`Buffer`对象将JS的数据处理能力从字符串扩展到了任意二进制数据





