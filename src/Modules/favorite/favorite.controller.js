import { Router } from "express";
import * as favoriteService from "./favorite.service.js";
import * as favoriteValidation from "./favorite.validation.js";
import { isAuthenticate } from "../../Middlewares/auth.middleware.js";
import { isValid } from "../../Middlewares/validation.middleware.js";
import { asyncHandler } from "../../utils/index.js";

const router = Router();

router.post(
  "/:recipeId",
  isAuthenticate,
  isValid(favoriteValidation.toggleFavorite),
  asyncHandler(favoriteService.toggleFavorite)
);

router.get(
  "/",
  isAuthenticate,
  asyncHandler(favoriteService.getFavorites)
);

export default router;