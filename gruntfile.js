'use strict';

module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    config: {
      src: 'src/*.html',
      dist: 'dist/'
    },
    'replace': {
        'ios': {
            src: ['src/**/*.js', 'node_modules/react-native-elements/src/input/Search.js'],
            overwrite: true,                 // overwrite matched source files 
            replacements: [{
              from: 'accessibilityLabel',
              to: 'testID'
            }]
          },
          'android': {
            src: ['src/**/*.js', 'node_modules/react-native-elements/src/input/Search.js'],
            overwrite: true,                 // overwrite matched source files 
            replacements: [{
              from: 'testID',
              to: 'accessibilityLabel'
            }]
          }
      }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-text-replace');

  // Default task.
  grunt.registerTask('replaceios', ['replace:ios']);
  grunt.registerTask('replaceandroid', ['replace:android']);
};