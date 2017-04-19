/**
 * Created by qianduan on 2017/3/1.
 */
var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer'); // 处理css中浏览器兼容的前缀
var rename = require('gulp-rename'); //重命名
var cssnano = require('gulp-cssnano'); // css的层级压缩合并
var sass = require('gulp-sass'); //sass
var jshint = require('gulp-jshint'); //js检查 ==> npm install --save-dev jshint gulp-jshint（.jshintrc：https://my.oschina.net/wjj328938669/blog/637433?p=1）
var plumber = require("gulp-plumber"); //阻止遇到错误gulp自动退出，当改正后gulp运行正常
var uglify = require('gulp-uglify'); //js压缩
var concat = require('gulp-concat'); //合并文件
var imagemin = require('gulp-imagemin'); //图片压缩
var fileinclude = require('gulp-file-include'); // 可以 include html 文件 @@include用法;
var notify = require('gulp-notify'); //通知当发生异常时提示错误 确保本地安装gulp-notify和gulp-plumber
var Config = require('./gulpfile.config.js');
var nunjucksRender = require('gulp-nunjucks-render'); //Render Nunjucks templates with data
//======= gulp build 打包资源 ===============
function prod() {
    /**
     * HTML处理---@@include
     */
    gulp.task('html', function () {
        return gulp.src(Config.html.src)
            .pipe(fileinclude({   //头尾公共部分添加
                prefix: '@@',
                basepath: '@file'
            }))
            .pipe(gulp.dest(Config.html.dist));
    });
    /**
     * assets文件夹下的所有文件处理,复制到dist目录下
     */
    gulp.task('assets', function () {
        return gulp.src(Config.assets.src).pipe(gulp.dest(Config.assets.dist));
    });
    /**
     * CSS样式处理
     */
    gulp.task('css', function () {
        return gulp.src(Config.css.src)
            .pipe(autoprefixer({
                browsers: ['last 2 versions', 'Android >= 4.0','safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6'],
                cascade: true //是否美化属性值 默认：true
                // remove:true //是否去掉不必要的前缀 默认：true
            }))
            .pipe(gulp.dest(Config.css.dist))
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(cssnano()) //执行压缩
            .pipe(gulp.dest(Config.css.dist))
            .pipe(notify({ message: 'css task complete' }));
    });
    /**
     * SASS样式处理
     */
    gulp.task('sass', function () {
        return gulp.src(Config.sass.src)
            .pipe(sass())
            .pipe(autoprefixer({
                browsers: ['last 2 versions', 'Android >= 4.0','safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6'],
                cascade: true //是否美化属性值 默认：true
                // remove:true //是否去掉不必要的前缀 默认：true
            }))
            .pipe(gulp.dest(Config.sass.dist))
            .pipe(rename({
                suffix: '.min'
            })) //rename压缩后的文件名
            .pipe(cssnano()) //执行压缩
            .pipe(gulp.dest(Config.sass.dist))
            .pipe(notify({ message: 'sass task complete' }));
    });
    /**
     * js处理
     */
    gulp.task('js', function () {
        return gulp.src(Config.js.src).pipe(jshint('.jshintrc')).pipe(jshint.reporter('default')).pipe(gulp.dest(Config.js.dist)).pipe(rename({
            suffix: '.min'
        })).pipe(uglify()).pipe(gulp.dest(Config.js.dist))
            .pipe(notify({ message: 'js task complete' }));
    });
    /**
     * 合并所有js文件并做压缩处理
     */
    gulp.task('js-concat', function () {
        return gulp.src(Config.js.src).pipe(jshint('.jshintrc')).pipe(jshint.reporter('default')).pipe(concat(Config.js.build_name)).pipe(gulp.dest(Config.js.dist)).pipe(rename({
            suffix: '.min'
        })).pipe(uglify()).pipe(gulp.dest(Config.js.dist))
            .pipe(notify({ message: 'js-concat task complete' }));
    });
    /**
     * 图片处理
     */
    gulp.task('images', function () {
        return gulp.src(Config.img.src).pipe(imagemin({
            optimizationLevel: 3
            , progressive: true
            , interlaced: true
        }))
            .pipe(gulp.dest(Config.img.dist))
            .pipe(notify({ message: 'Images task complete' }));
    });
    /*
    * Html替换css、js文件版本,替换成MD5戳
    * */
    gulp.task('rev', function() {
        //- 读取 rev-manifest.json 文件以及需要进行css名替换的文件
        return gulp.src(['./rev/**/*.json', './src/html/*.html'])
        //- 执行文件内md5名的替换
            .pipe(revCollector())
            //- 替换后的文件输出的目录
            .pipe(gulp.dest('./dist'));
    });
    gulp.task('build', ['html', 'css', 'sass', 'js', 'assets', 'images']);
}
module.exports = prod;