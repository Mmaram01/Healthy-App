import { Schema, model, Types } from "mongoose";
const favoriteSchema = new Schema(
  {
    userId:{
      type: Types.ObjectId,
      ref:"User",
      required:true,
      index: true,
    },
    recipeId:{
      type:Types.ObjectId,
      ref:"Recipe",
      index:true,
      required:true
    },
  },
  {timestamps: true}
);
//prevent rec
favoriteSchema.index({userId:1,recipeId: 1},
  {unique:true});
export const Favorite = model("Favorite", favoriteSchema);
