'use strict';

import path from 'path';
import config from './config';

import koa from 'koa';
import staticServe from 'koa-static';
import viewEngine from 'koa-ejs';
import mongoose from 'mongoose';

import session from 'koa-session';
import router from './router';

const app = new koa();
mongoose.Promise = global.Promise;
const connection = mongoose.connect("mongodb://"+config.mongoConnection.host+":"+config.mongoConnection.port+"/"+config.mongoConnection.database,{useMongoClient: true});
app.keys = ['session_secret_key'];

app.use(staticServe(__dirname + '/public'));
app.use(bodyParser());
app.use(session(config.sessionConfiguration, app));
app.use(router.routes());
viewEngine(app, {
    root: path.join(__dirname, 'views'),
    layout: false,
    viewExt: 'ejs',
    cache: false,
    debug: false
});

app.listen(config.port);