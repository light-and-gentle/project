/**
 * Created by qianduan on 2017/3/1.
 */
var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer'); // 处理css中浏览器兼容的前缀
var rename = require('gulp-rename'); //重命名
var cssnano = require('gulp-cssnano'); // css的层级压缩合并
var sass = require('gulp-sass'); //sass
var jshint = require('gulp-jshint'); //js检查 ==> npm install --save-dev jshint gulp-jshint（.jshintrc：https://my.oschina.net/wjj328938669/blog/637433?p=1）
var plumber = require('gulp-plumber'); //阻止遇到错误gulp自动退出
var uglify = require('gulp-uglify'); //js压缩
var concat = require('gulp-concat'); //合并文件
var imagemin = require('gulp-imagemin');//图片压缩
var fileinclude = require('gulp-file-include'); // 可以 include html 文件 @@include用法;
var browserSync = require('browser-sync').create();
// var sourcemaps = require('gulp-sourcemaps'); //
//当发生异常时提示错误 确保本地安装gulp-notify和gulp-plumber
var notify = require('gulp-notify');
var reload = browserSync.reload;
var Config = require('./gulpfile.config.js');
var nunjucksRender = require('gulp-nunjucks-render'); //Render Nunjucks templates with data
//======= gulp dev 开发环境下 ===============
function dev() {
    /**
     * HTML处理- -
     */
//  gulp.task('html:dev', function () {
//      return gulp.src(Config.html.src)
//          .pipe(fileinclude({   //头尾公共部分添加
//              prefix: '@@',
//              basepath: '@file'
//          }))
//          .pipe(gulp.dest(Config.html.dist)) //复制到dist目录下
//          .pipe(reload({
//              stream: true
//          }));
//  });
    /*
    *  html预处理nunjucks模板
    * */
    gulp.task('html:dev', function () {
	  return gulp.src(Config.html.src)
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
	    .pipe(nunjucksRender({
	      // data:[{url:132145456,name:'asdfasdf'}],
	      path: [Config.src+'/html/templates/',Config.src+'/html/pages/']
            // String or Array --- 基础路径，所有模板内的路径引用都是基于此
	    }))
	    .pipe(gulp.dest(Config.html.dist))
	    .pipe(reload({stream: true }));
	});
    /**
     * assets文件夹下的所有文件处理--第三方依赖库（资源）
     */
    gulp.task('assets:dev', function () {
        return gulp.src(Config.assets.src).pipe(gulp.dest(Config.assets.dist)).pipe(reload({
            stream: true
        }));
    });
    /**
     * CSS样式处理
     */
    gulp.task('css:dev', function () {
        return gulp.src(Config.css.src).pipe(gulp.dest(Config.css.dist)).pipe(reload({
            stream: true
        }));
    });
    /**
     * SASS样式处理
     */
    gulp.task('sass:dev', function () {
        return gulp.src(Config.sass.src)
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(sass())
        .pipe(gulp.dest(Config.sass.dist)).pipe(reload({
            stream: true
        }));
    });
    /**
     * js处理
     */
    gulp.task('js:dev', function () {
        return gulp.src(Config.js.src).pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')})).pipe(jshint('.jshintrc')).pipe(jshint.reporter('default')).pipe(gulp.dest(Config.js.dist)).pipe(reload({
            stream: true
        }));
    });
    /**
     * 图片处理
     */
    gulp.task('images:dev', function () {
        return gulp.src(Config.img.src)
            .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
            //.pipe(imagemin({
            //    optimizationLevel: 3,
            //    progressive: true,
            //    interlaced: true}))
            .pipe(gulp.dest(Config.img.dist)).pipe(reload({
            stream: true
        }));
    });
    gulp.task('dev', ['html:dev', 'css:dev', 'sass:dev', 'js:dev', 'assets:dev', 'images:dev'], function () {
        browserSync.init({
            server: {
                baseDir: Config.dist,
                index:'setting.hardware.context.html'//指定运行的文件，不设置默认index
            },
            browser: "Chrome" ,//默认打开浏览器
            notify: false
        });
        // Watch .html files
        gulp.watch(Config.html.baseSrc, ['html:dev']);
        // Watch .css files
        gulp.watch(Config.css.src, ['css:dev']);
        // Watch .scss files
        gulp.watch(Config.sass.src, ['sass:dev']);
        // Watch assets files
        gulp.watch(Config.assets.src, ['assets:dev']);
        // Watch .js files
        gulp.watch(Config.js.src, ['js:dev']);
        // Watch image files
        gulp.watch(Config.img.src, ['images:dev']);
    });
}
//======= gulp dev 开发环境下 ===============
module.exports = dev;