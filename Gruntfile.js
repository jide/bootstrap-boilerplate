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
      less: {
        files: [
          'less/*.less',
          'bootstrap/less/*.less',
        ],
        tasks: ['less']
      },
    },
    clean: {
      dist: [
        'styles/style.min.css'
      ]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.registerTask('default', [
    'clean',
    'less'
  ]);

  grunt.registerTask('dev', [
    'watch'
  ]);
};
