"use strict";

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename');

gulp.task("concatScripts", function() {
  gulp.src(['vendors/easeljs-0.8.1.min.js', 
            'js/game.js',
            "js/runner-gameObject.js",
            "js/movable-gameobject.js",
            "js/hero.js",
            "js/commonShapes.js",
            "js/platform.js",
            "js/coin.js",
            "js/crushObject.js",
            "js/runner-game.js"
            ])
      .pipe(concat('app.js'))
      .pipe(gulp.dest('js'));
});

gulp.task("minifyScripts", function() {
  gulp.src('js/app.js')
      .pipe(uglify())
      .pipe(rename("app.min.js"))
      .pipe(gulp.dest('js'));
});


