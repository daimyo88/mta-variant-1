const multer = require('multer');
var mime = require('mime-types');
const { v4: uuidv4 } = require('uuid');
var fs = require('fs');

const uploadCSV = multer({
    limits: 20000000,
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            const dir = 'uploads/temp'; 
            if (!fs.existsSync(dir)){
                 fs.mkdirSync(dir, {recursive: true});
            }
            cb(null, dir);
        },
        filename: async (req, file, cb) => {
            const ext = mime.extension(file.mimetype);
            cb((null), uuidv4() + '.' + ext);
        }
    })
});

module.exports = uploadCSV;