function presPromies( pro ) {
    return pro.catch( e => e)
}

async function mapObj( obj ) {
    if ( obj instanceof Promise ) return presPromies(obj)
    if ( obj instanceof Array ) {
        return Promise.all(obj.map(mapObj))
    }
    if ( Object.prototype.toString.call(obj) === '[object Object]' ) {
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
    }).catch( err => {
        console.error( err )
        return err
    })
}


module.exports = promiesLog