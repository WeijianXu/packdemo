'use strict';
module.exports = function(grunt) {
  // grunt configration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'), // dependent packages
    // check js 
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        globals: {
          jQuery: true
        },
        jshintrc: true,
        reporter: require('jshint-stylish')
      }
    },
    // compress
    uglify: {
      options: {
        // banner: display in the head of files
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      // set the mapping of the files in stead fo changes
      // task 'staticMapping'
      staticMapping: {
        files: [{
          src: 'src/public/scripts/index.js',
          dest: 'build/byGrunt/public/scripts/index.min.js'
        }]
      },
      // task 'build'
      build: {
        src: 'src/public/scripts/main.js',
        dest: 'build/byGrunt/public/scripts/main.min.js'
      },
      dynamicMappings: {
        files: [{
          expand: true, // Enable dynamic expansion.
          cwd: 'src/public/lib/', // Src matches are relative to this path.
          src: ['**/*.js'], // Actual pattern(s) to match.
          dest: 'build/byGrunt/public/lib/', // Destination path prefix.
          ext: '.min.js', // Dest filepaths will have this extension.
          extDot: 'last' // util.base.js => 'first': util.min.js ; 'last': util.base.min.js
        }],
      },
    },
    concat: {
      // task 'bar'
      bar: {
        src: ['build/byGrunt/public/scripts/**/*.js'],
        dest: 'dist/grunt/public/scripts/all.min.js'
      },
      lib: {
        src: ['build/byGrunt/lib/**/*.js'],
        dest: 'dist/grunt/public/lib/all.lib.min.js'
      }
    },
    watch: {
      files: ['src/public/scripts/**/*.js', 'src/public/styles/**/*.less'],
      tasks: ['jshint', 'uglify', 'concat']
    }
  });

  // load the plugins used by these tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // register default task.
  grunt.registerTask('default', ['jshint', 'uglify', 'concat']);
};