let Year = require('../models/year.model');

exports.admin_add_year = (req, res, next) => {
    if(req.body.name && req.body.year) {
        let year = new Year({
            name: req.body.name,
            year: req.body.year
        });

        year.save((err) => {
            if(err) throw err;
            next();
        });
    } else {
        next();
    }
}