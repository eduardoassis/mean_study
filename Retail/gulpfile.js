var gulp = require('gulp');
var mocha = require('gulp-mocha');

gulp.task('test', function() {
  var error = false;
  gulp.
    src('./tests/users.js').
    pipe(mocha()).
    on('error', function(e) {
      console.log('Tests failed!');
      console.log(e);
      error = true;
    }).
    on('end', function() {
      if (!error) {
        console.log('Tests succeeded!');
        process.exit(0);
      }
    });
});

gulp.task('watch', function() {
  gulp.watch(['./models/*.js', './controllers/*.js', './tests/*.js'], ['test']);
});