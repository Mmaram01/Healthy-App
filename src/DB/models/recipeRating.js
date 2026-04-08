import { Schema, model, Types } from "mongoose";

const recipeRatingSchema = new Schema({
  userId: {
    type:Types.ObjectId,
    ref:"User",
    required:true
  },
  recipeId:{
    type:Types.ObjectId,
    ref:"Recipe",
    required:true
  },
  rating:{
    type:Number,
    min:1,
    max:5,
    required:true
  },
}, 
{timestamps:true});

recipeRatingSchema.index({ userId: 1, recipeId:1}, {unique: true});

export const RecipeRating = model("RecipeRating", recipeRatingSchema);
