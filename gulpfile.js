import gulp from "gulp";
import uglify from "gulp-uglify";

export function minifyJS() {
    return gulp.src('src/assets/js/*.js') // Adjust the source file glob pattern
      .pipe(uglify())
      .pipe(gulp.dest('dist/js')); // Adjust the destination folder
  }

export function watch() {
    gulp.watch('src/assets/js/*.js', minifyJS);
  }