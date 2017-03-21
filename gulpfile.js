let gulp = require("gulp");
let fs = require("fs");
let ts = require("gulp-typescript");

let tsProject = ts.createProject('tsconfig.json');

let packageJson = JSON.parse( fs.readFileSync('./package.json').toString() );

gulp.task('src', function () {
    return tsProject.src().pipe(tsProject()).pipe(gulp.dest('./build'));
});

gulp.task('package', ['src'], function () {
    require('dts-bundle').bundle({
        name: packageJson.name,
        out: 'module.d.ts',
        main: './build/index.d.ts'
    });
});

gulp.task('default', ['package']);

gulp.task("watch", ["package"], function() {
  gulp.watch('src/**/*.ts', ["package"]);
});
