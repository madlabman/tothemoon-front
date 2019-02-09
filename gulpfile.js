const gulp              = require('gulp');
const gulpLoadPlugins   = require('gulp-load-plugins');

const babelify          = require('babelify');
const browserify        = require('browserify');
const browserSync       = require('browser-sync').create();
const buffer            = require('vinyl-buffer');
const del               = require('del');
const fs                = require('fs');
const partialify        = require('partialify');
const runSequence       = require('run-sequence');
const source            = require('vinyl-source-stream');
const vueify            = require('vueify');

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

let dev = false;

// Flat files
gulp.task('flat', () => {
    return gulp.src('./assets/flat/*.*')
        .pipe(gulp.dest('./dist'))
        .pipe(reload({stream:true}));
});

// Pug
gulp.task('html', () => {
    return gulp.src('./assets/html/**/*.pug')
        .pipe($.plumber())
        .pipe($.pug({
            pretty: true
        }))
        .pipe(gulp.dest('./dist'))
        .pipe(reload({stream:true}));
});

// SASS
gulp.task('sass', () => {
    return gulp.src('./assets/sass/*.sass')
        .pipe($.plumber())
        .pipe($.if(dev, $.sourcemaps.init()))
        .pipe($.sass().on('error', $.sass.logError))
        .pipe($.autoprefixer({
            browsers: [
                'last 8 versions',
                'android 4',
                'opera 12'
            ]
        }))
        .pipe($.if(!dev, $.cssmin()))
        .pipe($.if(dev, $.sourcemaps.write()))
        .pipe(gulp.dest('./dist/css'))
        .pipe(reload({stream:true}));
});

// JS
gulp.task('js', () => {
    return gulp.src('./assets/js/**/*.js')
        .pipe($.plumber())
        .pipe($.babel())
        .pipe($.uglify())
        // .pipe($.concat('build.js'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(reload({stream: true}));
});

// JS
gulp.task('vue-js', () => {
    browserify('./assets/vue-js/main.js')
        .transform(babelify)
        .transform(partialify)
        .transform(vueify)
        .bundle()
        .on('error', function (err) {
            console.log('***** BROWSERIFY ERROR: ' + err.message);
            // this.emit('end');
        })
        .pipe(source('spa.js'))
        .pipe(buffer())
        .pipe($.uglify())
        .pipe(gulp.dest('./dist/js'))
        .pipe(reload({stream:true}));
});

function lint(files) {
    return gulp.src(files)
        .pipe($.eslint({ fix: true }))
        .pipe($.eslint.format())
        .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
}

gulp.task('lint', () => {
    return lint('./assets/js/**/*.js')
        .pipe(gulp.dest('./dist/js'));
});

// Images
gulp.task('images', () => {
    return gulp.src('./assets/img/**/*')
        .pipe($.plumber())
        .pipe($.imagemin([
            // $.imagemin.jpegtran({progressive: true}),
            // $.imagemin.optipng({optimizationLevel: 3}),
        ]))
        .pipe(gulp.dest('./dist/img'));
});

// Fonts
gulp.task('fonts', () => {
    return gulp.src('./assets/fonts/**/*')
        .pipe($.plumber())
        .pipe($.flatten())
        .pipe(gulp.dest('./dist/fonts'));
});

// Bower
gulp.task('bower', function() {
    const filterJS    = $.filter('**/*.js', { restore: true });
    const filterCSS   = $.filter('**/*.css', { restore: true });

    // FontAwesome
    gulp.src('./bower_components/**/*.{otf,eot,svg,ttf,woff,woff2}')
        .pipe($.plumber())
        .pipe($.flatten())
        .pipe(gulp.dest('./dist/fonts'));

    return gulp.src('./bower.json')
        .pipe($.plumber())
        .pipe($.mainBowerFiles())
        // JS
        .pipe(filterJS)
        .pipe($.concat('vendor.js'))
        .pipe($.if(!dev, $.uglify()))
        .pipe(filterJS.restore)
        // CSS
        .pipe(filterCSS)
        .pipe($.concat('vendor.css'))
        .pipe($.cssmin())
        .pipe(filterCSS.restore)
        // Out
        .pipe(gulp.dest('./dist'));
});

// Clean dist
gulp.task('clean:dist', function() {
    return del.sync('./dist');
});

// Build task
gulp.task('build', function (callback) {
    runSequence('clean:dist',
        ['flat', 'html', 'sass', 'js', 'vue-js', 'images', 'fonts', 'bower'],
        callback
    )
});

// BrowserSync
gulp.task('sync', ['build'], () => {
    browserSync.init(['*.css', '*.js', './dist/img/*'], {
        notify: false,
        open: false,
        port: 9090,
        server: {
            baseDir: ['./dist']
        }
    });
});

gulp.task('default', ['build', 'sync'], () => {
    // Watchers
    gulp.watch('assets/img/**/*.+(png|jpg|jpeg|gif|svg)', ['images']);
    gulp.watch('assets/html/**/*.pug', ['html']);
    gulp.watch('assets/sass/**/*.sass', ['sass']);
    gulp.watch('assets/js/**/*.js', ['js']);
    gulp.watch('assets/vue-js/**/*.+(js|vue)', ['vue-js']);
});