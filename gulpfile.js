var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var concat = require('gulp-concat-sourcemap');
var sourcemaps = require('gulp-sourcemaps');

var paths = {
	scss: {
		source: 'scss/default.scss',
		watch: [
			'scss/**/*.scss',
		]
	},
	css: {
		source: [
			// 'bower_components/package-name/style.css',
			'css/**/*.css'
		]
	},
	font: {
		source: [
			// 'bower_components/package-fonts/fonts/*',
			'fonts/*'
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
	return sass(paths.scss.source, { sourcemap: true, trace: true })
		.on('error', function (err) {
			console.error('Error', err.message);
		})
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(paths.compiled));
});

gulp.task('css', ['scss'], function() {
	gulp.src(paths.css.source)
		.pipe(concat('css-concat.css'))
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
	gulp.watch(paths.scss.watch, ['css']);
	gulp.watch(paths.js.source, ['js']);
	gulp.watch(paths.font.source, ['fonts']);
});

gulp.task('default', ['css', 'js', 'fonts', 'watch']);
gulp.task('nowatch', ['css', 'js', 'fonts']);
