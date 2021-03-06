module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*!\n' +
            ' * <%= pkg.name %> v<%= pkg.version %>\n' +
            ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n' +
            ' */\n',
    jasmine: {
      before: {
        src: ['src/*.js'],
        options: {
          vendor: ['node_modules/sinon/pkg/sinon.js', 'lib/jasmine-fake-window.js'],
          specs: 'spec/**/*.js',
          host: 'http://localhost:4000'
        }
      },
      after: {
        src: ['dist/*.js'],
        options: {
          vendor: ['node_modules/sinon/pkg/sinon.js', 'lib/jasmine-fake-window.js'],
          specs: 'spec/**/*.js',
          host: 'http://localhost:4000'
        }
      },
      coverage: {
        src: ['src/*.js'],
        options: {
          vendor: ['node_modules/sinon/pkg/sinon.js', 'lib/jasmine-fake-window.js'],
          specs: 'spec/**/*.js',
          host: 'http://localhost:4000',
          template: require('grunt-template-jasmine-istanbul'),
          templateOptions: {
            coverage: 'bin/coverage/coverage.json',
            report: 'bin/coverage',
            // thresholds: {
            //   lines: 75,
            //   statements: 75,
            //   branches: 75,
            //   functions: 90
            // }
          }
        }
      }
    },
    jshint: {
      options: {
        bitwise: true,
        curly: true,
        eqeqeq: true,
        forin: true,
        freeze: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        nonbsp: true,
        plusplus: true,
        quotmark: 'single',
        undef: true,
        unused: true,
        strict: true,
        trailing: true,
        validthis: true,
        globals: {
          console: true,
          window: true,
          module: true,
          require: true,
          define: true
        }
      },
      all: {
        files: {
          src: ['src/*.js', ]
        }
      },
      spec: {
        files: {
          src: ['spec/*.js']
        },
        options: {
          unused: false,
          globals: {
            describe: true,
            it: true,
            expect: true,
            Router: true,
            beforeEach: true,
            afterEach: true,
            window: true,
            console: true,
            require: true,
            phantom: true,
            jasmine: true,
            sinon: true
          }
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 4000,
          base: '.'
        }
      }
    },
    docco: {
      create: {
        src: ['index.js'],
        options: {
          output: 'docs/'
        }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      src: {
        files: ['src/**/*.js', 'spec/**/*.js'],
        tasks: ['jshint', 'uglify:dist', 'jasmine']
      },
      config: {
        files: ['Gruntfile.js', 'package.json'],
        options: {
          reload: true
        }
      },
      example: {
        files: ['example/**/*']
      },
      docs: {
        files: ['index.js'],
        tasks: ['docco']
      }
    },
    uglify: {
      dist: {
        options: {
          banner: '<%= banner %>'
        },
        files: {
          'dist/router.min.js': ['src/*.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-docco');
  grunt.loadNpmTasks('grunt');

  grunt.registerTask('build', ['uglify'])

  grunt.registerTask('default', ['connect', 'watch']);

};