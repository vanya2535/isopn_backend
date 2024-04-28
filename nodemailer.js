const nodemailer = require('nodemailer');
const config = require('./config.js');

const transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 465,
    secure: true,
    auth: {
        user: 'ncab_03@mail.ru',
        pass: config.MAIL_PASSWORD,
    },
});

module.exports.sendConfirmationMail = async user => {
    transporter.sendMail({
        from: 'ncab_03@mail.ru',
        to: user.email,
        subject: 'Подтверждение регистрации ISOPN',
        text: 'Для подтверждения регистрации в ISOPN перейдите по ссылке',
        html: `Для подтверждения регистрации в ISOPN перейдите по ссылке ${config.FRONTEND_URL}/auth/confirm/?token=${user.updateToken}`,
    });
};

module.exports.sendChangePasswordMail = async user => {
    transporter.sendMail({
        from: 'ncab_03@mail.ru',
        to: user.email,
        subject: 'Смена пароля ISOPN',
        text: 'Для смены пароля в ISOPN перейдите по ссылке',
        html: `Для смены пароля в ISOPN перейдите по ссылке ${config.FRONTEND_URL}/auth/change/?token=${user.updateToken}`,
    });
};
