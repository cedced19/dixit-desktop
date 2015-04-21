var path = require('path');
module.exports = function(grunt) {

    var config = {
        copy: {
            src: {
                files: [{
                    expand: true,
                    src: [
                        'index.html',
                        'vendor/**/*.*',
                        'package.json',
                        'favicon.png'
                    ],
                    dest: 'minified/'
                }]
            }
        },
        useminPrepare: {
            html: 'index.html',
            options: {
                dest: 'minified'
            }
        },
        usemin: {
            html: 'minified/*.html'
        },
        htmlmin: {
            minified: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'minified/index.html': 'minified/index.html'
                }
            }
        },
        nodewebkit: {
            options: {
                platforms: ['win32','osx', 'linux'],
                buildDir: './build', // Where the build version of my node-webkit app is saved
            },
            src: ['./minified/**/*'] // Your node-webkit app
        },
        'install-dependencies': {
            options: {
                cwd: './minified/'
            }
        }
    };

    grunt.initConfig(config);

    // Load all Grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    grunt.registerTask('default', ['copy', 'useminPrepare', 'concat', 'uglify', 'cssmin', 'usemin', 'htmlmin', 'install-dependencies', 'nodewebkit']);
};