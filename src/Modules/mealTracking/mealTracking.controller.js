import { Router } from "express";
import * as trackingService from "./mealTracking.service.js";
import * as trackingValidation from "./mealTracking.validation.js";
import { isAuthenticate } from "../../Middlewares/auth.middleware.js";
import { isValid } from "../../Middlewares/validation.middleware.js";
import { asyncHandler } from "../../utils/index.js";

const router = Router();
router.post(
  "/add",
  isAuthenticate,
  isValid(trackingValidation.addMeal),
  asyncHandler(trackingService.addMeal)
);

//get meals for specific date
router.get(
  "/",
  isAuthenticate,
  isValid(trackingValidation.getMealsByDate),
  asyncHandler(trackingService.getMealsByDate)
);

router.get(
  "/summary",
  isAuthenticate,
  isValid(trackingValidation.getDailySummary),
  asyncHandler(trackingService.getDailySummary)
);
router.patch(
  "/:id",
  isAuthenticate,
  isValid(trackingValidation.updateMeal),
  asyncHandler(trackingService.updateMeal)
);

router.delete(
  "/:id",
  isAuthenticate,
  isValid(trackingValidation.deleteMeal),
  asyncHandler(trackingService.deleteMeal)
);

router.get(
  "/status",
  isAuthenticate,
  isValid(trackingValidation.getDailyStatus),
  asyncHandler(trackingService.getDailyStatus)
);
//in weekly/monthly
router.get(
  "/summary/range",
  isAuthenticate,
  isValid(trackingValidation.getRangeSummary),
  asyncHandler(trackingService.getRangeSummary)
);

export default router;