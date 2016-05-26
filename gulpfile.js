var gulp = require('gulp');
var sass = require('gulp-sass');
var htmlhint = require('gulp-htmlhint');
var browserSync = require('browser-sync');

// sassのコンパイル用タスク
gulp.task('sass', function(){
  // 入力するscssファイルを指定
  gulp.src('app/src/sass/*.scss')
    .pipe(sass()) // sassをコンパイル
    //出力先を指定
    .pipe(gulp.dest('app/product/css')) // コンパイルしたcssファイルを出力
    .pipe(browserSync.stream());
});

// html構文チェック用タスク
gulp.task('html', function(){
  gulp.src('app/src/**/*.html')
    .pipe(htmlhint('.htmlhintrc')) // 引数に.htmlhintrcへのパスを指定する
    .pipe(htmlhint.reporter())
    .pipe(htmlhint.failReporter())
    .pipe(gulp.dest('app/product/'))
    .pipe(browserSync.stream());
});


gulp.task('default', function(){
  browserSync.init({
    server: {
      baseDir: "./app/product"
    }
  });
  gulp.watch("app/src/sass/*.scss", ['sass']);
  gulp.watch("app/src/**/*.html", ['html']);
});
