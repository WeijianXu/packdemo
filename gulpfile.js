'use strict';
const gulp = require('gulp'),
  jshint = require('gulp-jshint'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  watch = require('gulp-watch'),
  batch = require('gulp-batch'),
  pump = require('pump'); // pump: monitor errors 

const paths = {
  allJs: ['gulpfile.js', 'src/**/*.js', 'test/**/*.js'],
  pubScripts: ['src/public/scripts/**/*.js', 'build/byGulp/public/scripts/', 'dist/gulp/public/scripts/'],
  libScripts: ['src/public/lib/**/*.js', 'build/byGulp/public/lib/', 'dist/gulp/public/lib/']
};
// check js 
gulp.task('jshint', (cb) => {
  pump([
      gulp.src(paths.allJs),
      jshint('.jshintrc'),
      jshint.reporter('jshint-stylish')
    ],
    cb
  );
  /*gulp.src(paths.allJs)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));*/
});
// compress and concat js in public dir
gulp.task('public', (cb) => {
  pump([
      gulp.src(paths.pubScripts[0]),
      uglify(),
      gulp.dest(paths.pubScripts[1]),
      concat('all.min.js'),
      gulp.dest(paths.pubScripts[2])
    ],
    cb
  );
});
// compress and concat js in lib dir
gulp.task('lib', (cb) => {
  pump([
      gulp.src(paths.libScripts[0]),
      uglify(),
      gulp.dest(paths.libScripts[1]),
      concat('all.lib.min.js'),
      gulp.dest(paths.libScripts[2])
    ],
    cb
  );
});
// wathc files' change. But it doesn't work well if you don't use gulp-batch 
gulp.task('watch', () => {
  return watch(['src/public/scripts/**/*.js', 'src/public/styles/**/*.less'], batch(function(events, done) {
    gulp.start('build', done);
  }));
});

// stream compile, more quickly
gulp.task('build', ['jshint', 'public', 'lib']);
gulp.task('default', ['build']);