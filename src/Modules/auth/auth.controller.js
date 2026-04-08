import { Router } from "express";
import * as authService from "./auth.service.js";
import * as authValidation from "./auth.validation.js" 
import { asyncHandler } from "../../utils/error/async-handler.js";
import { isValid } from "../../Middlewares/validation.middleware.js";
const router = Router();
router.post("/signup", 
    isValid(authValidation.signup), 
    asyncHandler(authService.signup));
router.post(
    "/confirm-email", 
    isValid(authValidation.confirmEmail), 
    asyncHandler(authService.confirmEmail));
router.post("/login", 
    isValid(authValidation.login), 
    asyncHandler(authService.login));
router.post(
    "/forget-password", 
    isValid(authValidation.forgetPassword), 
    asyncHandler(authService.forgetPassword));
router.post(
    "/verify-otp",
    asyncHandler(authService.verifyOtp)
);
router.post(
    "/reset-password", 
    isValid(authValidation.resetPassword), 
    asyncHandler(authService.resetPassword));
router.post("/google", 
    isValid(authValidation.googleAuth), 
    asyncHandler(authService.googleAuth));

export default router;