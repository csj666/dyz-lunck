/*
 * @Author: chenshujiang 
 * @Date: 2018-11-05 08:52:53 
 * @Last Modified by: chenshujiang
 * @Last Modified time: 2018-11-05 09:46:04
 */
//运行指令
// npm  dev
var gulp = require("gulp");
var sass = require("gulp-sass");
var server = require("gulp-webserver");
var clean = require("gulp-clean-css");
var uglify = require("gulp-uglify");
//搭建服务器
gulp.task("devServer", function() {
    return gulp.src("src")
        .pipe(server({
            port: 8888,
            middlesave: function() {
                next();
            }
        }))
});
//编译scss
gulp.task("devScss", function() {
    return gulp.src("./src/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("./src/css"))
});
//监听
gulp.task("devwatch", function() {
    return gulp.watch("./src/scss/*.scss", gulp.series("devScss"));
});
//压缩  css
gulp.task("clonecss", function() {
    return gulp.src("./src/css/*.css")
        .pipe(clean())
        .pipe(gulp.dest("./dist/css"))
});
//压缩js
gulp.task("clonejs", function() {
    return gulp.src("./src/js/*.js")
        .pipe(uglify())
        .pipe(gulp.dest("./dist/js"))
});
//串执行
gulp.task("dev", gulp.series("devScss", "devServer", "clonecss", "clonejs", "devwatch"));