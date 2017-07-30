var path = require('path');
var gulp = require('gulp');
var babel = require('gulp-babel');
var webpack = require('webpack-stream');
var sass = require('gulp-sass');
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
    return gulp.src([path.join(__dirname, "source/*.js"), path.join(__dirname, "source/controllers/*.js"), path.join(__dirname, "source/models/*.js")],{base: "source"})
        .pipe(babel({
            presets: ["react","env"],
            plugins: ["transform-async-to-generator","transform-es2015-modules-commonjs","transform-runtime"]
        }))
        .pipe(gulp.dest(path.join(__dirname,"build")));
});

gulp.task('babel-react', function(){
    return gulp.src([path.join(__dirname, "source/react/**/**")])
        .pipe(babel({
            presets: ["es2015","react","stage-0"]
        }))
        .pipe(gulp.dest(path.join(__dirname,"build/react")));
});


gulp.task('webpack-react', function(){
    return gulp.src([path.resolve(__dirname,"build/react/*.js"), path.resolve(__dirname, "build/react/**/*.js") ])
        .pipe(webpack(
            {
                entry: entries,
                output: {
                    path: path.join(__dirname,"build/public/js"),
                    filename: "[name]"
                },
                module: {
                    loaders : [
                        {
                            test : /\.jsx?/,
                            loader : 'babel',
                            exclude: /node_modules/
                        }
                    ]
                }
            }
        ))
        .pipe(gulp.dest(path.join(__dirname,"build/public/js")));
});

gulp.task('copy', function(){
    return gulp.src(["src/public/**/**/*","src/views/**"],{base: "src"})
        .pipe(gulp.dest(path.join(__dirname,"build")));
});

gulp.task('sass', function () {
    gulp.src(path.join(__dirname, "src/sass/**/*.scss"))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(path.join(__dirname,"build/public/css")));
});

gulp.task('default',['babel-server', 'babel-react', 'sass', 'copy']);
gulp.watch('src/**/**/**/**', ['babel-react', 'babel-server', 'sass', 'copy']);
gulp.watch('build/react/*.js', ['webpack-react']);