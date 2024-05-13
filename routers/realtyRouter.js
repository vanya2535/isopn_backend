const Router = require('express');
const { check } = require('express-validator');
const realtyController = require('../controllers/realtyController.js');
const authMiddleware = require('../middleware/authMiddleware.js');
const formDataMiddleware = require('../middleware/formDataMiddleware.js');

const router = new Router();

router.post('/create', [
    authMiddleware,
    formDataMiddleware,
    formDataMiddleware,
], realtyController.create);

router.patch('/update/:id', [
    authMiddleware,
    formDataMiddleware,
], realtyController.update);

router.get('/', [
    authMiddleware,
], realtyController.get);

router.get('/stats', [
    authMiddleware,
], realtyController.getStats);

router.delete('/delete/:id', [
    authMiddleware,
], realtyController.delete);

module.exports = router;
