import Joi from "joi";
import { Types } from "mongoose";

export const isValid = (schema)=>{
  return (req, res, next) =>{
    if (!schema || typeof schema.validate !== "function"){
      throw new Error("Invalid schema");
    }
    const data={...req.body,...req.query,...req.params};
    if(req.file || req.files){
      data.attachment= req.file || req.files;
    }
    const{error} = schema.validate(data,{abortEarly: false});
    if (error){
      const messages = error.details.map((d) => d.message).join(", ");
      throw new Error(messages);
    }
    next();
  };
};



export const generalField ={
  id: Joi.custom(isValidId),
  attachment: Joi.object({
    fieldname: Joi.string().required(),
    originalname: Joi.string().required(),
    encoding: Joi.string().required(),
    mimetype: Joi.string().required(),
    destination: Joi.string().required(),
    filename: Joi.string().required(),
    path: Joi.string().required(),
    size: Joi.number().required(),
  }),
};

export function isValidId(value, helpers){
  if (!Types.ObjectId.isValid(value)){
    return helpers.message("Invalid id");
  }
  return value;
}
