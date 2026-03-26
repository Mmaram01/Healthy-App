import joi from "joi";

export const upsertProfile = joi.object({
  gender: joi.string().valid("male", "female").required(),
  age: joi.number().min(10).max(100).required(),
  height: joi.number().min(100).max(250).required(),
  weight: joi.number().min(30).max(300).required(),
  goal: joi.string().valid("lose", "maintain", "gain").required(),
  activityLevel: joi.string().valid("sedentary","light","moderate","very").required(),
  targetLoseKg: joi.number().min(1).max(100).optional(),
  targetGainKg: joi.number().min(1).max(50).optional()
}).required();
