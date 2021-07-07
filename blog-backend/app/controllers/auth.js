const db = require('../models');
const User = db.user;
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const appConfig = require('../config/app.config');


exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email: email, password: password } });

        if (!user) return res.status(404).json({ message: 'User not found' });

        const userWithToken = generateToken(user.get({ raw: true }));

        return res.send(userWithToken);
    } catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.signup = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    };

    const { email, password } = req.body;

    try {
        const user = await User.create({ email: email, password: password });

        const userWithToken = generateToken(user.get({ raw: true }));

        return res.send(userWithToken);

    } catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const generateToken = (user) => {
    delete user.password;

    const token = jwt.sign(user, appConfig.appKey, { expiresIn: '86400' });

    return { ...{ user }, ...{ token } }
};
