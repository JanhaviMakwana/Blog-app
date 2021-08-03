const User = require('../models/user');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const appConfig = require('../config/app.config');


exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {

        const user = await User.findOne({ username: username, password: password }, { 'username': 1 });

        if (!user) return res.status(404).json({ message: 'User not found' });

        const userWithToken = generateToken(user);

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

    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username: username });

        if (!existingUser) {
            const user = await User.create({ username: username, password: password });

            const userWithToken = generateToken({ _id: user._id, username: user.username });

            return res.send(userWithToken);
        }
        return res.json({ message: 'username already in use...' })

    } catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const generateToken = (user) => {
    const token = jwt.sign({ id: user._id, username: user.username }, appConfig.appKey, { expiresIn: '86400' });

    return {
        ...{ user }, ...{ token }
    }
};
