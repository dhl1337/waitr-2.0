var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var babel = require('gulp-babel');
var inject = require('gulp-inject');

var paths = {
  server: ['./server/**/*.js'],
  es6: ['./www/**/*.js'],
  sass: ['./scss/**/*.scss'],
  html: ['./www/**/*.html'],
  javascript: ['./www/**/*.js', '!./www/js/app.js', '!./www/lib/**'],
  css: ['./www/**/*.css','!./www/css/ionic.app*.css', '!./www/lib/**'],
  ionicCss: ['./www/lib/ionic/**/*.css'],
  ionicFont: ['./www/lib/ionic/fonts/**/*.eot', './www/lib/ionic/fonts/**/*.svg', './www/lib/ionic/fonts/**/*.ttf', './www/lib/ionic/fonts/**/*.woff']
};

gulp.task('default', ['css', 'server', 'es6', 'sass', 'html', 'index', 'ionic-css', 'ionic-font', 'ionic-scss', 'img']);

gulp.task('index', function(){
  return gulp.src('./www/index.html')
    .pipe(inject(
      gulp.src(paths.javascript,
        {read: false}), {relative: true}))
    .pipe(gulp.dest('./build/www'))
    .pipe(inject(
      gulp.src(paths.css,
        {read: false}), {relative: true}))
    .pipe(gulp.dest('./build/www'));
});

gulp.task('css', () => {
  return gulp.src('./www/css/**/*.css')
    .pipe(gulp.dest('./build/www/css/'))
});

gulp.task('img', () => {
  return gulp.src(['./www/img/**/*.png', './www/img/**/*.svg'])
    .pipe(gulp.dest('./build/www/img/'))
});

gulp.task('ionic-font', () => {
  return gulp.src(['./www/lib/ionic/fonts/**/*.eot', './www/lib/ionic/fonts/**/*.svg', './www/lib/ionic/fonts/**/*.ttf', './www/lib/ionic/fonts/**/*.woff'])
    .pipe(gulp.dest('./build/www/lib/ionic/fonts'))
});

gulp.task('ionic-scss', () => {
  return gulp.src('./www/lib/ionic/**/*.scss')
    .pipe(gulp.dest('./build/www/lib/ionic'))
});

gulp.task('ionic-css', () => {
  return gulp.src('./www/lib/ionic/**/*.css')
    .pipe(gulp.dest('./build/www/lib/ionic'))
});

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
    .pipe(gulp.dest('./build/www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./build/www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.server, ['server']);
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.html, ['html']);
  gulp.watch(paths.es6, ['es6']);
  gulp.watch(paths.css, ['css']);
  gulp.watch([paths.javascript, paths.css], ['index']);
  gulp.watch(paths.ionicCss, ['ionicCss']);
  gulp.watch(paths.ionicFont, ['ionicFont']);

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
