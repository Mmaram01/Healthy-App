import { Schema, model, Types } from "mongoose";

const mealTrackingSchema = new Schema(
  {
    userId:{
      type:Types.ObjectId,
      ref: "User",
      required:true
    },
    recipeId:{
      type:Types.ObjectId,
      ref:"Recipe",
      required:true
    },
    mealType:{
      type:String,
      enum: ["breakfast","lunch", "dinner","snack"],
      required:true
    },
    date:{
      type:Date,
      required:true
    },
    calories:{
      type:Number,
      required:true
    },
    macros:{
      protein:{
        type:Number,
        required:true
      },
      carbohydrates:{
        type:Number,
        required:true
      },
      fats:{
        type:Number,
        required:true
      },
    },
  },
  {timestamps:true}
);

export const MealTracking = model("MealTracking",mealTrackingSchema);