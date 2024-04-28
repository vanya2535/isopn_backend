const fs = require('fs');
const path = require('path');
const { v4: uuid } = require('uuid');

class FileService {
    saveFile(file) {
        try {
            const fileName = uuid() + `.${file.name.split('.')[1]}`;
            file.mv(path.resolve('static', fileName));
            return fileName;
        } catch (e) {
            console.log(e);
        }
    }

    removeFile(fileName) {
        try {
            const filePath = path.resolve('static', fileName);
            fs.unlinkSync(filePath);
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new FileService();
