const gulp      = require('gulp');
const deploy    = require('gulp-gh-pages');
const del       = require('del');
const tsc       = require('gulp-typescript');
const tscConfig = require('./tsconfig.json')
/**
 * Empty dist dir
 */
gulp.task('clean', function () {
    return del('dist/**/*');
});

/**
 * compile and deploy to dist
 */
gulp.task('compile', ['clean'], function () {
  return gulp
    .src('app/**/*.ts')
    .pipe(tsc(tscConfig.compilerOptions))
    .pipe(gulp.dest('dist/app'));
});

/**
 * copy dependencies to dist/lib
 */
gulp.task('copy:libs',['clean'], function() {
   return gulp.src([
        'node_modules/angular2/bundles/angular2-polyfills.js',
        'node_modules/systemjs/dist/system.src.js',
        'node_modules/rxjs/bundles/Rx.js',
        'node_modules/angular2/bundles/angular2.dev.js',
        'node_modules/angular2/bundles/router.dev.js'
       ])
       .pipe(gulp.dest('dist/lib')) 
});

/**
 * copy other static files (html, css, etc.)
 * TODO - move these to seperate tasks
 */
gulp.task('copy:content',['clean'], function() {
    return gulp.src([
        'app/**/*', 
        'content/**/*',
        'index.html', 
        'styles.css', 
        '!app/**/*.ts',
        'CNAME'
        ], 
        { base : './' })
        .pipe(gulp.dest('dist'))
});

/**
 * full build 
 */
gulp.task('build', [
    'compile', 
    'copy:libs', 
    'copy:content'
    ]);
    
/**
 * Push dist build to kckst8.github.io master branch
 * TODO re-add .git extension
 */
var options = { 
    remoteUrl: "https://kckst8:Ireland46@github.com/kckst8/kckst8.github.io.git",
    branch: "master"};
gulp.task('deploy', function () {
    gulp.src("dist/**/*.*")
        .pipe(deploy(options));
});