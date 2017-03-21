let gulp = require('gulp');
let ts = require('gulp-typescript');
let tsProject = ts.createProject('tsconfig.json');

gulp.task("src", function() {  
    return tsProject.src()
        .pipe(tsProject())
        .pipe(gulp.dest('./build'));
});

gulp.task("default", ["src"]);

gulp.task("watch", ["src"], function() {
  gulp.watch('src/**/*.ts', ["src"]);
});
