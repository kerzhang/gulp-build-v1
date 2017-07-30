const gulp =  require('gulp');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const clean = require('gulp-clean');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const cleancss = require('gulp-clean-css');

/*  As a developer, I should be able to run the gulp scripts 
command at the command line to concatenate, minify, 
and copy all of the project’s JavaScript files into an all.min.js file 
that is then copied to the dist/scripts folder. */
/* As a developer, when I run the gulp scripts or gulp styles commands at the command line, 
source maps are generated for the JavaScript and CSS files respectively. */
gulp.task('scripts',  () => {
    // return gulp.src(['js/*.js', 'js/circle/*.js'])
    return gulp.src('./js/**/*.js')
                .pipe(sourcemaps.init())
                .pipe(concat('all.min.js'))
                .pipe(uglify())
                .pipe(sourcemaps.write('./'))
                .pipe(gulp.dest('./dist/js'));
});

/* As a developer, I should be able to run the gulp styles command 
at the command line to compile the project’s SCSS files into CSS, 
then concatenate and minify into an all.min.css file 
that is then copied to the dist/styles folder. */
gulp.task('compileCss', () => {
     return gulp.src('./sass/**/*.scss')
                .pipe(sass().on('error', sass.logError))
                .pipe(gulp.dest('./css'));
});

gulp.task('renameCss', ['compileCss'], () => {
    return gulp.src("./css/global.css")
                .pipe(rename("all.min.css"))
                .pipe(gulp.dest("./css"));
});

gulp.task('cleanGlobalCss', ['renameCss'], () => {
    return gulp.src('./css/global.css', {read: false})
                .pipe(clean());
});

gulp.task('styles', ['cleanGlobalCss'], () => {
    return gulp.src('./css/*.css')
                .pipe(sourcemaps.init())
                .pipe(cleancss())
                .pipe(sourcemaps.write('./'))
                .pipe(gulp.dest('./dist/styles'))
});

/* As a developer, I should be able to run the gulp images command 
at the command line to optimize the size of the project’s JPEG and PNG files, 
and then copy those optimized images to the dist/content folder. */
gulp.task('images', () => {
    return gulp.src(['./images/*.jpg','./images/*.png'])
                .pipe(imagemin())
                .pipe(gulp.dest('./dist/content'));
});

/* As a developer, I should be able to run the gulp clean command 
at the command line to delete all of the files and folders in the dist folder. */
gulp.task('clean', () => {
    return gulp.src(['./dist/*', './css/*'], {read: false})
                .pipe(clean());
});

/* As a developer, I should be able to run the gulp build command 
at the command line to run the clean, scripts, styles, and images tasks 
with confidence that the clean task completes before the other commands. */
gulp.task('build', () =>{
    
});

/* As a developer, I should be able to run the gulp command at the command line 
to run the build task and serve my project using a local web server. */
gulp.task('default', () => {
    
});

/* As a developer, when I run the default gulp command, 
it should continuously watch for changes to any .scss file in my project. 
When there is a change to one of the .scss files, the gulp styles command is run 
and the files are compiled, concatenated, and minified to the dist folder. 
My project should then reload in the browser, displaying the changes. */
