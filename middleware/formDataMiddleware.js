const parseFormData = data => {
    const result = {};
    
    for (let key in data) {
        const match = key.match(/\w+/g);

        if (match.length <= 1) {
            result[key] = Number(data[key]) || data[key];
        } else {
            let currentValue = result;

            for (let index = 0; index < match.length; index++) {
                const currentKey = match[index];
                const nextKey = match[index + 1];

                const val = index === match.length - 1
                    ? Number(data[key]) || data[key]
                    : /^\d+$/.test(nextKey)
                        ? []
                        : {};

                currentValue[currentKey] = currentValue[currentKey] || val;
                currentValue = currentValue[currentKey];
            }
        }
    }

    return result;
};

module.exports = async function(req, res, next) {
    if (req.method === 'OPTIONS') {
        next();
    }

    try {
        req.parsedBody = parseFormData(req.body);
        req.parsedFiles = parseFormData(req.files);
    
        next();
    } catch (e) {
        console.log(e);
        return res.status(400).json({ message: 'Ошибка в процессе парсинга данных' });
    }
};
