const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.get('Authorization');
    let decodedToken;

    try {
        decodedToken = jwt.verify(token, 'somesupersecretsecret');
    } catch (error) {
        error.message = 'Not authenticated.';
        error.statusCode = 401;
        throw error;
    }

    req.userId = decodedToken.userId;

    next();
};
