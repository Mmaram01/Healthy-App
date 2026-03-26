import multer, { diskStorage } from "multer";
export const fileValidation= {
    images:["image/jpeg","image/png","image/webp"],
    files:["application/pdf","application/msword"]
};

export const cloudUpload = (allowedTypes)=>{
    try {
        const storage = multer.diskStorage({});
        const fileFilter = (req, file, cb) =>{
            if(!allowedTypes.includes(file.mimetype)){
             return cb(new Error("invlaid file formate"), false);
            }
            return cb(null, true);
        };
        return multer({storage, fileFilter,limits:{
            fieldSize:5*1024*1024,
        }});
    } catch (error) {
        console.log(error.message);
    }
}
