import { Favorite } from "../../DB/models/favorite.model.js";
import { Recipe } from "../../DB/models/recipe.model.js";

export const toggleFavorite =async(req, res, next)=>{
  const userId = req.authUser._id;
  const{recipeId}= req.params;

  const recipe = await Recipe.findOne({
    _id: recipeId,
    isActive: true
  });
  if(!recipe || !recipe.isActive){
    return next(new Error("Recipe not found",{cause: 404}));
  }
  const deleted = await Favorite.deleteOne({userId, recipeId});
  if(deleted.deletedCount > 0){
    return res.status(200).json({
      success: true,
      message:"Recipe removed from favorites",
      isFavorite: false,
    });
  }
  await Favorite.create({userId, recipeId});

  return res.status(201).json({
    success: true,
    message:"Recipe added to favorites",
    isFavorite:true,
  });
};

export const getFavorites =async(req, res, next)=>{
  const userId = req.authUser._id;
  const favorites = await Favorite.find({userId})
    .populate("recipeId")
    .sort({createdAt:-1});

  return res.status(200).json({
    success:true,
    results: favorites.length,
    data:favorites.map((f)=>f.recipeId),
  });
};
