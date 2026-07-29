import multer from "multer";

const storage = multer.memoryStorage()
export const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // max limit 5MB
    },
    fileFilter: (req, file, cb) => {
        const allowed = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'];
        if (!allowed.includes(file.mimetype)) {
            return cb(new Error('Invalid file type. Only png, jpg, jpeg and webp are allowed'), false);
        }
        cb(null, true);
    }
});
