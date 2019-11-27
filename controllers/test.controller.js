let Test = require('../models/test.model');

exports.test_all = (req, res, next) => {
    Test.find((err, test) => {
        if (err) throw err;
        res.locals['test'] = test;

        next();
    });
};

exports.test_add = (req, res, next) => {
    if (req.body.test) {
        let test = new Test ({
            test: req.body.test
        });

        test.save((err) => {
            if (err) throw err;
            next();
        });
    }
};

exports.test_delete = (req, res, next) => {
    if (req.params.id) {
        Test.findByIdAndRemove(req.params.id, (err) => {
            if (err) throw err;
            next();
        });
    }
};

exports.test_edit = (req, res, next) => {
    if (req.params.id && req.body.test) {
        Test.findByIdAndUpdate(req.params.id, {
            $set: {
                test: req.body.test
            }
        }, {new: true}, (err) => {
            if (err) throw err;
            next();
        })
    }
};

exports.test_findById = (req, res, next) => {
    if (req.params.id) {        
        Test.findById(req.params.id, (err, test) => {            
            if (err) throw err;
            res.locals['test'] = test;

            next();
        });
    }
}

