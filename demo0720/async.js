function test1(){
    async function hello() {
        return "Hello"
    };
    console.log(hello());
}

function test2(){
    function timeout(ms) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }
    async function asyncPrint(value, ms) {
        await timeout(ms);
        console.log(`${ms} ms later,${value}`);
    }
    asyncPrint('hello world', 50);
}

function test3(){
    {
        async function f() {
            return 'hello world';
        }

        f().then(v => console.log(v))
    }
    {
        async function f() {
            throw new Error('error!');
        }

        f().then(
            v => console.log('resolve', v),
            e => console.log('reject', e)
        )
//reject Error: 出错了
    }
}
test3()
