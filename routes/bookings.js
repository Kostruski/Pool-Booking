const express = require('express');
const { body } = require('express-validator/check');

const bookingsController = require('../controllers/bookings');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// GET /feed/posts

router.get('/', isAuth, bookingsController.getBookings);

router.post('/', isAuth, bookingsController.postBooking);

router.delete('/:bookingId', isAuth, bookingsController.deleteBooking);

router.patch('/:bookingId', isAuth, bookingsController.setToPrivate);

// POST /feed/post
// router.post(
//     '/post',
//     isAuth,
//     [
//         body('title')
//             .trim()
//             .isLength({ min: 5 }),
//         body('content')
//             .trim()
//             .isLength({ min: 5 }),
//     ],
//     feedController.createPost,
// );

// router.get('/post/:postId', isAuth, feedController.getPost);

// router.put(
//     '/post/:postId',
//     isAuth,
//     [
//         body('title')
//             .trim()
//             .isLength({ min: 5 }),
//         body('content')
//             .trim()
//             .isLength({ min: 5 }),
//     ],
//     feedController.updatePost,
// );

// router.delete('/post/:postId', isAuth, feedController.deletePost);

module.exports = router;
