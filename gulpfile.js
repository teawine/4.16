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
 var gulp = require("gulp");
 var sass = require("gulp-sass");
 var mincss = require("gulp-clean-css");