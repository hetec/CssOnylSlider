const gulp = require('gulp');
// Plugins
const jade = require('gulp-jade'),
      sass = require('gulp-sass'),
      runSeq = require('run-sequence')
      del = require('gulp-delete-file'),
      browserSync = require('browser-sync').create();

// tasks
// jade
gulp.task('jade', () => {
  return gulp.src('./src/templates/**/*')
      .pipe(jade())
      .pipe(gulp.dest('./dist/templates'))
      .pipe(browserSync.stream());
})

gulp.task('mv-index', () => {
  return gulp.src('./dist/templates/index.html')
  .pipe(gulp.dest('./dist/'))
  .pipe(browserSync.stream());
})

gulp.task('build-templates', () => {
  runSeq('jade', 'mv-index');
});

// sass

gulp.task('sass', () => {
  gulp.src('./src/sass/*.sass')
      .pipe(sass())
      .pipe(gulp.dest('./dist/css/'))
      .pipe(browserSync.stream());
});

// move images
gulp.task('mv-images', () => {
  gulp.src('./src/img/**/*')
      .pipe(gulp.dest('./dist/img/'))
      .pipe(browserSync.stream());
})

// browser-sync
gulp.task('serve', ['build-templates', 'sass', 'mv-images'], () => {
  browserSync.init({
    server: './dist',
    browser: 'google chrome'
  })

  gulp.watch('./src/templates/**/*.jade', ['build-templates']);
  gulp.watch('./src/sass/**/*.sass', ['sass']);
})

// Default task ran if we call 'gulp'
// We use this to execute all task and then watch them
// If we need sync execution (default is async) we could use run-sequence
gulp.task('default', ['serve']);