/* jshint -W106 */
'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var slug = require('slug');
var GitHubApi = require('github');

var github = new GitHubApi({ version: '3.0.0' });

var githubUserInfo = function (name, cb, log) {
  github.user.getFrom({
    user: name
  }, function (err, res) {
    if (err) {
      log.error('Cannot fetch your github profile. Make sure you\'ve typed it correctly.');
      res = {
        name: '',
        email: '',
        html_url: ''
      };
    }
    cb(JSON.parse(JSON.stringify(res)));
  });
};

var extractGeneratorName = function (appname) {
  var slugged = slug(appname);
  var match = slugged.match(/^generator-(.+)/);

  if (match && match.length === 2) {
    return match[1].toLowerCase();
  }
  return slugged;
};

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: {
    greet: function() {
      this.log(yosay('Create your own ' + chalk.red('Rust') + ' library with FFI bindings!'));
    },

    askForBindings: function() {
      var done = this.async();

      var prompts = [
        { type: 'checkbox',
          name: 'bindings',
          message: 'What kind of bindings would you like to create?',
          choices: [
            { name: 'NPM Module',
              value: {
                name: 'JavaScript',
                slugname: 'js',
                description: 'An NPM Module',
                build: 'To build the Rust library, along with the installing node dependencies, run:\n```$ npm i```',
                test: 'To run Mocha tests, run:\n```$ npm test```'
              },
              checked: true }
          ] }
      ];

      this.prompt(prompts, function(props) {
        var bindings = {};
        props.bindings.forEach(function(binding) {
          bindings[binding.slugname] = binding;
        });
        this.bindings = bindings;

        done();
      }.bind(this));
    },

    askForGitHubUser: function () {
      var done = this.async();

      var prompts = [{
        name: 'githubUser',
        message: 'Would you mind telling me your username on GitHub?',
        default: 'someuser'
      }];

      this.prompt(prompts, function (props) {
        this.githubUser = props.githubUser;

        done();
      }.bind(this));
    },

    askForProjectProps: function () {
      var done = this.async();

      var prompts = [
        { name: 'name',
          message: 'Module name',
          default: extractGeneratorName(this.appname) },
        { name: 'description',
          message: 'Description',
          default: 'A Rust library with bindings!' },
        { name: 'keywords',
          message: 'Key your keywords (comma to split)',
          default: '' },
        { name: 'license',
          message: 'License',
          default: 'MIT' }
      ];
      this.prompt(prompts, function (props) {
        this.name = props.name;
        this.slugname = slug(this.name);
        this.description = props.description;
        this.keywords = props.keywords;
        this.license = props.license;

        done();
      }.bind(this));
    }
  },

  configuring: {
    userInfo: function () {
      var done = this.async();

      githubUserInfo(this.githubUser, function (res) {
        /*jshint camelcase:false */
        this.author = res.name;
        this.email = res.email;
        this.githubUrl = res.html_url;
        this.repoUrl = this.githubUrl + '/' + this.slugname;
        done();
      }.bind(this), this.log);
    },

    keywords: function() {
      this.keywords = this.keywords.split(',').map(function(el) {
        return el.trim();
      }).filter(function(el) {
        return !!el;
      });
    }
  },

  writing: {
    jsFiles: function () {
      if (!this.bindings.js) { return; }
      this.template('package.json');
      this.copy('jshintrc', '.jshintrc');
      this.template('js/lib/index.js');
      this.template('js/tests/index.js');
    },

    rustFiles: function() {
      this.template('Cargo.toml');
      this.copy('src/lib.rs');
      this.template('tests/lib.rs');
    },

    projectFiles: function () {
      this.copy('editorconfig', '.editorconfig');
      this.copy('gitignore', '.gitignore');
      this.copy('gitattributes', '.gitattributes');
      this.template('README.md');
    }
  },

  install: function () {
    if (this.bindings.js) {
      this.installDependencies({
        skipInstall: this.options['skip-install'],
        bower: false
      });
    }
  }
});
