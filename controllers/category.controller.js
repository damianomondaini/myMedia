let Category = require('../models/category.model');

exports.category_all = (req, res, next) => {
    Category.find((err, categories) => {
        if (err) throw err;
        res.locals['categories'] = categories;
        next();
    });
}

exports.admin_all_category = (req, res, next) => {
    Category.find((err, categories) => {
        if (err) throw err;
        res.locals['categories'] = categories;
        next();
    });
}

exports.admin_add_category = (req, res, next) => {
    if(req.body['category-add']) {
        let category = new Category({
            name: req.body['category-add']
        });

        category.save((err) => {
            if (err) throw err;
            next();
        });
    } else {
        next();
    }
}

exports.admin_delete_category = (req, res, next) => {
    if(req.params.id) {
        Category.findByIdAndRemove(req.params.id, (err) => {
            if (err) throw err;
            next();
        })
    } else {
        next();
    }
}