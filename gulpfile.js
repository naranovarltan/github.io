const    gulp = require('gulp'),
 autoprefixer = require('gulp-autoprefixer'),
   livereload = require('gulp-livereload');
 

gulp.task('livereload', function(){
    gulp.src('CSS/style.css')
        .pipe(autoprefixer({
            browsers: ['last 5 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist'))
        .pipe(livereload());
});

gulp.task('default', () => {
    livereload.listen();
    gulp.watch('CSS/style.css', ['livereload']);
});
