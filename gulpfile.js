const gulp = require('gulp');
const jade = require('gulp-jade');
const stylus = require('gulp-stylus');
const autoprefixer = require('gulp-autoprefixer');
const webserver = require('gulp-webserver');
const gutil = require('gulp-util');
const imgmin = require('gulp-imagemin');

gulp.task('jade', () => {
    gulp.src('./src/view/*.jade')
        .pipe(jade({
            pretty: true
        }).on('error', gutil.log))
        .pipe(gulp.dest('./dist'))
});

gulp.task('stylus', () => {
    return gulp.src('./src/stylus/index.styl')
        .pipe(stylus())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./dist/css'))
});

gulp.task('watch', () => {
    gulp.watch('./src/blocks/**/*.styl', ['stylus']);
    gulp.watch('./src/blocks/**/*.jade', ['jade']);
    gulp.watch('./src/stylus/**/*.styl', ['stylus']);
    gulp.watch('./src/view/*.jade', ['jade']);
});

gulp.task('webserver', () => {
    gulp.src('./dist/')
        .pipe(webserver({
            livereload: true,
            open: true
        }))
});

gulp.task('imgmin', () => {
    gulp.src('./src/img/*')
        .pipe(imgmin())
        .pipe(gulp.dest('./dist/images'))
})

gulp.task('default', ['jade', 'stylus', 'watch', 'webserver']);