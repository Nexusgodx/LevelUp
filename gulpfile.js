const gulp = require('gulp'),
    browsersync = require('browser-sync').create(),
    webpack = require('webpack-stream'),
    sass = require('gulp-sass')(require('sass')),
    autoprefixer = require('gulp-autoprefixer');



    const src = './src';


    gulp.task('styles', function() {
        return gulp.src('./src/scss/style.scss')
          .pipe(sass().on('error', sass.logError))
          .pipe(autoprefixer() )
          .pipe(gulp.dest('./src/css'))    
          .pipe(browsersync.stream());
        })

    gulp.task('build', function(){
        return gulp.src('src/assets/js/main.js')
        .pipe(webpack({
            mode: 'development',
            output: {
                filename: 'bundle.js'
            },
            watch: false,
            devtool: 'source-map',
            module: {
                rules: [
                    {
                        test: /\.m?js$/,
                        exclude: /(node_modules|bower_components)/,
                        use: {
                          loader: 'babel-loader',
                          options: {
                            presets: [['@babel/preset-env', {
                                debug: true,
                                corejs: 3,
                                useBuiltIns: "usage"
                            }]]
                          }
                        }
                      }
                    ]
            }
        })
        
        )
        .pipe(gulp.dest(src))
    })

    gulp.task('watch', function() {
        browsersync.init({
            server: {
                baseDir: "src/"
            }
        });

        // gulp.watch('src/js/**/*.js', gulp.parallel('build'));
        gulp.watch('src/scss/**/*.scss', gulp.parallel('styles'));
    })

    gulp.task('default', gulp.parallel('styles', 'watch'));