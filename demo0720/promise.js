// const promise = new Promise(function (resolve,reject) {
//     if(true){
//         resolve(value);
//     }else {
//         reject(error);
//     }
// })

function test1(){
    function timeout(ms){
        return new Promise((resolve, reject) => {
            setTimeout(resolve,ms,'done');
        })
    }
    timeout(100).then((value) => {
        console.log(value);
    })
}

function test2(){
    let promise = new Promise(function(resolve, reject) {
        console.log('Promise');
        resolve();
    });

    promise.then(function() {
        console.log('resolved.');
    });

    console.log('Hi!');

// Promise
// Hi!
// resolved
}

function test3(){
    //p1是一个 Promise，3 秒之后变为rejected
    const p1 = new Promise(function (resolve, reject) {
        setTimeout(() => reject(new Error('fail')), 3000)
    })
    //p2的状态在 1 秒之后改变，resolve方法返回的是p1。由p1的状态决定p2的状态
    const p2 = new Promise(function (resolve, reject) {
        setTimeout(() => resolve(p1), 1000)
    })

    //p2状态改变后，又过了 2 秒，p1变为rejected，导致触发catch方法指定的回调函数。
    p2
        .then(result => console.log(result))
        .catch(error => console.log(error))
// Error: fail
}

function test4(){
    const someAsyncThing = function() {
        return new Promise(function(resolve, reject) {
            // 下面一行会报错，因为x没有声明
            resolve(x + 2);
        });
    };

    someAsyncThing().then(function() {
        console.log('everything is great');
    });

    setTimeout(() => { console.log(123) }, 2000);
// Uncaught (in promise) ReferenceError: x is not defined
// 123
}
