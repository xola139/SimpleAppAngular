var gulp = require('gulp');
var webServer = require('gulp-webserver');
var cleanCSS = require('gulp-clean-css');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var babelify = require('babelify');
var htmlmin = require('gulp-html-minifier');
var imageop = require('gulp-image-optimization');
var concatCss = require('gulp-concat-css');


var config = {
  styles:{
    watch:'./src/styles/*.css',
    output:'./build/css'
  },
  indexMain:{
    watch:'./src/index.html',
    output:'./build'
  },

  views:{
    watch:'./src/views/*.html',
    output:'./build/views'
  },

  script:{
      main:'./src/script/main.js',
      watch:'./src/script/**/*.js',
      output:'./build/js'
  },

  image:{
      watch:['./src/img/*.*'],
      output:'./build/img'
  }
};

gulp.task('server',function () {
  gulp.src('./build')
    .pipe(webServer({
      host: '0.0.0.0',
      port: 8081,
      livereload: true
    }));
});


gulp.task('build:css',function () {
  gulp.src(config.styles.watch)
    .pipe(cleanCSS({keepSpecialComments:0}))
    .pipe(concatCss("main.css"))
    .pipe(cleanCSS({keepSpecialComments:0}))
    .pipe(gulp.dest(config.styles.output));
});

gulp.task('build:js',function (){
    return browserify(config.script.main)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        //.pipe(uglify({mangle: false}))
        .pipe(gulp.dest(config.script.output));
});

gulp.task('watch',function () {
  gulp.watch(config.image.watch,['images']);
  gulp.watch(config.styles.watch,['build:css']);
  gulp.watch(config.indexMain.watch,['indexMain']);
  gulp.watch(config.views.watch,['views']);
  gulp.watch(config.script.watch,['build:js']);
});


gulp.task('images', function(cb) {
    gulp.src([config.image.watch]).pipe(imageop({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    })).pipe(gulp.dest(config.image.output));
});

gulp.task('indexMain',function (){
    gulp.src(config.indexMain.watch)
            .pipe(htmlmin({collapseWhitespace: true}))
            .pipe(gulp.dest(config.indexMain.output));
});

gulp.task('views',function (){
    gulp.src(config.views.watch)
            .pipe(htmlmin({collapseWhitespace: true}))
            .pipe(gulp.dest(config.views.output));
});

gulp.task('images',function (){
    gulp.src(config.image.watch)
            .pipe(gulp.dest(config.image.output));
});


gulp.task('fonts', function() {
    return gulp.src([
                    './src/styles/css/fonts/*.*'])
            .pipe(gulp.dest('./build/css/fonts/'));});

gulp.task('build', ['build:css','build:js','views','indexMain','images','fonts']);

gulp.task('default',['server','watch','build']);
