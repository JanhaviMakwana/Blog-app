const multer = require('multer');
const fs = require('fs');

const getFileType = (file) => {
    const mimeType = file.mimetype.split('/');
    return mimeType[mimeType.length - 1];
};

const generateFileName = (req, file, cb) => {
    const { blogId } = req.params;
    const extension = getFileType(file);
    const filename = blogId + '.' + extension;
    cb(null, file.fieldname + filename);
};

const fileFilter = (req, file, cb) => {
    const extention = getFileType(file)
    const allowedType = /jpeg|jpg|png/
    const passed = allowedType.test(extention)

    if (passed) {
        return cb(null, true)
    }
    return cb(null, false)
};

exports.blogImageUpload = ((req, res, next) => {

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {

            const dest = `uploads`

            fs.access(dest, (error) => {
                if (error) {
                    return fs.mkdir(dest, (error) => {
                        cb(error, dest)
                    })
                } else {
                    return cb(null, dest)
                }
            })
        },
        filename: generateFileName
    });
    return multer({ storage, fileFilter }).single('image')
})();

