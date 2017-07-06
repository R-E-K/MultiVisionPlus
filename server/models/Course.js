(function() {
    'use strict';

    var mongoose = require('mongoose');

    var courseSchema = {
        title: {
            type: String,
            required: '{PATH} is required'
        },
        content: {
            type: String,
            required: '{PATH} is required'
        },
        featured: {
            type: Boolean,
            required: '{PATH} is required'
        },
        published: {
            type: Date,
            required: '{PATH} is required'
        },
        tags: [String],
        user: {
            firstName: {
                type: String,
                required: '{PATH} is required'
            },
            lastName: {
                type: String,
                required: '{PATH} is required'
            }
        }
    };

    var Course = mongoose.model('Course', courseSchema);

    exports.createDefaultCourses = function () {
        Course.find({}).exec(function (err, collection) {
            if (collection.length === 0) {
                Course.create({
                    title: 'Course 1',
                    content: 'content 1',
                    featured: true,
                    published: new Date('10/05/2016'),
                    tags: ['C#', "MongoDB"]
                });

                Course.create({
                    title: 'Course 2',
                    content: 'content 2',
                    featured: false,
                    published: new Date('11/30/2015'),
                    tags: ['NodeJs', "Express"]
                });
            }
        });
    };

})();