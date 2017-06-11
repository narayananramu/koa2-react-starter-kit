module.exports = {
    sessionConfiguration : {
        key: 'koa:sess',
        maxAge: 86400000,
        overwrite: true,
        httpOnly: true,
        signed: true
    },
    port: '3000'
}