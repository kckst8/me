var gulp        = require('gulp');
var deploy      = require('gulp-gh-pages');

/**
 * Push build to kckst8.github.io master branch
 */
var options = { 
    remoteUrl: "https://github.com/kckst8/kckst8.github.io.git",
    branch: "master"};
gulp.task('deploy', function () {
    gulp.src("dist/**/*.*")
        .pipe(deploy(options));
});