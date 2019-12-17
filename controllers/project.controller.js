let Project = require('../models/project.model');
let Category = require('../models/category.model');
let User = require('../models/user.model');
let Year = require('../models/year.model');
let Comment = require('../models/comment.model');

exports.project_create = (req, res, next) => {
    if (req.body.googleId && req.body.category) {
        let googleId = req.body.googleId;
        User.findOne({
            googleId: googleId
        }, (err, user) => {
            if (err) {
                next();
            } else {
                let categoryId = req.body.category;
                Category.findById(categoryId, (err, category) => {
                    if (err) {
                        next()
                    } else {
                        let title = req.body.title;
                        let mediaType = req.body.mediaType;
                        let mediaLink = res.locals.mediaId;
                        let description = req.body.description;
                        let date = new Date().toISOString().slice(0, 10);
                        let categoryVerified = category._id;
                        let userId = user._id;
                        let project = new Project({
                            title: title,
                            mediaType: mediaType,
                            mediaLink: mediaLink,
                            date: date,
                            category: categoryVerified,
                            user: userId,
                            description: description
                        });

                        project.save((err, project) => {
                            if (err) throw err;
                            res.json(project._id);
                        });
                    }
                });
            }
        })
    }
}

exports.project_all = (req, res, next) => {
    Project.find({}).populate('user').populate('category').sort({
        _id: -1
    }).exec((err, projects) => {
        if (err) throw err;
        res.locals['projects'] = projects;
        next();
    });
}

exports.project_one = (req, res, next) => {
    if (req.params.id) {
        Project.findById(req.params.id).populate('user').populate('category').exec((err, project) => {
            if (err) {
                res.redirect('/');
            } else {
                Comment.find({project: project._id}).populate('user').sort({_id: -1}).exec((err, comments) => {
                    if (err) throw err;
                    if (comments) {
                        res.locals['project'] = project;
                        res.locals['comments'] = comments;
                        next();
                    }
                });
            }
        });
    } else {
        res.redirect('/');
    }
}

exports.admin_all_project = (req, res, next) => {
    Project.find({}).populate('user').populate('category').exec((err, projects) => {
        if (err) throw err;
        res.locals['projects'] = projects;
        next();
    });
}

exports.admin_delete_project = (req, res, next) => {
    if (req.params.id) {
        Project.findByIdAndDelete(req.params.id, (err) => {
            if (err) throw err;
            next();
        });
    } else {
        res.redirect('/admin/dashboard');
    }
}

exports.project_mediaId = (req, res, next) => {
    Project.findById(req.params.id, (err, project) => {
        if (err) {
            next();
        } else {
            res.locals['mediaId'] = project.mediaLink;
            next();
        }
    })
}

exports.project_edit = (req, res, next) => {
    if (req.params.id && req.params.googleId) {
        User.findOne({ googleId: req.params.googleId}, (err, user) => {
            if (err) throw err;
            Project.findById(req.params.id, (err, project) => {
                if (err) throw err;
                if (toString(project.user._id) == toString(user._id)) {
                    Category.findById(req.body.category, (err, category) => {
                        if (err) throw err;
                        let title = req.body.title;
                        let mediaType = req.body.mediaType;
                        let mediaLink = res.locals.mediaId;
                        let description = req.body.description;
                        let date = new Date().toISOString().slice(0, 10);
                        let categoryVerified = category._id;
                        Project.findByIdAndUpdate(req.params.id, { 
                            $set: {
                                title: title,
                                mediaLink: mediaLink,
                                description: description,
                                date: date,
                                category: categoryVerified,
                                mediaType: mediaType
                            }
                        }, (err, project) => {
                            if (err) throw err;
                            res.json(project._id);
                        });
                    });
                }
            })
        });
    }
}

exports.project_delete = (req, res, next) => {    
    if(req.params.id && req.params.googleId) {
        User.findOne({ googleId: req.params.googleId }, (err, user) => {
            if (err) {
                throw err;
            }
            Project.findById(req.params.id).populate('user').exec((err, project) => {
                let userId = toString(user._id);
                let projectUserId = toString(project.user._id);
                if(projectUserId == userId) {
                    Project.findByIdAndRemove(req.params.id, (err) => {
                        if (err) throw err;
                        res.locals['mediaId'] = project.mediaLink;
                        next();
                    });
                }
            });
        });
    }
}

exports.project_category = (req, res, next) => {
    if(req.params.id) {
        Category.findById(req.params.id, (err, category) => {
            if (!category) {
                res.redirect('/');
            } else {
                Project.find({category: category._id}).populate('user').populate('category').sort({
                    _id: -1
                }).exec((err, projects) => {
                    if (err) throw err;
                    res.locals['projects'] = projects;
                    next();
                });
            }
        });
    }
}

exports.project_year = (req, res, next) => {
    if(req.params.id) {
        Year.findById(req.params.id, (err, year) => {
            if (!year) {
                res.redirect('/');
            } else {
                Project.find({}).populate('user').populate('category').sort({
                    _id: -1
                }).exec((err, projects) => {
                    if (err) throw err;
                    projectsArray = [];
                    for (let i = 0; i < projects.length; i++) {
                        if(year._id.toString() == projects[i].user.year.toString()) {
                            projectsArray.push(projects[i]);
                        }
                    }
                    res.locals['projects'] = projectsArray;
                    next();
                });
            }
        });
    }
}

exports.project_random = (req, res, next) => {
    Project.countDocuments().exec((err, count) => {
        if(err) throw err;
        if(count) {
            const random = Math.floor(Math.random() * count);
            Project.findOne().populate('user').populate('category').skip(random).exec((err, project) => {
                if (err) throw err;
                if (project) {
                    Comment.find({project: project._id}).populate('user').sort({_id: -1}).exec((err, comments) => {
                        if (err) throw err;
                        if (comments) {
                            res.locals['project'] = project;
                            res.locals['comments'] = comments;
                            next();
                        }
                    });
                }
            });
        }
    });
}