const { validationResult } = require('express-validator');
const Realty = require('../models/Realty.js');
const { mapErrors } = require('../utils/errors.js');
const fileService = require('../services/fileService.js');

const realtyJson = ({ _id, images, price, rooms, floor, ceilingHeight, coords }) => ({
    _id,
    images,
    price,
    rooms,
    floor,
    ceilingHeight,
    coords,
});

class RealtyController {
    async create(req, res) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json(mapErrors(errors));
            }

            const { price, rooms, floor, ceilingHeight, coords } = req.body;
            const images = req.files?.images || [];

            const realty = new Realty({
                userId: req.user._id,
                images: images.map(image => fileService.saveFile(image)),
                price,
                rooms,
                floor,
                ceilingHeight,
                coords,
            });

            await realty.save();

            return res.json({ realty: realtyJson(realty) });
        } catch (e) {
            console.log(e);
            return res.status(400).json({ message: 'Ошибка в процессе создания объекта недвижимости' });
        }
    }

    async get(req, res) {
        try {
            const realties = await Realty.find({ userId: req.user._id });
            return res.json({ realty: realties.map(realtyJson) });
        } catch (e) {
            console.log(e);
            return res.status(400).json({ message: 'Ошибка в процессе получения объектов недвижимости' });
        }
    }

    async update(req, res) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json(mapErrors(errors));
            }

            const realty = await Realty.findById(req.params.id);
            if (!realty) {
                return res.status(400).json({ message: 'Объект недвижимости не найден' });
            }

            if (realty.userId !== req.user._id) {
                return res.status(400).json({ message: 'Недостаточно прав для редактирования' });
            }

            ['price', 'rooms', 'floor', 'ceilingHeight', 'coords'].forEach(key => {
                realty[key] = req.body[key];
            });

            await realty.save();

            return res.json(realtyJson(realty));
        } catch (e) {
            console.log(e);
            return res.status(400).json({ message: 'Ошибка в процессе обновления объекта недвижимости' });
        }
    }

    async delete(req, res) {
        try {
            const realty = await Realty.findById(req.params.id);
            if (!realty) {
                return res.status(400).json({ message: 'Объект недвижимости не найден' });
            }

            if (realty.userId !== req.user._id) {
                return res.status(400).json({ message: 'Недостаточно прав для удаления' });
            }

            realty.images.forEach((image) => fileService.removeFile(image));

            await Realty.deleteOne(realty);

            return res.json({});
        } catch (e) {
            console.log(e);
            return res.status(400).json({ message: 'Ошибка в процессе удаления объекта недвижимости' });
        }
    }
}

module.exports = new RealtyController();
