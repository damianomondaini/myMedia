let Project = require('../models/project.model');
let Category = require('../models/category.model');

exports.project_create = (req, res, next) => {
    let categoryId = req.body.category;
    console.log(categoryId);
    
    Category.findOne({ _id: categoryId }, (err, category) => {
        if (err) throw err;
        console.log(category);
    });
    /*let title = req.body.title;
    let mediaType = req.body.mediaType;
    let mediaLink = res.locals.mediaId;
    let date = new Date().toISOString().slice(0,10);
    let project = new Project({
    })*/
}