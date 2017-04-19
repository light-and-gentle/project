/**
 * Created by qianduan on 2017/3/1.
 */
var prod = require('./build/gulpfile.prod.js');
var dev = require('./build/gulpfile.dev.js');
prod();
dev();