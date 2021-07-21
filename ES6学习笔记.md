# ES6学习笔记

## let和const

##### 基本用法

- `let` 声明后才能使用，没有变量提升。不可重复声明。
- `const` 声明时必须同时初始化，只读。没有变量提升。不可重复声明。一旦声明，不能改变。
  （加强版`let`）
  - 注意：实际是指向**实际数据的指针**。指向的那个内存地址所保存的数据不得改动。简单类型数据不可变，复杂类型数据是否变化不可控。

##### 暂时性死区

- 在代码块内，使用`let`/`const`命令声明变量之前，该变量都是不可用的。这在语法上，称**暂时性死区**（temporal dead zone，简称 TDZ）。

##### 块级作用域

- let为 JavaScript 新增了块级作用域。
- 可以任意嵌套。（必须用{}*n）
- ES6允许在块级作用域中声明函数。
  - 但是应该**避免在块级作用域内声明函数**。如果确实需要，也应该写成**函数表达式**，而不是函数声明语句。

##### 声明变量方式
`var`, `function`, `let`, `const`, `import`, `class`

## 变量的解构赋值

**解构**：允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为**解构**（Destructuring）。

##### 数组

- 基本用法：按顺序对应赋值，变量的取值由它的位置决定。不成功就`undefined`；匹配到不是可遍历的结构就报错。

  - 事实上，只要某种数据结构具有 **Iterator 接口**，都可以采用数组形式的解构赋值。
  - 默认值：数组对应位置的值 === undefined 的时候生效。
##### 对象

- 基本用法：属性没有次序，变量必须与属性同名，才能取到正确的值。解构失败，没有找到同名属性就`undefined`。
  - 对象的解构赋值的内部机制，是先找到**同名属性**，然后再赋给对应的变量。
  - 默认值：对象的属性值 === undefined的时候生效。
  - 数组、字符串、数值、布尔值是特殊的对象，也可以解构。
  - 函数参数也可以解构赋值。

##### 得使用圆括号的解构赋值

**赋值语句**的**非模式部分**，可以使用圆括号。

```javascript
[(b)] = [3]; // 正确
({ p: (d) } = {}); // 正确
[(parseInt.prop)] = [3]; // 正确
```

##### 用途

- 交换变量的值
```javascript
let x = 1;
let y = 2;

[x, y] = [y, x];
```
-  从函数返回多个值
-  函数参数成组赋值
-  JSON数据的提取
```javascript
let jsonData = {
  id: 42,
  status: "OK",
  data: [867, 5309]
};

let { id, status, data: number } = jsonData;

console.log(id, status, number);
// 42, "OK", [867, 5309]
```
- 函数参数默认值
```javascript
jQuery.ajax = function (url, {
  async = true,
  beforeSend = function () {},
  cache = true,
  complete = function () {},
  crossDomain = false,
  global = true,
  // ... more config
} = {}) {
  // ... do stuff
};
```
- map结构遍历

## 字符串扩展
##### Unicode表示法

```javascript
'\z' === 'z'  // true
'\172' === 'z' // true
'\x7A' === 'z' // true
'\u007A' === 'z' // true
'\u{7A}' === 'z' // true
```

##### 遍历器接口

ES6 为字符串添加了遍历器接口，使得字符串可以被`for...of`循环遍历。

```javascript
for (let codePoint of 'foo') {
  console.log(codePoint)
}
// "f"
// "o"
// "o"
```

最大的优点：**可以识别大于`0xFFFF`的码点**。

##### 模板字符串

模板字符串（template string）是增强版的字符串，用反引号（`）标识。它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。

```javascript
$('#result').append(`
  There are <b>${basket.count}</b> items //嵌入变量
   in your basket, <em>${basket.onSale}</em> //定义多行
  are on sale!
`);
```

- 大括号内部可以放入任意的 JavaScript 表达式，可以进行运算，以及引用对象属性。
- 模板字符串之中还能调用函数。
- 还能嵌套。



## Promise对象

**Promise**：所谓`Promise`，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取**异步操作**的消息。Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。

##### 特点

- 对象的状态不受外界影响。`Promise`对象代表一个异步操作，只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。三种状态：
  - `pending`（进行中）
  - `fulfilled`（已成功）
  - `rejected`（已失败）。

- 一旦状态改变，就不会再变，任何时候都可以得到这个结果。`Promise`对象的状态改变，只有两种可能：从`pending`变为`fulfilled`和从`pending`变为`rejected`。之后状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。

##### 基本用法

```javascript
const promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
```

- `resolve` 将`Promise`对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；
- `reject`函数的作用是，将`Promise`对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

```javascript
promise.then(function(value) {
  // success 回调函数1，resolved时调用
}, function(error) {
  // failure 回调函数2，rejected时调用
});
```

- `Promise`实例生成以后，可以用`then`方法分别指定`resolved`状态和`rejected`状态的回调函数。（可选）

  - `resolve`函数和`reject`函数调用时可以带参数。参数会传给回调函数。

  - `resolve`函数的参数除了正常值意外，还可能是另一个Promise实例。
```javascript
const p1 = new Promise(function (resolve, reject) {
  // ...
});

const p2 = new Promise(function (resolve, reject) {
  // ...
  resolve(p1);
})
```

- 调用`resolve`或`reject`并不会终结 Promise 的参数函数的执行。
```javascript
new Promise((resolve, reject) => {
  resolve(1);
  console.log(2);
}).then(r => {
  console.log(r);
});
// 2
// 1
//调用resolve(1)以后，后面的`console.log(2)`还是会执行，并且会首先打印出来。
//这是因为立即 resolved 的 Promise 是在本轮事件循环的末尾执行，总是晚于本轮循环的同步任务。
```

- 调用`resolve`或`reject`以后，Promise 的使命就完成了，后继操作应该放到`then`方法里面，而不应该直接写在`resolve`或`reject`的后面。
```javascript
  new Promise((resolve, reject) => {
    return resolve(1);
    // 后面的语句不会执行
    console.log(2);
  })
```

#####  Promise.prototype.then() 

为 Promise 实例添加**状态改变时的回调函数**。

- `then`方法返回的是一个新的`Promise`实例（注意，不是原来那个`Promise`实例）。因此可以采用**链式写法**，即`then`方法后面再调用另一个`then`方法。
  - 采用链式的`then`，可以指定一组按照次序调用的回调函数。

```javascript
getJSON("/post/1.json").then(
  post => getJSON(post.commentURL)
).then(
  comments => console.log("resolved: ", comments),
  err => console.log("rejected: ", err)
);
//采用箭头函数的链式then
```

##### Promise.prototype.catch()

用于指定**发生错误时的回调函数**。

- 如果异步操作抛出错误，状态就会变为`rejected`，就会调用`catch()`方法指定的回调函数，处理这个错误。另外，`then()`方法指定的回调函数，如果运行中抛出错误，也会被`catch()`方法捕获。

```javascript
const promise = new Promise(function(resolve, reject) {
  reject(new Error('test'));
});
promise.catch(function(error) {
  console.log(error);
});
```

- 如果 Promise 状态已经变成`resolved`，再抛出错误是无效的。因为 Promise 的**状态一旦改变，就永久保持该状态**，不会再变了。

```javascript
const promise = new Promise(function(resolve, reject) {
  resolve('ok');
  throw new Error('test');
});
promise
  .then(function(value) { console.log(value) })
  .catch(function(error) { console.log(error) });
// ok
```

- Promise 对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止。也就是说，**错误总是会被下一个`catch`语句捕获**。

- 一般来说，使用**`catch`方法**好过在`then()`方法里面定义 Reject 状态的回调函数（即`then`的第二个参数）。

```javascript
// bad
promise
  .then(function(data) {
    // success
  }, function(err) {
    // error
  });

// good. 可以捕获前面then方法执行中的错误
promise
  .then(function(data) { //cb
    // success
  })
  .catch(function(err) {
    // error
  });
```

- ！如果没有使用`catch()`方法指定错误处理的回调函数，Promise 对象抛出的错误不会传递到外层代码，即不会有任何反应。

  ```javascript
  const someAsyncThing = function() {
    return new Promise(function(resolve, reject) {
      // 下面一行会报错，因为x没有声明。但是不会退出进程、终止脚本执行
      resolve(x + 2);
    });
  };
  
  someAsyncThing().then(function() {
    console.log('everything is great');
  });
  
  setTimeout(() => { console.log(123) }, 2000);
  // Uncaught (in promise) ReferenceError: x is not defined
  // 123
  //Promise 内部的错误不会影响到 Promise 外部的代码，“Promise 会吃掉错误”。
  ```

  

## async函数

**async函数**： Generator 函数的语法糖。

##### 特点

- 内置执行器
- 更好的语义
- 更广的适用性
- 返回值是Promise
##### 基本用法

- `async`函数返回一个 Promise 对象，可以使用`then`方法添加回调函数。当函数执行的时候，一旦遇到`await`就会先返回，等到异步操作完成，再接着执行函数体内后面的语句。
- 可以看**作多个异步操作，包装成的一个 Promise 对象**，而`await`命令就是内部`then`命令的语法糖。（**优化then链**）
```javascript
fetch('coffee.jpg')
.then(response => response.blob())
.then(myBlob => {
  let objectURL = URL.createObjectURL(myBlob);
  let image = document.createElement('img');
  image.src = objectURL;
  document.body.appendChild(image);
})
.catch(e => {
  console.log('There has been a problem with your fetch operation: ' + e.message);
});

// 转换成async-await语法
async function myFetch() {
  let response = await fetch('coffee.jpg');
  let myBlob = await response.blob();

  let objectURL = URL.createObjectURL(myBlob);
  let image = document.createElement('img');
  image.src = objectURL;
  document.body.appendChild(image);
}

myFetch()
.catch(e => {
  console.log('There has been a problem with your fetch operation: ' + e.message);
});

// 使用 promise 和 await 的混合方式
async function myFetch() {
  let response = await fetch('coffee.jpg');
  return await response.blob();
}

myFetch().then((blob) => {
  let objectURL = URL.createObjectURL(blob);
  let image = document.createElement('img');
  image.src = objectURL;
  document.body.appendChild(image);
});
```

##### 错误处理机制

- `async`函数内部`return`语句返回的值，会成为`then`方法回调函数的参数。

```javascript
async function f() {
  return 'hello world';
}

f().then(v => console.log(v))
```

- `async`函数内部抛出错误，会导致返回的 Promise 对象变为`reject`状态。抛出的错误对象会被`catch`方法回调函数接收到。

```javascript
async function f() {
  throw new Error('出错了');
}

f().then(
  v => console.log('resolve', v),
  e => console.log('reject', e)
)
//reject Error: 出错了
```

##### 状态变化

- `async`函数返回的 Promise 对象，必须等到内部所有`await`命令后面的 Promise 对象执行完，（即**完成所有异步操作**）才会发生状态改变，除非**遇到`return`语句或者抛出错误**。
  - 任何一个`await`语句后面的 Promise 对象变为`reject`状态，那么整个`async`函数都会中断执行。

##### 注意事项

1. `await`命令后面的`Promise`对象，运行结果可能是`rejected`，所以最好把`await`命令放在`try...catch`代码块中。
2. 多个`await`命令后面的异步操作，如果不存在继发关系，最好让它们同时触发。
```javascript
//两个独立的异步操作（即互不依赖），被写成继发关系
let foo = await getFoo();
let bar = await getBar();
//改成如下，同时触发，缩短程序的执行时间。
let [foo, bar] = await Promise.all([getFoo(), getBar()]);
```
