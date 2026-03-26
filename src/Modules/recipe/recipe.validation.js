import joi from "joi";
import { generalField } from "../../Middlewares/validation.middleware.js";

export const getRecipes = joi
  .object({
    mealType: joi.string().valid("breakfast", "lunch", "dinner", "snack"),

    minCalories: joi.number().min(0),
    maxCalories: joi.number().min(0),

    minProtein: joi.number().min(0),

    diet: joi.string().valid(
      "high_protein",
      "gluten_free",
      "keto",
      "low_carb"
    ),

    ingredient: joi.string().min(2),

    search: joi.string().min(2),

    sort: joi.string().valid(
      "calories",
      "macros.protein",
      "cookingTime",
      "createdAt"
    ),

    order: joi.string().valid("asc", "desc"),

    page: joi.number().min(1),
    limit: joi.number().min(1).max(50),
  })
  .required();

  export const rateRecipe = joi
  .object({
    id: generalField.id.required(),
    rating: joi.number().min(1).max(5).required(), // body
  })
  .required();


export const getRecipeById = joi.object({
  id: generalField.id.required(),
}).required();
