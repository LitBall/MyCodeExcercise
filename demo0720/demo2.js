function test1(){
    let [a, b, c] = [1, 2, 3];
    console.log(a,b,c);
}

function test2(){
    // {
    //     const { log } = console;
    //     log('hello') // hello
    // }
    {
        let obj = { first: 'hello', last: 'world' };
        let { first: f, last: l } = obj;
        console.log(f);
        console.log(l);
    }
}

function test3(){
    //attention
//  错误的写法
//  let x;
//  {x} = {x: 1};
//  SyntaxError: syntax error

    // 正确的写法
    let x;
    ({x} = {x: 1});
}

function test4(){
    {
        //为x, y指定默认值
        function move({x = 0, y = 0} = {}) {
            return [x, y];
        }
        console.log(move({x: 3, y: 8})); // [3, 8]
        console.log(move({x: 3})); // [3, 0]
        console.log(move({})); // [0, 0]
        console.log(move()); // [0, 0]
    }
    {
        //为move的参数指定默认值
        function move({x, y} = { x: 0, y: 0 }) {
            return [x, y];
        }
        console.log(move({x: 3, y: 8})); // [3, 8]
        console.log(move({x: 3})); // [3, undefined]
        console.log(move({})); // [undefined, undefined]
        console.log(move()); // [0, 0]
    }
}


