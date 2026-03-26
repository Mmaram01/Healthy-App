import joi from "joi";
import { generalField } from "../../Middlewares/validation.middleware.js";

export const toggleFavorite = joi
  .object({
    recipeId: generalField.id.required(),
  })
  .required();
