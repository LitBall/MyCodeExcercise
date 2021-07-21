function test1() {
    let i = 0;
    for(;i < 5;i++){}
    console.log("this is let i after for: ",i);


// for(let t = 0;t < 5;t++){}
// console.log("this is let t after for: ",t);//ReferenceError: t is not defined

    for(var j = 0;j < 5;j++){}
    console.log("this is var j after for: ",j);
}

function test2() {
    var a = [];
    for (var i = 0; i < 10; i++) {
        a[i] = function () {
            console.log(i);
        };
    }
    a[6](); // 10

    var b = [];
    for (let i = 0; i < 10; i++) {
        b[i] = function () {
            console.log(i);
        };
    }
    b[6](); // 6
}

function test3(){
    {
        let n = 5;
        if (true) {
            let n = 10;
        }
        console.log("n: ", n); // 5
    }
    {
        var m = 5;
        if (true) {
            var m = 10;
        }
        console.log("m: ", m); // 10
    }
}

function test4(){
// 块级作用域内部的函数声明语句，建议不要使用
    {
        let a = 'secret1';
        function f() {
            return a;
        }
        console.log(f())
    }

// 块级作用域内部，优先使用函数表达式
    {
        let a = 'secret2';
        let f = function () {
            return a;
        };
        console.log(f())
    }
}

function test5(){
    const a = [];
    a.push('Hello'); // 可执行
    a.length = 0;    // 可执行
    //a = ['Dave'];    // 报错
}
