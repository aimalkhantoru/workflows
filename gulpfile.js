var gulp = require('gulp');
var gutil = require('gulp-util');
var coffee = require('gulp-coffee');
var browserify = require('gulp-browserify');
var compass = require('gulp-compass');
var connect = require('gulp-connect');
var concat = require('gulp-concat');

var coffeeSources = ['./components/cofee/tagline.coffee'];
var jsSources = ['./components/scripts/pixgrid.js',
                './components/scripts/rclick.js',
                './components/scripts/tagline.js',
                './components/scripts/template.js'];
var sassSources = ['./components/sass/style.scss'];
var htmlSources = ['./builds/devolopment/*.html']

gulp.task('coffee', function() {
    gulp.src(coffeeSources)
      .pipe(coffee({bare:true})
        .on('error',gutil.log))
        .pipe(gulp.dest('./components/scripts'))
});

gulp.task('js',['coffee'], function() {
    gulp.src(jsSources)
    .pipe(concat('script.js'))
    .pipe(browserify())
    .pipe(gulp.dest('./builds/devolopment/js'))
    .pipe(connect.reload())
});

gulp.task('compass', function() {
    gulp.src(sassSources)
    .pipe(compass({
        sass: './components/sass/',
        image: './builds/devolopment/images',
        style: 'expanded'
    })
    .on('error',gutil.log))
    .pipe(gulp.dest('./builds/devolopment/css'))
    .pipe(connect.reload())
    
});
gulp.task('watch', function() {
    gulp.watch(htmlSources, ['html']);
    gulp.watch('./builds/devolopment/js/*.json', ['json']);
    gulp.watch(coffeeSources, ['coffee']);
    gulp.watch(jsSources, ['js']);
    gulp.watch('./components/sass/*.scss', ['compass']);
});

gulp.task('connect', function() {
    connect.server({
        root: './builds/devolopment',
        livereload : true
    })
});
gulp.task('html', function() {
    gulp.src(htmlSources)
    .pipe(connect.reload())
});
gulp.task('json', function() {
    gulp.src("./builds/devolopment/js/*.json")
    .pipe(connect.reload())
});
gulp.task('default',['html','json','coffee','js','compass','connect','watch']);