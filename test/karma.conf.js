module.exports = function(config) {
  config.set({

    basePath: '..',

    frameworks: ['browserify', 'mocha', 'chai'],

    files: [
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'node_modules/es5-shim/es5-shim.js', //required until phantomjs 2
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/ui-utils/ui-utils.js',
      'bower_components/angular-bootstrap/ui-bootstrap.js',

      // don't watch patterns already watched by the browserify preprocessor
      { pattern: 'test/**/*.spec.js', watched: false, included: true, served: true }
    ],

    exclude: [
      'test/e2e.spec.js'
    ],

    preprocessors: {
     'test/**/*.spec.js': [ 'browserify' ]
    },

    browserify: {
      debug: true,
      transform: [ 'browserify-shim', 'brfs' ]
    },

    reporters: ['progress'],

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,

    browsers: ['PhantomJS'],

    singleRun: false
  });
};
