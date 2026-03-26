import joi from 'joi';
export let  signup = joi
       .object({
              userName: joi.string().min(2).max(20).required(),
              email: joi.string().email().required(),
              password: joi.string().required(),
              phone: joi.string().required(),
        })
        .required();

export const confirmEmail = joi.object({
  email: joi.string().email().required(),

  otp: joi.string().length(5).required(),
}).required();
export let login = joi
       .object({
        email: joi.string().email().required(),
        password: joi.string().required(),
        })
        .required();

export const forgetPassword = joi.object({
  email: joi.string().email().required(),
}).required();

export const resetPassword = joi.object({
  email: joi.string().email().required(),
  newPassword: joi.string().min(6).required(),
}).required();


export const googleAuth = joi.object({
  idToken: joi.string().required(),
}).required();