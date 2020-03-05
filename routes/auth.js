const express = require('express');
const { body } = require('express-validator/check');

const User = require('../models/user');
const authController = require('../controllers/auth');


const router = express.Router();

router.put(
    '/signup',
    [
        body('email')
            .isEmail()
            .withMessage('Please enter a valid email.')
            .normalizeEmail(),
        body('password')
            .trim()
            .isLength({ min: 3 })
            .withMessage('Password is to short'),
        body('apNumber')
            .trim()
            .not()
            .isEmpty()
            .isInt({ min: 3, max: 96 })
            .withMessage('Enter valid apartment number')
            .custom(async value => {
                const apartment = await User.findOne({ apNumber: value });
                if (apartment) {
                    return Promise.reject(
                        `Account for apartment number ${apartment.apNumber} already created`,
                    )
                }
            }),
    ],
    authController.signup,
);

router.post('/login', authController.login);

// router.get('/status', isAuth, authController.getUserStatus);

// router.patch(
//     '/status',
//     isAuth,
//     [
//         body('status')
//             .trim()
//             .not()
//             .isEmpty(),
//     ],
//     authController.updateUserStatus,
// );

module.exports = router;
