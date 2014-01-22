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
        tasks: ['copy','less'],
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
          var path = require('path');
          var dest = path.join(
            grunt.config('copy.variables.dest'),
            filepath.split(path.sep).slice(2).join(path.sep)
          );
          return !(grunt.file.exists(dest));
        },
        options: {
          process: function (content, srcpath) {
            return content.replace(/@icon-font-path:[\s\t]*"[^"]+"/g, '@icon-font-path: "../bootstrap/fonts/"');
          }
        }
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', [
    'copy',
    'less',
    'cssmin'
  ]);
};
