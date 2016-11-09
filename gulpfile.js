var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var babel = require('gulp-babel');

var paths = {
  server: ['./server/**/*.js'],
  es6: ['./www/**/*.js'],
  sass: ['./scss/**/*.scss'],
  html: ['./www/**/*.html'],
};

gulp.task('default', ['server', 'es6', 'sass', 'html']);

gulp.task("server", function () {
  return gulp.src('./server/**/*.js')
    .pipe(babel({presets: ['es2015']}))
    .pipe(gulp.dest("./build/server"));
});

gulp.task('es6', () => {
  return gulp.src('./www/**/*.js')
    .pipe(babel({presets: ['es2015']}))
    .pipe(gulp.dest('./build/www'))
});

gulp.task('html', () => {
  return gulp
    .src('./www/**/*.html')
    .pipe(gulp.dest('./build/www'))
});

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.es6, ['server']);
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.html, ['html']);
  gulp.watch(paths.es6, ['es6']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
