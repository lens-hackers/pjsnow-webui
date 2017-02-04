const gulp = require('gulp');
const path = require('path');
const server = require('gulp-develop-server');
const named = require('vinyl-named');
const plumber = require('gulp-plumber');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');

gulp.task('build', (done) => {
    const clientJsDir = path.join(__dirname, "client/js");
    const jsConfig = {
        output: { path: __dirname , filename: '[name].bundle.js' },
        devtool: 'source-map'
    };
        
    gulp.src('./client/js/**/*.js')
        .pipe(plumber())
        .pipe(named())
        .pipe(webpackStream(jsConfig))
        .pipe(gulp.dest('build'));
    done();
});

gulp.task('build-prod', (done) => {
    done();
});

gulp.task('server', (done) => {
    server.listen({ path: 'server/run.js' }, () => {
        done();
    });
});

gulp.task('serverRestart', (done) => {
    server.restart((err) => {
        if(err) {
            console.log(err);            
        }
        done();
    });
});

gulp.task('watch', (done) => {
    gulp.watch('client/**/*', gulp.series('build'));
    gulp.watch('server/**/*.js', gulp.series('serverRestart'));
    done();
});

gulp.task('default', gulp.series(
    'build',
    'server',
    'watch'
));