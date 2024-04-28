const Router = require('express');
const { check } = require('express-validator');
const realtyController = require('../controllers/realtyController.js');
const authMiddleware = require('../middleware/authMiddleware.js');

const router = new Router();

router.post('/create', [
    authMiddleware,
    check('price', 'Минимальная стоимость - 1₽').isFloat({ min: 1 }),
], realtyController.create);

router.patch('/update/:id', [
    authMiddleware,
    check('price', 'Минимальная стоимость - 1₽').isFloat({ min: 1 }),
], realtyController.update);

router.get('/', [
    authMiddleware,
], realtyController.get);

router.delete('/delete/:id', [
    authMiddleware,
], realtyController.delete);

module.exports = router;
