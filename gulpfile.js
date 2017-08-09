//require need modules
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    flatten = require('gulp-flatten'), //不创建子目录
    react = require('gulp-react'),
    rev = require('gulp-rev'),
    revCollector = require('gulp-rev-collector'),
    jshint = require('gulp-jshint'),
    sequence = require('gulp-run-sequence'),
    del = require('del'),
    Sass = require('gulp-sass'),
    combine = require('gulp-seajs-combine');


//ssh start
(function(config) {
  var GulpSSH = require('gulp-ssh');
  var sshConfig = config.ssh;
  var gulpSSH = new GulpSSH({
      ignoreErrors: false,
      sshConfig: sshConfig
  });

  gulp.task('upload', ['execSSH'], () => {
      console.log('开始上传..');
      config.mapToRemote.forEach(function(item) {
        gulp.src( item[0] )
          .pipe(gulpSSH.dest( item[1] ))
      })
      return;
  });
  //删除服务器旧文件
  gulp.task('execSSH', () => {
      console.log('删除服务器上现有文件...');
      return gulpSSH.shell(config.commands);
  });
})( require('./config.upload.js') );
//ssh end



/***************************************************************/
/*clear folder*/
gulp.task('del', function() {
    del(['./rev-manifest.json', './compile/js/*', './compile/css/*.css', './compile/app/*']);
});
/***************************************************************/

/***************************************************************/
/*compile all .scss files*/
gulp.task('sass', function() {
    return gulp.src(['./develop/**/*.scss'])
        //.pipe( Sass({outputStyle: 'compressed'}) )
        .pipe(Sass())
        .pipe(flatten())
        .pipe(rev())
        .pipe(gulp.dest('./compile/css/'))
        .pipe(rev.manifest({
            merge: true,
            base: ''
        }))
        .pipe(gulp.dest('./'))
});
/***************************************************************/

/***************************************************************/
/*compile react's jsx files*/
gulp.task('react', function() {
    return gulp.src('./develop/**/*.jsx')
        .pipe(flatten())
        .pipe(react())
        //.pipe( rev() )
        //.pipe( uglify() )
        .pipe(jshint())
        .pipe(jshint.reporter("default"))
        .pipe(gulp.dest('./compile/js/'))
        // .pipe( rev.manifest( {
        //   merge: true,
        //   base: ''
        // } ) )
        // .pipe( gulp.dest( './' ) )
});
/***************************************************************/

/***************************************************************/
/*uglify all .js files*/
gulp.task('uglify', function() {
    return gulp.src('./develop/**/*.js')
        .pipe( flatten() )
        // .pipe( rev() )
        // .pipe( uglify() )
        .pipe(jshint())
        .pipe(gulp.dest('./compile/js/'))
        // .pipe( rev.manifest( {
        //   merge: true,
        //   base: ''
        //   //path: 'jsDev.json'
        // } ) )
        // .pipe( gulp.dest( './' ) )
});
/***************************************************************/

/*****************************************************/
/*修改html文件中引用的css文件，加入md5值*/
gulp.task('vul', function() {
        return gulp.src(['./rev-manifest.json', './develop/app/**/*.jsp'])
            .pipe(revCollector({
                replaceReved: true
            }))
            .pipe(gulp.dest('./compile/app/'));
    })
    /*****************************************************/

/*****************************************************/
/*更新上传到git上的文件*/
var gitPath = './服务器-git目录/CameraGuard-S/';
gulp.task('del-git', function() {
    del([
        gitPath + 'develop/*',
        gitPath + 'src/main/webapp/public/js/*',
        gitPath + 'src/main/webapp/public/css/*',
        gitPath + 'src/main/webapp/WEB-INF/app/*'
    ]);
});

gulp.task('update-develop', function() {
    return gulp.src(['./develop/**/*'])
        .pipe(gulp.dest(gitPath + 'develop/'));
})
gulp.task('update-js', function() {
    return gulp.src(['./compile/js/**/*'])
        .pipe(gulp.dest(gitPath + 'src/main/webapp/public/js/'));
})
gulp.task('update-css', function() {
    return gulp.src(['./compile/css/**/*'])
        .pipe(gulp.dest(gitPath + 'src/main/webapp/public/css/'));
})
gulp.task('update-app', function() {
    return gulp.src(['./compile/app/**/*'])
        .pipe(gulp.dest(gitPath + 'src/main/webapp/WEB-INF/app/'));
})

gulp.task('update-git', function() {
    sequence('del-git', 'update-js', 'update-css', 'update-app', 'update-develop');
})

/*****************************************************/

/*****************************************************/
//压缩seajs代码
gulp.task('seajs', function() {
        return gulp.src(['./compile/js/index.js'])
            .pipe(combine(null))
            .pipe(gulp.dest('./compile/js/index/'));
    })
    /*****************************************************/

/*****************************************************/
//需要运行的所有任务
gulp.task('task', function() {
    sequence( 'del', 'sass', 'react', 'vul', 'uglify', 'update-git', 'upload' );
})
    /*****************************************************/

/*****************************************************/
//监听文件改动
gulp.task('watch', function() {
        gulp.watch('./develop/**/*', ['task']);
    })
    /*****************************************************/

/*****************************************************/
/*set default task*/
gulp.task('default', function() {
    sequence('watch', 'task');
    //sequence( 'seajs' );
});
/*****************************************************/