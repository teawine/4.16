var gulp = require("gulp");
var sass = require("gulp-sass");
var minCss = require("gulp-clean-css");
var minJs = require("gulp-uglify");
var clean = require("gulp-clean");
var sequence = require("gulp-sequence");
var minHtml = require("gulp-htmlmin");
var autoprefixer = require("gulp-autoprefixer");
var rev = require("gulp-rev");
var revcollector = require("gulp-rev-collector");
var server = require("gulp-webserver");

var options = {
    removeComments: true,
    collapseWhitespace: true,
    collapseBooleanAttributes: true,
    removeEmptyAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    minifyJS: true,
    minifyCSS: true
};


gulp.task("clean", function() {
    return gulp.src("dist")
        .pipe(clean())
})
gulp.task("minJs", function() {
    return gulp.src("src/js/*.js")
        .pipe(minJs())
        .pipe(rev())
        .pipe(gulp.dest("dist/js"))
        .pipe(rev.manifest())
        .pipe(gulp.dest("dist/js"))
})
gulp.task("minCss", function() {
    return gulp.src("src/css/*.css")
        .pipe(autoprefixer({
            browsers: ['last 2 version Android >= 4.0 ']
        }))
        .pipe(minCss())
        .pipe(rev())
        .pipe(gulp.dest("dist/css"))
        .pipe(rev.manifest())
        .pipe(gulp.dest("dist/css"))
});
gulp.task("copyImg", function() {
    return gulp.src("src/img/*.{png,jpg}")
        .pipe(gulp.dest("dist/img"))
});
gulp.task("copyfont", function() {
    return gulp.src("src/fonts/*")
        .pipe(gulp.dest("dist/fonts"))
});
gulp.task("minHtml", ["minJs", "minCss"], function() {
    return gulp.src(["dist/**/*.json", "src/*.html"])
        .pipe(minHtml(options))
        .pipe(revcollector({
            replaceReved: true
        }))
        .pipe(gulp.dest("dist"))
});

gulp.task("watch", function() {
    gulp.watch("src/css/*.scss", ["mincss", "minhtml"]);
    gulp.watch("src/js/*.js", ["minjs", "minhtml"]);
    gulp.watch("src/images/*.{jpg,png}", ["copyimg", "minhtml"]);
    gulp.watch("src/*.html", ["minhtml", "mincss", "minjs", "copyimg"]);
});

gulp.task("server", function() {
    gulp.src("dist")
        .pipe(server({
            port: 3333,
            open: true,
            livereload: true,
            host: "169.254.5.200",
            middleware: function(req, res, next) {

                next();
            }
        }))
})


gulp.task("default", function(yk) {
    sequence("clean", ["minCss", "minJs", "copyImg", "copyfont"], "minHtml", "watch", "server", yk);
});