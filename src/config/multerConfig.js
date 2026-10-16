import multer from "multer";
import multerS3 from "multer-s3";
import { s3 } from "./awsConfig.js";
import { AWS_BUCKET_NAME } from "./serverConfig.js";

export const s3uploader = multer({
  storage: multerS3({
    s3,
    bucket: AWS_BUCKET_NAME,
    key(req, file, cb) {
      if(!file){
        console.log(file);
        return cb(new Error("File not Found"));
      }
      // Check mimetype for jpeg and png files only
if (
  file.mimetype !== "image/jpeg" &&
  file.mimetype !== "image/png"
) {
  return cb(new Error("Only JPEG and PNG files are allowed"));
}
      const uniqueSuffix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
      const extension = file.mimetype.split("/")[1];

      cb(null, `${file.fieldname}_${uniqueSuffix}.${extension}`);
    },
  }),
});