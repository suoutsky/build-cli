const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('js', function() {
  gulp.src('./w/index.js')
  .pipe(babel())
  .pipe(gulp.dest('./build/js'))
});
gulp.task('default', ['js'])