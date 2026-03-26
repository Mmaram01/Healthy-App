import joi from "joi";
import { generalField } from "../../Middlewares/validation.middleware.js";

export const addMeal = joi
  .object({
    recipeId: generalField.id.required(),
    date: joi.date().required(),
  })
  .required();

export const getMealsByDate = joi
  .object({
    date: joi.date().required(),
  })
  .required();

export const getDailySummary = joi
  .object({
    date: joi.date().required(),
  })
  .required();

export const updateMeal = joi
  .object({
    id: generalField.id.required(),   
    date: joi.date().optional(),
    mealType: joi.string()
      .valid("breakfast", "lunch", "dinner", "snack")
      .optional(),
  })
  .min(1)
  .required();


export const deleteMeal = joi.object({
  id: generalField.id.required(),
});

export const getDailyStatus = joi
  .object({
    date: joi.date().required(),
  })
  .required();

export const getRangeSummary = joi
  .object({
    startDate: joi.date().required(),
    endDate: joi.date().required(),
  })
  .required();

