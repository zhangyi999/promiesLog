async function mapObj( obj ) {
    let o = obj instanceof Array ? []: {};
    for ( let k in obj ) {
        const v = obj[k]
        if ( v instanceof Promise ) {
            try {
                o[k] = await v
            } catch(err) {
                o[k] = err
            }
            continue
        }
        if ( v instanceof Function ) {
            try {
                o[k] = await v()
            } catch(err) {
                o[k] = err
            }
            continue
        }
        if ( v instanceof Array ) {
            o[k] = await mapObj(v)
            continue
        }
        if ( Object.prototype.toString.call(v) === '[object Object]' ) {
            o[k] = await mapObj(v)
            continue
        }

        o[k] = v
    }
    return o
}
async function promiesLog( ...promies ) {
    return mapObj(promies).then( e => {
        console.log( ...e )
        return e
    })
}


module.exports = promiesLog