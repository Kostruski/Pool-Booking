const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signup = (req, res, next) =>
    (async () => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('Account creation failed');
            error.data = errors.array();
            error.statusCode = 422;
            throw error;
        }

        const email = req.body.email;
        const apNumber = req.body.apNumber;
        const password = req.body.password;
        const hashedPw = await bcrypt.hash(password, 12);

        const user = new User({
            email,
            password: hashedPw,
            apNumber,
        });
        const result = await user.save();
        res.status(201).json({
            message: 'User created!',
            userId: result._id,
        });
    })().catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });

exports.login = async (req, res, next) => {
    const apNumber = req.body.apNumber;
    const password = req.body.password;
    let loadedUser;
    try {
        const user = await User.findOne({ apNumber });
        if (!user) {
            const error = new Error(
                'No account found for this apartment number',
            );
            error.statusCode = 401;
            throw error;
        }
        loadedUser = user;
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            const error = new Error('Wrong password!');
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign(
            {
                apNumber: loadedUser.apNumber,
                userId: loadedUser._id.toString(),
            },
            'somesupersecretsecret',
            { expiresIn: '1h' },
        );
        res.status(200).json({
            token,
            userId: loadedUser._id.toString(),
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
