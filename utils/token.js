const jwt = require('jsonwebtoken');
const config = require('../config.js');

module.exports.generateAccessToken = ({ _id, email }) => jwt.sign({ _id, email }, config.SECRET_KEY, { expiresIn: '2m' });
module.exports.generateRefreshToken = _id => jwt.sign({ _id }, config.SECRET_KEY, { expiresIn: '2d' });

module.exports.verifyToken = function(token) {
    try {
        const decodedData = jwt.verify(token, config.SECRET_KEY);

        return {
            decodedData,
            expired: false,
        };
    } catch (e) {
        return {
            expired: e instanceof jwt.TokenExpiredError,
        };
    }
}
