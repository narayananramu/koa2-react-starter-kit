var redisStore = require('koa-redis');
module.exports = {
    sessionConfiguration : {
        key: '_a',
        maxAge: 86400000,
        overwrite: true,
        httpOnly: true,
        signed: true,
        domain: '',
        store: redisStore({
            host: "192.168.0.100",
            port: 32769
        })
    },
    port: '3000',
    mongoConnection:{
        host: '192.168.0.100',
        port: '32768',
        username: '',
        password: '',
        database: ''
    }
}