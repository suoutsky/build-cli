const gulp = require('gulp');
const webserver = require('gulp-webserver');

/** gulp-concat：合併檔案
gulp-minify-css：壓縮 CSS
gulp-uglify：混淆並壓縮 JS
gulp-rename：重新命名檔案 **/

const concat = require('gulp-concat');
const minifyCSS = require('gulp-minify-css');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const  htmlreplace = require('gulp-html-replace');
const  minifyHTML  = require('gulp-minify-html');

gulp.task('html-replace',function() {
  var opts = {comments:false,spare:false,quotes:true};
  return gulp.src('./app/*.html')
    .pipe(htmlreplace({
        'css': 'css/all.min.css',
        'js': 'js/all.min.js'
    }))  
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('./build/'));
});

gulp.task('concat', function() {
  return gulp.src('./app/css/*.css')
      .pipe(concat('all.css'))
      .pipe(gulp.dest('./build/css/'));
});
/**
 * minify-css任务，
 * 必须要在concat任务完成之后才会进行，但要如何保证呢？
 * 因为在gulp里头，所有任务并不会按照顺序，
 * 因此很有可能当我们执行minify-css的时候， 
 * concat尚未完成，就会造成产生的程式码有问题，
 * 所以，「在每个task任务里头加上return，
 * 接着把minify-css的任务写成这样：
 * gulp.task('minify-css', ['concat'], function(){})」，
 * 就可以保证minify-css会接在concat之后！
 */
gulp.task('minify-css',['concat'], function() {
  return gulp.src('./build/css/all.css')
    .pipe(minifyCSS({
       keepBreaks: true,
    }))
    .pipe(rename(function(path) {
      path.basename += ".min";
      path.extname = ".css";
    }))
    .pipe(gulp.dest('./build/css/'));
});

gulp.task('uglify', function() {
  return gulp.src('./app/js/*.js')
      .pipe(uglify())
      .pipe(rename(function(path) {
          path.basename += ".min";
          path.extname = ".js";
      }))
      .pipe(gulp.dest('./build/js/'));
});

gulp.task('webserver', function() {
  // gulp.src是指任务的目标文件夹，
  gulp.src('./app/')
  .pipe(webserver({
    port: 1234,
    livereload: true,
    directoryListing: false,
    open: true,
    fallback: 'index.html'
  }));
});

gulp.task('default', ['html-replace','minify-css','uglify', 'webserver']);