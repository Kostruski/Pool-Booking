const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    apNumber: {
        type: Number,
        required: true,
    },
    blocked: {
        type: Boolean,
        default: false,
    },
    bookings: [
        {
            type: Schema.Types.ObjectId,
            ref: 'booking',
        },
    ],
});

module.exports = mongoose.model('User', userSchema);
