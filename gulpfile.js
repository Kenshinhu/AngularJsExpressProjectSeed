var gulp = require('gulp');
var jshint = require('gulp-jshint');
var nodemon = require('gulp-nodemon');
//var rename = require("gulp-rename");
var concat = require("gulp-concat");
var del = require('del');

gulp.task('jshint', function() {
    gulp.src([
        './component/*.js'
    ])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('copy',function(){
    return gulp.src([
        './component/*',
        '!./component/src'
    ], {
        dot: true
    }).pipe(gulp.dest(function(file) {
        return 'dist';
    }));
})


gulp.task('clean', function(cb) {
    del(['dist/*', '!dist/.git'], {dot: true}, cb);
});

gulp.task('scripts', function() {
    gulp.src([
        './component/src/*.js',
        './component/src/**/*.js'
    ])
        .pipe(concat('all.js'))
        //.pipe(rename('all.min.js'))
        //.pipe(uglify())
        .pipe(gulp.dest('./dist'));
});


gulp.task('start', function () {
    nodemon({
        script: './bin/www.js'
        , ext: 'js html'
        , env: {
            'NODE_ENV': 'development',
            "DEBUG":'*'
        }
    });
});

gulp.task('default',['clean','jshint', 'copy','scripts'], function (cb) {

});