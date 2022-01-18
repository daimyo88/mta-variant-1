const path = require('path');
const csv = require('csvtojson');
const fs = require('fs');

const controller = async (req, res, next) => {
    try {
        const documentPath = path.resolve(req.file.path);
        const jsonArray = await csv().fromFile(documentPath);
        fs.unlink(documentPath, (e) => {});
        
        res.json(jsonArray);

    } catch(err) {
        return next(err);
    }
}

module.exports = controller;