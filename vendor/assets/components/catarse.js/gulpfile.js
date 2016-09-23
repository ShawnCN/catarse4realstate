var gulp = require('gulp');
var argv = require('yargs').argv;
var concat = require('gulp-concat');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');  
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var Server = require('karma').Server;

var sources = ['src/c.js', 'src/h.js', 'src/models.js', 'src/c/**/*.js','src/**/*.js'];
/**
 * Run test once and exit
 */
gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js'
  }, done).start();
});

gulp.task('lint', function(){
  gulp.src(sources)
    .pipe(plumber())
    .pipe(jscs())
    .pipe(jshint());
});

gulp.task('dist', function(){
  gulp.src(sources)
  .pipe(plumber())
  .pipe(sourcemaps.init())
    .pipe(concat('catarse.js'))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('dist'))
  .pipe(uglify())
  .pipe(rename('catarse.min.js'))
  .pipe(gulp.dest('dist'));
});

gulp.task('watch', function(){
  (argv.q) ? gulp.watch(sources, ['dist']) :
  (argv.notest) ? gulp.watch(sources, ['lint', 'dist']) :
  gulp.watch(sources, ['test', 'lint', 'dist']);
});

gulp.task('default', ['watch']);
gulp.task('build', ['lint', 'test', 'dist']);