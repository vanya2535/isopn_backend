const Realty = require('../models/Realty.js');
const fileService = require('../services/fileService.js');
const { Types: { ObjectId } } = require('mongoose');


const realtyJson = ({ _id, images, price, rooms, link, floor, location, coords, advantages, disadvantages }) => ({
    _id,
    images,
    price,
    rooms,
    link,
    floor,
    location,
    coords,
    advantages,
    disadvantages,
});

class RealtyController {
    async create(req, res) {
        try {
            const { price, rooms, link, floor, location, coords, advantages, disadvantages } = req.parsedBody;
            const addImages = req.parsedFiles?.addImages || [];

            const realty = new Realty({
                userId: req.user._id,
                images: addImages.map(image => fileService.saveFile(image)),
                price,
                rooms,
                link,
                floor,
                location,
                coords,
                advantages,
                disadvantages,
            });

            await realty.save();

            return res.json({ result: realtyJson(realty) });
        } catch (e) {
            console.log(e);
            return res.status(400).json({ message: 'Ошибка в процессе создания объекта недвижимости' });
        }
    }

    async get(req, res) {
        try {
            const { offset, limit } = req.query;

            const realties = await Realty.find({ userId: req.user._id }).skip(offset).limit(limit);
            const count = await Realty.countDocuments({ userId: req.user._id });

            return res.json({ count, result: realties.map(realtyJson) });
        } catch (e) {
            console.log(e);
            return res.status(400).json({ message: 'Ошибка в процессе получения объектов недвижимости' });
        }
    }

    async getStats(req, res) {
        try {
            const realties = await Realty.find({ userId: req.user._id }).select(['price', 'rooms.living']);

            const priceRes = {};
            for (let realty of realties) {
                const segment = Number.parseInt(realty.price / 1000000);
                priceRes[segment + 1] = (priceRes[segment + 1] || 0) + 1;
            }
            
            const roomsRes = {};
            for (let rooms of realties.map(({ rooms }) => rooms.reduce((acc, val) => acc += val.living ? 1 : 0, 0))) {
                roomsRes[rooms] = (roomsRes[rooms] || 0) + 1;
            }

            const allRealties = await Realty.find().select(['price', 'rooms.living']);

            const allPriceRes = {};
            for (let realty of allRealties) {
                const segment = Number.parseInt(realty.price / 1000000);
                allPriceRes[segment + 1] = (allPriceRes[segment + 1] || 0) + 1;
            }
            
            const allRoomsRes = {};
            for (let rooms of allRealties.map(({ rooms }) => rooms.reduce((acc, val) => acc += val.living ? 1 : 0, 0))) {
                allRoomsRes[rooms] = (allRoomsRes[rooms] || 0) + 1;
            }

            return res.json({ result: { price: priceRes, rooms: roomsRes, allPrice: allPriceRes, allRooms: allRoomsRes } });
        } catch (e) {
            console.log(e);
            return res.status(400).json({ message: 'Ошибка в процессе получения статистики об объектах недвижимости' });
        }
    }

    async update(req, res) {
        try {
            const realty = await Realty.findById(req.params.id);
            if (!realty) {
                return res.status(400).json({ message: 'Объект недвижимости не найден' });
            }

            if (realty.userId !== req.user._id) {
                return res.status(400).json({ message: 'Недостаточно прав для редактирования' });
            }

            ['price', 'rooms', 'link', 'floor', 'location', 'coords', 'advantages', 'disadvantages'].forEach(key => {
                realty[key] = req.parsedBody[key];
            });
            
            let realtyImages = realty.images;

            const removeImages = req.parsedBody?.removeImages || [];
            removeImages.forEach(image => fileService.removeFile(image));

            realtyImages = realtyImages.filter(image => !removeImages.includes(image));

            const addImages = req.parsedFiles?.addImages || [];
            realtyImages.push(...addImages.map(image => fileService.saveFile(image)));

            realty.images = realtyImages;
            await realty.save();

            return res.json({ result: realtyJson(realty) });
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

            realty.images.forEach(image => fileService.removeFile(image));

            await Realty.deleteOne({ _id: new ObjectId(req.params.id) });

            return res.json({});
        } catch (e) {
            console.log(e);
            return res.status(400).json({ message: 'Ошибка в процессе удаления объекта недвижимости' });
        }
    }
}

module.exports = new RealtyController();
