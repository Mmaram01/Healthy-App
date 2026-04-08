import { Recipe } from "../../DB/models/recipe.model.js";
import { Favorite } from "../../DB/models/favorite.model.js";
import { RecipeRating } from "../../DB/models/recipeRating.js";
export const getRecipes =async(req, res,next)=>{
  const {
    mealType,
    minCalories,
    maxCalories,
    minProtein,        
    diet,              
    ingredient,        
    sort,              
    order = "asc",
    search,
    page = 1,
    limit = 10,
  }= req.query;

  const filter ={isActive: true};
  if(mealType)filter.mealType = mealType;
  if(minCalories || maxCalories){
    filter.calories = {};
    if(minCalories) filter.calories.$gte = Number(minCalories);
    if(maxCalories) filter.calories.$lte = Number(maxCalories);
  }
  if(minProtein){
    filter["macros.protein"] ={$gte: Number(minProtein)};
  }
  if(diet){filter.dietTags = diet}

  if(search){filter.name ={$regex: search,$options:"i"}}
  if(ingredient){
    filter["ingredients.name"]={
      $regex: ingredient,
      $options:"i",
    };
  }
  const skip =(Number(page) - 1) * Number(limit);
  const allowedSortFields =[
  "calories",
  "cookingTime",
  "macros.protein",
  "macros.carbohydrates",
  "macros.fats"
];

  let sortOption ={calories: 1};
if(sort && allowedSortFields.includes(sort)){
  sortOption ={
    [sort]:order === "desc" ?-1 :1,
  };
}

  const recipes = await Recipe.find(filter)
    .sort(sortOption)
    .skip(skip)
    .limit(Number(limit));

  const total = await Recipe.countDocuments(filter);
  let favoriteSet =new Set();
  if(req.authUser){
    const favorites = await Favorite.find({
      userId:req.authUser._id,
    }).select("recipeId");
    favoriteSet= new Set(
      favorites.map((f) => f.recipeId.toString())
    );
  }
  const data = recipes.map((recipe)=>({...recipe.toObject(),
    isFavorite: favoriteSet.has(recipe._id.toString()),
  }));

  return res.status(200).json({
    success: true,
    page:Number(page),
    results:data.length,
    total,
    data,
  });
};

export const getRecipeById =async(req, res,next)=>{
  const{id} = req.params;
  const recipe = await Recipe.findOne({
    _id:id,
    isActive:true,
  });
  if(!recipe){
    return next(new Error("Recipe not found",{cause:404}));
  }
  let isFavorite = false;
if (req.authUser){
  const fav = await Favorite.findOne({
    userId:req.authUser._id,
    recipeId:recipe._id,
  });
  isFavorite = !!fav;
}
  return res.status(200).json({
    success:true,
    data:{...recipe.toObject(),isFavorite}
});
};

export const rateRecipe = async (req, res, next)=>{

  const userId = req.authUser._id;
  const{id} = req.params;
  const{rating} = req.body;

  const recipe = await Recipe.findById(id);
  if(!recipe || !recipe.isActive){
    return next(new Error("Recipe not found",{cause: 404}));
}

  const existingRating = await RecipeRating.findOne({userId, recipeId: id});

  if (existingRating){
    const oldRating = existingRating.rating;
    existingRating.rating = rating;
    await existingRating.save();

    recipe.averageRating =
      (recipe.averageRating * recipe.ratingsCount - oldRating + rating) /
      recipe.ratingsCount;

    await recipe.save();

    return res.status(200).json({
      success: true,
      message: "Rating updated successfully",
      averageRating: recipe.averageRating,
  });
  }

  await RecipeRating.create({
    userId,
    recipeId: id,
    rating,
  });

  recipe.averageRating =
    (recipe.averageRating * recipe.ratingsCount + rating) /
    (recipe.ratingsCount + 1);
  recipe.ratingsCount += 1;
  await recipe.save();

  return res.status(201).json({
    success: true,
    message:"Recipe rated successfully",
    averageRating: recipe.averageRating,
  });
};
