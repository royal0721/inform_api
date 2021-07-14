const GridFsStorage = require('multer-gridfs-storage');
const multer = require('multer');
let storage = new GridFsStorage({
    url: 'your mongodb',
    file: (req, file) => {
        return new Promise(
            (resolve, reject) => {
                       const fileInfo = {
                    filename: file.originalname,
                    bucketName: "imageUpload"
                }
                resolve(fileInfo)

            }
        )
    }
})
const upload = multer({ storage })
module.exports=upload;
