# promiesLog
开发时，快速打印各种 promise

```js

function sleep (sec) {
    return new Promise((r) => {
        setTimeout(()=>{
            r()
        }, sec * 1000)
    })
}

const k = {
    a: async () => {
        await sleep(2)
        return 'a'
    },
    b:[
        async () => {
            await sleep(2)
            return 'b'
        }
    ],
    c: 'c',
    d: {
        e: {
            k: sleep(5).then( e => 'k')
        }
    }
}
pLog(
    k,
    sleep(5).then( e => 'second'),
    'my'
)

// <= { a: 'a', b: [ 'b' ], c: 'c', d: { e: { k: 'k' } } } 'second' 'my'

const p = await pLog(
    k,
    sleep(5).then( e => 'second'),
    'my'
)

// [{ a: 'a', b: [ 'b' ], c: 'c', d: { e: { k: 'k' } } }, 'second', 'my']
```
