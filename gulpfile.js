var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');

// Static server + watching scss/html files
gulp.task('serve', ['sass'], function () {

    browserSync.init({
      server: './app',
    });

    gulp.watch("app/scss/**/*.scss", ["sass"]);
    gulp.watch("app/*.html").on('change', function () {
      console.log('Reloading page');
      browserSync.reload();
    });

});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function () {
  return gulp.src("app/scss/**/*.scss")
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest("app/css"))
    .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
