module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                esversion: 6,
                globals: {
                    jQuery: true
                },
            },
            all: 'src/js/app.js'
        },
        browserify: {
            dist: {
                files: {
                    // destination for transpiled js : source js
                    'dist/js/app.js': 'src/js/app.js'
                },
                options: {
                    transform: [['babelify', { presets: "es2015" }]],
                }
            }
        },
        uglify: {
            build: {
                src: 'dist/js/app.js',
                dest: 'dist/js/app.js',
            }
        },
        copy: {
            main: {
                expand: true,
                cwd: 'src/',
                src: '**',
                dest: 'dist/',
            },
        },
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Default task(s).
    grunt.registerTask('default', ['jshint','copy','browserify','uglify']);
};