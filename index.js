async function mapObj( obj ) {
    try {
        if ( obj instanceof Promise ) return obj
        if ( obj instanceof Function ) return obj()
    } catch (err) {
        return errr
    }
    if ( obj instanceof Array ) {
        return Promise.all(obj.map(mapObj))
    }
    if ( obj instanceof Object ) {
        const kyes = Object.keys(obj)
        return Promise.all(
            kyes.map( k => mapObj(obj[k]))
        ).then( v => {
            const o = {}
            kyes.map( (k,i) => {
                o[k] = v[i] 
            })
            return o
        })
    }
    return obj
}
async function promiesLog( ...promies ) {
    return mapObj(promies).then( e => {
        console.log( ...e )
        return e
    })
}


module.exports = promiesLog