'use strict';//jshint

module.exports = function(grunt) {
  grunt.initConfig({
    less: {
      compileCore: {
        files: {
          'css/style.css': 'less/style.less'
        }
      }
    },
    watch: {
      options: {
        atBegin: true
      },
      less: {
        files: [
          'less/*.less',
          'bootstrap/less/*.less',
        ],
        tasks: ['copy:variables','less'],
      },
    },
    cssmin: {
      compress: {
        options: {
          keepSpecialComments: '*',
          noAdvanced: true, // turn advanced optimizations off until it's fixed in clean-css
          report: 'min',
          selectorsMergeMode: 'ie8'
        },
        src: 'css/style.css',
        dest: 'css/style.min.css'
      }
    },
    copy: {
      variables: {
        expand: true,
        cwd: 'bootstrap/less',
        src: 'variables.less',
        dest: 'less',
        filter: function(filepath) {
          var contents = grunt.file.read('less/variables.less');
          return contents == '// Override Bootstrap variables here.\n\n@icon-font-path: "../bootstrap/fonts/";';
        },
        options: {
          process: function (contents, srcpath) {
            return contents.replace(/@icon-font-path:[\s\t]*"[^"]+"/g, '@icon-font-path: "../bootstrap/fonts/"');
          }
        }
      },
      override: {
        expand: true,
        cwd: 'bootstrap/less',
        src: '*.less',
        dest: 'less/overrides',
        filter: function(filepath) {
          var name = filepath.split(/[\.\/]/).slice(-2)[0];
          return name == grunt.config.get('override');
        }
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', [
    'copy:variables',
    'less',
    'cssmin'
  ]);

  grunt.registerTask('override', function(n) {
    if (n == null) {
      grunt.warn('Build num must be specified, like build:001.');
    }

    var contents = grunt.file.read('less/overrides.less');

    if (contents.search(n + '.less') == -1) {
      grunt.config.set('override', n);
      grunt.task.run('copy:override');

      contents += '@import "overrides/' + n + '.less";' + "\n";
      grunt.file.write('less/overrides.less', contents);
    }
  });
};
