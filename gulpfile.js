const    gulp = require('gulp'),
 autoprefixer = require('gulp-autoprefixer'),
   livereload = require('gulp-livereload');
   concatCSS = require('gulp-concat-css'),
   minifyCSS = require('gulp-clean-css');
 

gulp.task('default', () => {
    gulp.src('CSS/style.css')
        .pipe(concatCSS('bundles.css'))
        .pipe(minifyCSS())
        .pipe(rename('bundle.min.css'))
        .pipe(gulp.dest('out'))
        
});

gulp.task('watch', () => {
    gulp.watch('CSS/*.css', ['default'])
})

/*.pipe(livereload());
.pipe(autoprefixer({
    browsers: ['last 5 versions'],
    cascade: false
}))*/