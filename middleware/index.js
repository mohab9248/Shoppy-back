import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage });

function uploadImage(req, res, next) {
    upload.single("image")(req, res, (err) => {
        if (err) {
            return next(err);
        }
        // Check if 'req.file' is undefined, indicating no file was uploaded
        if (!req.file) {
            console.log("No image provided. Skipping image upload.");
            return next();
        }

        // Set the uploaded image file path to 'req.body.image'
        req.body.image = req.file.path;
        next();
    });
}

function uploadMultiImage(req, res, next) {
    upload.array("image")(req, res, (err) => {
        if (err) {
            return next(err);
        }
        // Check if 'req.files' is undefined, indicating no files were uploaded
        if (!req.files || req.files.length === 0) {
            console.log("No images provided. Skipping image upload.");
            return next();
        }

        // Set the uploaded image file paths to an array in 'req.body.images'
        req.body.images = req.files.map((file) => file.path);
        next();
    });
}

const imges = { uploadImage, uploadMultiImage };

export default imges;
