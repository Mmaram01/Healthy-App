import { Router } from "express";
import * as recipeService from "./recipe.service.js";
import * as recipeValidation from "./recipe.validation.js";
import { isAuthenticate } from "../../Middlewares/auth.middleware.js";
import { isValid } from "../../Middlewares/validation.middleware.js";
import { asyncHandler } from "../../utils/index.js";

const router = Router();
router.get("/",
  isValid(recipeValidation.getRecipes),
  asyncHandler(recipeService.getRecipes)
);

router.get("/:id",
  isValid(recipeValidation.getRecipeById),
  asyncHandler(recipeService.getRecipeById)
);

router.post("/:id/rate",
  isAuthenticate,
  isValid(recipeValidation.rateRecipe),
  asyncHandler(recipeService.rateRecipe)
);

export default router;