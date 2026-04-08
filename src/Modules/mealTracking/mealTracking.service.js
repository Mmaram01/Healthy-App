import { MealTracking } from "../../DB/models/mealTracking.model.js";
import { Recipe } from "../../DB/models/recipe.model.js";
import { UserProfile } from "../../DB/models/userProfile.model.js";

export const addMeal =async(req, res, next)=>{
  const userId = req.authUser._id;
  const{recipeId, date} = req.body;
  //get recipe
  const recipe = await Recipe.findById(recipeId);
  if(!recipe || !recipe.isActive){
    return next(new Error("Recipe not found",{cause:404}));
  }
  const meal = await MealTracking.create({
    userId,
    recipeId:recipe._id,
    mealType:recipe.mealType,
    date:new Date(date),
    calories: recipe.calories,
    macros:{
      protein: recipe.macros.protein,
      carbohydrates:recipe.macros.carbohydrates,
      fats:recipe.macros.fats,
    },
  });

  return res.status(201).json({
    success:true,
    message:"Meal added successfully",
    data: meal,
  });
};

export const getMealsByDate =async(req, res, next)=>{
  const userId =req.authUser._id;
  const{date}= req.query;
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  const end = new Date(date);
  end.setHours(23, 59, 59, 999);

  const meals = await MealTracking.find({
    userId,
    date: {$gte: start, $lte: end},
  })
    .populate("recipeId","name image calories macros mealType")
    .sort({ createdAt: 1 });

  return res.status(200).json({
    success: true,
    results: meals.length,
    data: meals,
  });
};

export const getDailySummary =async(req, res, next)=>{
  const userId = req.authUser._id;
  const{date}= req.query;
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  const end = new Date(date);
  end.setHours(23, 59, 59, 999);
  const meals = await MealTracking.find({
    userId,
    date:{ $gte: start, $lte: end},
  });

  let summary ={
    calories:0,
    protein:0,
    carbohydrates:0,
    fats:0,
    mealsCount: meals.length,
  };
  for(const meal of meals) {
    summary.calories += meal.calories;
    summary.protein += meal.macros.protein;
    summary.carbohydrates += meal.macros.carbohydrates;
    summary.fats += meal.macros.fats;
  }

  return res.status(200).json({
    success: true,
    date,
    summary,
  });
};

export const updateMeal =async(req, res, next)=>{
  const userId = req.authUser._id;
  const{id}= req.params;
  const{recipeId, date}= req.body;

  const meal = await MealTracking.findOne({ _id: id, userId});
  if(!meal){
    return next(new Error("Meal not found",{cause:404}));
  }
  if(recipeId){
    const recipe = await Recipe.findById(recipeId);
    if(!recipe || !recipe.isActive){
      return next(new Error("Recipe not found",{cause:404}));
    }

    meal.recipeId = recipe._id;
    meal.mealType = recipe.mealType;
    meal.calories = recipe.calories;
    meal.macros = recipe.macros;
  }
  if(date){
    meal.date = new Date(date);
  }
  await meal.save();

  return res.status(200).json({
    success:true,
    message:"Meal updated successfully",
    data:meal,
  });
};

export const deleteMeal =async(req, res, next)=>{
  const userId = req.authUser._id;
  const{id}= req.params;
  const meal = await MealTracking.findOneAndDelete({ _id: id, userId});
  if(!meal){
    return next(new Error("Meal not found",{cause:404}));
  }

  return res.status(200).json({
    success: true,
    message: "Meal deleted successfully",
  });
};


export const getDailyStatus =async(req, res, next)=>{
  const userId = req.authUser._id;
  const{date}= req.query;
  const profile = await UserProfile.findOne({userId});
  if(!profile) {
    return next(new Error("User profile not found",{cause:404}));
  }
  //date range
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  const end = new Date(date);
  end.setHours(23, 59, 59, 999);
  //get meals
  const meals = await MealTracking.find({
    userId,
    date: { $gte: start, $lte: end },
  });
  //calculate consumed
  const consumed={
    calories:0,
    protein:0,
    carbohydrates:0,
    fats:0,
  };
  for(const meal of meals){
    consumed.calories += meal.calories;
    consumed.protein += meal.macros.protein;
    consumed.carbohydrates += meal.macros.carbohydrates;
    consumed.fats += meal.macros.fats;
  }
  //calculate remaining ==>>>befor guard
  const remainingCalories = profile.dailyCalories - consumed.calories;
  const remainingProtein =
  profile.macros.protein - consumed.protein;
  const remainingCarbs =
  profile.macros.carbohydrates - consumed.carbohydrates;
  const remainingFats =
  profile.macros.fats - consumed.fats;

  //guards+flags
  const flags = {
    overCalories: remainingCalories < 0,
    overProtein: remainingProtein < 0,
    overCarbohydrates: remainingCarbs < 0,
    overFats: remainingFats < 0,
    noMeals: meals.length === 0,
  };

  return res.status(200).json({
    success: true,
    date,
    consumed,
    target: {
  calories: profile.dailyCalories,
  protein: profile.macros.protein,
  carbohydrates: profile.macros.carbohydrates,
  fats: profile.macros.fats,
},
    remaining: {
      calories: Math.max(0, remainingCalories),
      protein: Math.max(0, remainingProtein),
      carbohydrates: Math.max(0, remainingCarbs),
      fats: Math.max(0, remainingFats),
    },
    flags,
  });
};


export const getRangeSummary =async(req, res, next)=>{
  const userId = req.authUser._id;
  const{startDate, endDate}= req.query;
  const start = new Date(startDate);
  start.setHours(0, 0, 0, 0);
  const end = new Date(endDate);
  end.setHours(23, 59, 59, 999);

  if(start>end){
    return next(new Error("Invalid date range",{cause:400}));
  }
  const meals =await MealTracking.find({
    userId,
    date:{$gte:start, $lte: end},
  });
  const summary={
    calories:0,
    protein:0,
    carbohydrates:0,
    fats:0,
    mealsCount:meals.length,
  };

  for(const meal of meals){
    summary.calories += meal.calories;
    summary.protein += meal.macros.protein;
    summary.carbohydrates += meal.macros.carbohydrates;
    summary.fats += meal.macros.fats;
  }
  const days =Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  const effectiveDays = days > 0 ? days : 1;

  const average ={
    calories: Math.round(summary.calories / effectiveDays),
    protein: Math.round(summary.protein / effectiveDays),
    carbohydrates: Math.round(
      summary.carbohydrates / effectiveDays
    ),
    fats: Math.round(summary.fats / effectiveDays),
  };

  return res.status(200).json({
    success:true,
    range:{startDate, endDate},
    days,
    summary,
    averagePerDay:average,
    flags:{noMeals:meals.length ===0},
  });
};

