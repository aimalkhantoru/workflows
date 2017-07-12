var gulp = require('gulp');
var gutil = require('gulp-util');
var coffee = require('gulp-coffee');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');

var coffeeSources = ['./components/cofee/tagline.coffee'];
var jsSources = ['./components/scripts/pixgrid.js',
                './components/scripts/rclick.js',
                './components/scripts/tagline.js',
                './components/scripts/template.js',]

gulp.task('coffee', function() {
    gulp.src(coffeeSources)
      .pipe(coffee({bare:true})
        .on('error',gutil.log))
        .pipe(gulp.dest('./components/scripts/'))
});

gulp.task('js', function() {
    gulp.src(jsSources)
    .pipe(concat('script.js'))
    .pipe(browserify())
    .pipe(gulp.dest('./builds/devolopment/js/'))
});