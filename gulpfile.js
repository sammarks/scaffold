var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var concat = require('gulp-concat');

var paths = {
	scss: {
		source: [
			// 'bower_components/package-name/style.scss',
			'scss/default.scss'
		],
		destination: 'compiled/scss'
	},
	css: {
		source: [
			'compiled/scss/*.css',
			// 'bower_components/package-name/style.css',
			'css/**/*.css'
		]
	},
	font: {
		source: [
			// 'bower_components/package-fonts/fonts/*'
		]
	},
	js: {
		source: [
			'js/*.js'
		]
	},
	compiled: 'compiled'
};

gulp.task('scss', function() {
	return gulp.src(paths.scss.source)
		.pipe(sass())
		.pipe(gulp.dest(paths.scss.destination));
});

gulp.task('css', ['scss'], function() {
	gulp.src(paths.css.source)
		.pipe(concat('default.css'))
		.pipe(gulp.dest(paths.compiled));
});

gulp.task('fonts', function() {
	gulp.src(paths.font.source)
		.pipe(gulp.dest(paths.compiled + '/fonts'));
});

gulp.task('js', function() {
	gulp.src(paths.js.source)
		.pipe(concat('default.js'))
		.pipe(gulp.dest(paths.compiled));
});

gulp.task('watch', function() {
	gulp.watch(paths.scss.source, ['css']);
	gulp.watch(paths.js.source, ['js']);
	gulp.watch(paths.font.source, ['fonts']);
});

gulp.task('default', ['css', 'js', 'fonts', 'watch']);
