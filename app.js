const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
const bookingsRoutes = require('./routes/bookings');

const dbUrl =
    'mongodb+srv://Marek:12345@udemy-j7mmt.mongodb.net/pool?authSource=admin&replicaSet=udemy-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true';

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE',
    );
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization',
    );
    next();
});

app.use('/auth', authRoutes);
app.use('/bookings', bookingsRoutes);

app.use((error, req, res, next) => {
    console.log('error collector', error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message, data });
});

(async () => {
    try {
        await mongoose.connect(dbUrl);
        app.listen(8080);
    } catch (err) {
        console.log(err, 'db conncetion');
    }
})();
