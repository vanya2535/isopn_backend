const { config } = require('dotenv');
config();

module.exports = {
    BACKEND_PORT: process.env.BACKEND_PORT,
    FRONTEND_URL: process.env.FRONTEND_URL,
    DB_PASSWORD: process.env.DB_PASSWORD,
    SECRET_KEY: process.env.SECRET_KEY,
    MAIL_PASSWORD: process.env.MAIL_PASSWORD,
};
