const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookingSchema = new Schema(
    {
        day: {
            type: Date,
            required: true,
        },
        hour: {
            type: Number,
            required: true,
        },
        activity: {
            type: String,
            required: true,
        },
        allowToJoin: {
            type: Boolean,
            default: true,
        },
        creator: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model('Booking', bookingSchema);
