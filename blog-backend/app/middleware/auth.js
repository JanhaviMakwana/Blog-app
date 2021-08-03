const jwt = require('jsonwebtoken');
const appConfig = require('../config/app.config');

exports.authenticate =  (req, res, next) => {
    const token = req.headers['authorization'].split('Bearer ')[1];
    if(!token) {
        return res.status(400).json({message: 'Access Denied ! Invalid User'});
    }else{
        jwt.verify(token, appConfig.appKey, (err, result) => {
            if(err) {
                return res.status(400).json({
                    message: 'Access Denied ! Invalid User'
                })
            }
            next();
        })
    };
};
