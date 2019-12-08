let Project = require('../models/project.model');
let Category = require('../models/category.model');

exports.project_create = (req, res, next) => {
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
            let project = new Project({
                title: title,
                mediaType: mediaType,
                mediaLink: mediaLink,
                date: date,
                category: categoryVerified,
                user: '5de7f8f21c9d440000e6f401',
                description: description
            });

            project.save((err, project) => {
                if (err) throw err;
                res.json(project);
            });
        }
    });
}

exports.project_all = (req, res, next) => {
    Project.find({}).populate('user').populate('category').sort({
        date: -1
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
                res.locals['project'] = project;
                next();
            }
        })
    } else {
        res.redirect('/');
    }
}