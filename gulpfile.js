var path = require('path');
var gulp = require('gulp');
var babel = require('gulp-babel');
var webpack = require('webpack-stream');
var fs = require('fs');

var pageBase;
var entries = {};

try{
    pageBase = path.join(__dirname,"build/react/");
    fs.readdirSync(pageBase).filter(function(file) {
        entries[file] = pageBase+file;
    });

}catch (e){

}
gulp.task('babel-server', function(){
    return gulp.src([path.join(__dirname, "source/*.js"), path.join(__dirname, "source/controllers/*.js")],{base: "source"})
        .pipe(babel())
        .pipe(gulp.dest(path.join(__dirname,"build")));
});

gulp.task('babel-react', function(){
    return gulp.src([path.join(__dirname, "source/react/*.jsx")])
        .pipe(babel())
        .pipe(gulp.dest(path.join(__dirname,"build/react")));
});

gulp.task('webpack-react', function(){
    return gulp.src([path.join(__dirname,"build/react/*.js")])
        .pipe(webpack(
            {
                entry: entries,
                output: {
                    path: path.join(__dirname,"build/public/js"),
                    filename: "[name]"
                }
            }
        ))
        .pipe(gulp.dest(path.join(__dirname,"build/public/js")));
});

gulp.task('copy', function(){
    return gulp.src(["source/public/*","source/views/*"],{base: "source"})
        .pipe(gulp.dest(path.join(__dirname,"build")));
});

gulp.task('default',['babel-server', 'babel-react', 'copy']);
gulp.watch('source/**/**/**', ['babel-react', 'babel-server', 'copy']);
gulp.watch('build/react/*.js', ['webpack-react']);
