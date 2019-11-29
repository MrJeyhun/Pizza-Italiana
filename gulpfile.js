const gulp = require("gulp");
const autoprefixer = require("gulp-autoprefixer");
const clean = require("gulp-clean");
const css = require("gulp-clean-css");
const concat = require("gulp-concat");
const imagemin = require("gulp-imagemin");
const minify = require("gulp-js-minify");
const sass = require("gulp-sass");
const uglify = require("gulp-uglify");

/* 
Top level functions:
    gulp.task - Define tasks
    gulp.src - Point to files to use
    gulp.dest - Points to folder to output
    gulp.wathc - Wathc files and folder for changes 

*/

//cleaning everything in "/dist"
const cleanDist = () => {
  return gulp.src("dist/*/").pipe(clean());
};
//copy html to dist
const copyHtml = () => {
  return gulp.src("*.html").pipe(gulp.dest("dist"));
};
//compile sass to css
const sassSet = () => {
  return gulp
    .src("assets/sass/styles.sass")
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(css())
    .pipe(gulp.dest("dist/css/"));
};
//optimize all js scripts
const jsOpt = () => {
  return gulp
    .src("assets/js/*.js")
    .pipe(concat("index.js"))
    .pipe(uglify())
    .pipe(minify())
    .pipe(gulp.dest("dist/js"));
};
//optimize all images
const imgOpt = () => {
  return gulp
    .src("assets/img/*")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/img/"));
};

gulp.task("setGulp", gulp.series(cleanDist, copyHtml, sassSet, jsOpt, imgOpt));

//monitor source files
gulp.task("watch", async function() {
  gulp.watch("assets/js/*.js", gulp.series(jsOpt));
  gulp.watch("assets/img/*", gulp.series(imgOpt));
  gulp.watch("assets/sass/*.sass", gulp.series(sassSet));
  gulp.watch("*.html", gulp.series(copyHtml));
});
