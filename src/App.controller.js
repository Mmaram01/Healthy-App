import cors from "cors";
import connectDB from "./DB/connection.js";
import authRouter from "./Modules/auth/auth.controller.js";
import favoriteRouter from "./Modules/favorite/favorite.controller.js";
import recipeRouter from "./Modules/recipe/recipe.controller.js";
import profileRouter from "./Modules/userProfile/profile.controller.js";
import mealRouter from "./Modules/mealTracking/mealTracking.controller.js";
import { notFound, globalError } from "./utils/error/index.js";
const bootstrap = async (app, express) =>{
  app.use(cors());
  app.use(express.json());
  await connectDB();

  app.use("/auth", authRouter);
  app.use("/recipes", recipeRouter);
  app.use("/favorites", favoriteRouter);
  app.use("/profile", profileRouter);
  app.use("/meals", mealRouter);


  //error handling
  app.use(notFound);
  app.use(globalError);
};

export default bootstrap;