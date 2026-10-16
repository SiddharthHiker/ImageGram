export const validate = (schema) => {
    return async (req, res, next) => {
        try {
           // multer.single('image') stores the uploaded file in req.file.
           schema.parse({ ...req.body, image: req.file });
           next();
        } catch (error) {
            return res.status(400).json({
                success:false,
                message:"Validation Error",
                errors: error.issues ?? [{ message: error.message }]
            })
        }
    }
}
