MKMC Frontend Unit Testing Framework
====================================

This is a quick step-by-step guide on how to get your testing framework up and running.  It is presumed you are setting up within [Maven][10] build environment, however only the [Maven-Karma plugin][11] integration is dependent on that fact.  This framework can be integrated with any build tool or can run in local isolation.

Tools used: [Node/npm][1], [Karma][2], [Mocha][3], [Chai][4], [Sinon][14]
Karma Plugins: [Karma-Mocha][6], [Karma-Chai][7], [Karma-Chai-Sinon][8], [Sinon-Chai][13], [Karma-JSHint][9], [Chai-jQuery][12]

----------


Installing Prerequisites
----------------------------

First you need to install Node.  It comes with [npm][5] which is the best way to install and manage your packages.

Download your relevant installation file here: [http://nodejs.org/download/](http://nodejs.org/download/) and install it.  This is a global install as you need only one instance of Node and npm per machine.

Add environment variable to your system path, for Windows press *Win+Pause*, *Advanced system Settings*, under *User variables* add `NODE_HOME` with path to Node installation directory as value, usually `C:\Program Files\nodejs`.


Setting Up an Instance
----------------------------

We’ll be installing a bunch of npm modules, so let’s initialize in the root of your project folder to build `package.json` file for us.  *Start*, *Run*, `cmd`, `cd *project folder*` where \*project folder\* is the full path to your project.  i.e. `C:\DEV\R\fnr-wcm-core`.  Once there run `npm init` and answer a few questions.

> - name: Your project name
> - Version: Version of your project, best to start with 0.0.1
> - description: A sentence describing your project
> - entry point: leave default (hit enter)
> - test command: skip (hit enter)
> - git repository: skip (hit enter)
> - keywords: skip (hit enter)
> - author: Your name
> - license: Copyright SNI 2014
> - type `yes`

Your `package.json` file should be created in the root of your project and will look something like this:
```
{
  "name": "My Project Name",
  "version": "0.0.1",
  "description": "Description for My Project",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Your Name",
  "license": "Copyright SNI 2014"
}
```


1. Let’s install [Karma][2] with [npm][5]. We're installing locally as we may want to run different versions and configurations on different projects.  Additionally, we want to deploy our framework with as few dependencies from the server as possible.
`npm install karma --save-dev`

2. Now install [Mocha][3]. 
`npm install mocha --save-dev`

3. Install [Karma-Mocha][6] adapter so we can use mocha as a test framework with Karma:
`npm install karma-mocha --save-dev`

4. Install [Karma-Chai][7] assertion library.  It offers both bdd style assertions using expect and should as well as junit-style assertions.  Installing Chai as a plugin will make it available as a framework within Karma, which makes setup much simpler.
`npm install karma-chai --save-dev`

5. Install [Sinon][14] for stubbing and spying as poly fill.
`npm install sinon --save-dev`

6. Install [Karma-Chai-Sinon][8] as adapter for Karma.
`npm install karma-chai-sinon --save-dev`

7. Install [Sinon-Chai][13] for extending Chai.
`npm install sinon-chai --save-dev`

8. Install [Karma-JSHint][9] plugin for super convenient Javascript checking on every save.
`npm install karma-jshint --save-dev`

9. Install [Chai-jQuery][12] plugin for jQuery DOM assertions.
`npm install chai-jquery --save-dev`

At this point you may configure Karma by running *karma init* in the `.\node_modules\karma\bin` directory for local development.  Here is a setup that will start you running.  
```
module.exports = function(config) {
  config.set({
    basePath: '../../../',
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
    reporters: ['mocha'],
    mochaReporter: {
      output: 'full'
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
	browsers: ['PhantomJS'],
    singleRun: false
  });
};
```
Running `karma start` in `.\node_modules\karma\bin` directory will use this configuration file and will start Karma server.  You can also specify which configuration file to use as an inline argument.

For **Maven** build create a new `karma.conf.js` file in the root of your project with the following contents:
```
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
```
This file will be used by Maven build process and as such will not need to auto-watch for changes and will run only once, otherwise differences are minor.  
Now edit your `pom.xml` located in your project root directory to include Maven-Karma plugin to trigger Karma test runner as part of your main build.  Add the following into your `<plugins>` node: 
```
<plugin>
	<groupId>com.kelveden</groupId>
	<artifactId>maven-karma-plugin</artifactId>
	<version>1.8</version>
	<executions>
		<execution>
			<phase>test</phase>
			<goals>
				<goal>start</goal>
			</goals>
		</execution>
	</executions>
	<configuration>
		<karmaExecutable>karma</karmaExecutable>        
		<configFile>karma.conf.js</configFile>
		<reportsDirectory>${project.build.directory}	/karma_reports</reportsDirectory>
		<autoWatch>false</autoWatch>
		<singleRun>true</singleRun>
		<colors>true</colors>
		<skipKarma>false</skipKarma>
		<skipTests>false</skipTests>
		<karmaFailureIgnore>false</karmaFailureIgnore>
	</configuration>
</plugin>
```


Test your setup
-------------------

Now you are ready to test your setup.  Run your maven build as you would normally.  Note if Karma runs tests then you have successfully setup your instance.  For local  development start Karma using configuration file located in the `karma\bin` directory.

Here is `package.json` file for reference.
```
{
  "name": "ProtoMKMC",
  "version": "0.0.1",
  "description": "Prototype for testing Maven-Karma-Mocha-Chai auto-testing work flow",
  "repository": {
    "type": "git",
    "url": "https://github.com/alexscg/ProtoMKMC.git"
  },
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Alex Shapiro",
  "license": "MIT",
  "devDependencies": {
    "chai": "^1.9.2",
    "chai-jquery": "^2.0.0",
    "karma": "^0.12.24",
    "karma-chai": "^0.1.0",
    "karma-chai-sinon": "^0.1.3",
    "karma-cli": "0.0.4",
    "karma-html-reporter": "^0.2.4",
    "karma-jshint": "^0.1.0",
    "karma-mocha": "^0.1.9",
    "karma-mocha-reporter": "^0.3.1",
    "karma-phantomjs-launcher": "^0.1.4",
    "karma-requirejs": "^0.2.2",
    "karma-sinon": "^1.0.3",
    "mocha": "^1.21.4",
    "requirejs": "^2.1.15",
    "sinon": "^1.10.3",
    "sinon-chai": "^2.6.0"
  }
}
```
Please remember that there's more than one way to do the same thing or to do that thing better.  Suggestions and feedback welcome!

  [1]: http://nodejs.org/
  [2]: http://karma-runner.github.io/
  [3]: http://visionmedia.github.io/mocha/
  [4]: http://chaijs.com/
  [5]: https://www.npmjs.org/
  [6]: https://www.npmjs.org/package/karma-mocha
  [7]: https://www.npmjs.org/package/karma-chai
  [8]: https://www.npmjs.org/package/karma-chai-sinon
  [9]: https://www.npmjs.org/package/karma-jshint
  [10]: http://maven.apache.org/
  [11]: http://mvnrepository.com/artifact/com.kelveden/maven-karma-plugin
  [12]: https://www.npmjs.org/package/chai-jquery
  [13]: https://www.npmjs.org/package/sinon-chai
  [14]: https://www.npmjs.org/package/sinon