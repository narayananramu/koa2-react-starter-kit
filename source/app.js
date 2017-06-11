'use strict';

import path from 'path';
import config from './config';

import koa from 'koa';
import staticServe from 'koa-static';
import viewEngine from 'koa-ejs';

import session from 'koa-session';
import router from './router';

const app = new koa();

app.keys = ['session_secret_key'];

app.use(session(config.sessionConfiguration, app));
app.use(staticServe(__dirname + '/public'));
app.use(router.routes());

viewEngine(app, {
    root: path.join(__dirname, 'views'),
    layout: false,
    viewExt: 'ejs',
    cache: false,
    debug: true
});

app.listen(config.port);