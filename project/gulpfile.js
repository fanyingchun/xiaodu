//gulp遵从 commonjs
const gulp = require("gulp");
const htmlmin = require("gulp-htmlmin");
//对当前的html文件进行压缩
gulp.task("copy-html", function () {
  return gulp
    .src("./html/*.html")
    .pipe(
      htmlmin({
        removeEmptyAttibutes: true, // 移出所有空属性
        collapseWhitespace: true, // 压缩 html
      })
    )
    .pipe(gulp.dest("dist/html"))
    .pipe(connect.reload());
});

//处理图片
gulp.task("images", function () {
  return gulp
    .src("./images/*.{jpg,png,gif}")
    .pipe(gulp.dest("dist/images"))
    .pipe(connect.reload());
});

//处理js 如果你使用了第三方库，不需要再进行处理了
gulp.task("scripts", function () {
  return gulp
    .src(["./js/*.js", "!gulpfile.js"])
    .pipe(gulp.dest("dist/js"))
    .pipe(connect.reload());
});

//数据源文件
gulp.task("data", function () {
  return gulp
    .src(["./data/*.json", "!package.json"])
    .pipe(gulp.dest("dist/data"))
    .pipe(connect.reload());
});
//复制文件夹
gulp.task("ico", function () {
  return gulp
    .src(["iconfont/*.*"])
    .pipe(gulp.dest("dist/iconfont"))
    .pipe(connect.reload());
});

//处理scss gulp-sass gulp-minify-css gulp-rename
//如果不重命名，可以批量处理，如果重命名，一个文件一个任务，任务名不能重复
const scss = require("gulp-sass");
const minifyCSS = require("gulp-minify-css");
const rename = require("gulp-rename");
gulp.task("scss", function () {
  return gulp
    .src("./css/*.{scss,sass,css}")
    .pipe(scss())
    .pipe(gulp.dest("dist/css"))

    .pipe(minifyCSS())
    .pipe(rename("header.min.css"))
    .pipe(gulp.dest("dist/css"))

    .pipe(minifyCSS())
    .pipe(rename("common.min.css"))
    .pipe(gulp.dest("dist/css"))
    //这里最后别忘记压缩
    .pipe(minifyCSS())
    .pipe(rename("car.min.css"))
    .pipe(gulp.dest("dist/css"))

    .pipe(minifyCSS())
    .pipe(rename("goods_list.min.css"))
    .pipe(gulp.dest("dist/css"))

    .pipe(minifyCSS())
    .pipe(rename("index_banner.min.css"))
    .pipe(gulp.dest("dist/css"))

    .pipe(minifyCSS())
    .pipe(rename("index_list.min.css"))
    .pipe(gulp.dest("dist/css"))

    .pipe(minifyCSS())
    .pipe(rename("item.min.css"))
    .pipe(gulp.dest("dist/css"))

    .pipe(minifyCSS())
    .pipe(rename("login.min.css"))
    .pipe(gulp.dest("dist/css"))

    .pipe(minifyCSS())
    .pipe(rename("register.min.css"))
    .pipe(gulp.dest("dist/css"))

    .pipe(minifyCSS())
    .pipe(rename("reset.min.css"))
    .pipe(gulp.dest("dist/css"))
    
    .pipe(connect.reload());
});
//先让上面的任务都执行一次，这过程 build
gulp.task(
  "build",
  ["copy-html", "scripts", "images", "data", "scss","ico"],
  function () {
    console.log("项目建立成功");
  }
);

//实现监听
gulp.task("watch", function () {
  gulp.watch("*.html", ["copy-html"]);
  gulp.watch("*.{jpg,png,gif}", ["images"]);
  gulp.watch(["*.js", "!gulpfile.js"], ["scripts"]);
  gulp.watch(["*.json", "!package.json"], ["data"]);
  gulp.watch("./css/*.{scss,sass,css", ["scss"]);
  gulp.watch("iconfont/*.*", ["ico"]);
});

//启动一个临时的服务器
const connect = require("gulp-connect");

gulp.task("server", function () {
  connect.server({
    root: "dist",
    port: 8888,
    livereload: true,
  });
});

//同时启动监听和服务
gulp.task("default", ["watch", "server"]);

