const bcrypt = require('bcryptjs');
const { v4: uuid } = require('uuid');
const { validationResult } = require('express-validator');
const User = require('../models/User.js');
const { sendChangePasswordMail, sendConfirmationMail } = require('../nodemailer.js');
const { generateAccessToken, generateRefreshToken } = require('../utils/token.js');
const { mapErrors } = require('../utils/errors.js');

class AuthController {
    async register(req, res) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json(mapErrors(errors));
            }

            const { email, password } = req.body;

            const candidate = await User.findOne({ email });
            if (candidate?.emailConfirmed) {
                return res
                    .status(400)
                    .json({ message: 'Данный адрес электронной почты уже используется' });
            }

            const hashPassword = bcrypt.hashSync(password, 7);

            const user = candidate || new User({
                email,
                password: hashPassword,
                updateToken: uuid(),
            });

            await user.save();
            sendConfirmationMail(user);

            return res.end();
        } catch (e) {
            console.log(e);
            return res.status(400).json({ message: 'Ошибка в процессе регистрации' });
        }
    }

    async confirm(req, res) {
        try {
            const updateToken = req.query.updateToken;

            const user = await User.findOne({ updateToken });
            if (!user) {
                return res
                    .status(400)
                    .json({ message: 'Неверный токен обновления пользователя' });
            }

            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user._id);

            user.emailConfirmed = true;
            user.refreshToken = refreshToken;
            await user.save();

            return res.json({
                accessToken,
                refreshToken,
                email: user.email,
            });
        } catch (e) {
            console.log(e);
            return res.status(400).json({ message: 'Ошибка в процессе подтверждения регистрации' });
        }
    }

    async login(req, res) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json(mapErrors(errors));
            }

            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({ message: 'Пользователь не найден' });
            }

            if (!user.emailConfirmed) {
                return res.status(400).json({ message: 'Подтвердите адрес электронной почты для авторизации' });
            }

            const validPassword = bcrypt.compareSync(password, user.password);

            if (!validPassword) {
                return res.status(400).json({ message: 'Неверный пароль' });
            }

            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user._id);

            user.refreshToken = refreshToken;
            await user.save();

            return res.json({
                accessToken,
                refreshToken,
                email: user.email,
            });
        } catch (e) {
            console.log(e);
            return res.status(400).json({ message: 'Ошибка в процессе входа' });
        }
    }

    async restore(req, res) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json(mapErrors(errors));
            }

            const email = req.body.email;
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({ message: 'Пользователь не найден' });
            }

            user.updateToken = uuid();
            await user.save();

            sendChangePasswordMail(user);

            return res.end();
        } catch (e) {
            console.log(e);
            return res.status(400).json({ message: 'Ошибка в процессе смены пароля' });
        }
    }

    async restoreConfirm(req, res) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json(mapErrors(errors));
            }

            const updateToken = req.query.updateToken;

            const user = await User.findOne({ updateToken });
            if (!user) {
                return res
                    .status(400)
                    .json({ message: 'Неверный ID пользователя' });
            }

            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user._id);

            const password = req.body.password;
            user.password = bcrypt.hashSync(password, 7);
            user.refreshToken = refreshToken;
            await user.save();

            return res.json({
                accessToken,
                refreshToken,
                email: user.email,
            });
        } catch (e) {
            console.log(e);
            return res.status(400).json({ message: 'Ошибка в процессе смены пароля' });
        }
    }

    async check(_, res) {
        try {
            return res.json();
        } catch (e) {
            console.log(e);
            return res.status(400).json({ message: 'Ошибка в процессе check' });
        }
    }
}

module.exports = new AuthController();
