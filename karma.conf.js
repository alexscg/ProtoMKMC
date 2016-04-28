module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai', 'chai-sinon'],
    files: [
	  'node_modules/jquery-2.1.1.min.js',
	  'node_modules/chai/chai.js',
	  'node_modules/sinon/pkg/sinon.js',
	  'node_modules/chai-jquery/chai-jquery.js',
	  'src/main/content/jcr_root/etc/designs/core/clientlib/js/pre.js',
	  'src/main/content/jcr_root/etc/designs/core/clientlib/js/sni-util.js',
	  'tests/pre.spec.js',
      'tests/sni-util.spec.js'
    ],
    exclude: [
    ],
    preprocessors: {
	  'src/js/*.js': ['jshint']
    },
    reporters: ['progress', 'html'],
    htmlReporter: {
      outputDir: 'target/karma_reports',
      templatePath: 'target/karma_reports/jasmine_template.html'
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
	singleRun: true,
	browsers: ['PhantomJS']
  });
};
