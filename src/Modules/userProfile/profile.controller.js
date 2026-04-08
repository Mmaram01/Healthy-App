import { Router } from "express";
import { isAuthenticate } from "../../Middlewares/auth.middleware.js";
import { isValid } from "../../Middlewares/validation.middleware.js";
import * as profileValidation from "./profile.validation.js";
import * as profileService from "./profile.service.js";
import { asyncHandler } from "../../utils/index.js";

const router = Router();
router.post("/upsert",
  isAuthenticate,
  isValid(profileValidation.upsertProfile),
  asyncHandler(profileService.upsertProfile)
);

router.get("/me",
  isAuthenticate,
  asyncHandler(profileService.getMyProfile)
);

router.delete("/delete",
  isAuthenticate,
  asyncHandler(profileService.deleteAccount)
);

export default router;
