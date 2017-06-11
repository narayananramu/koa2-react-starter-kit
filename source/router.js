'use strict';

import Router from 'koa-router';
import controller from './controllers/index';

const router = new Router;

router.get('/', new controller().index);

module.exports = router;