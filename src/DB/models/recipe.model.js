import { model, Schema } from "mongoose";
const recipeSchema = new Schema(
  {
    name:{
    type:String,
      required: true,
      trim: true,
    },
    description:{
    type:String,
      required: true,
    },
    image:{
      secure_url:{type:String, required:true},
      public_id:{type:String, required:true},
    },
    
    mealType:{
    type:String,
      enum:["breakfast", "lunch", "dinner", "snack"],
      required:true,
    },
    cookingTime:{                
      type:Number,             
      required: true,
    },

    calories:{
      type: Number,
      required:true,
    },

    macros:{
      protein:{ type: Number, required:true},
      carbohydrates:{ type: Number, required:true},
      fats:{ type: Number, required:true},
    },
    dietTags: {   
      type: [String],
      enum: [
        "high_protein",
        "gluten_free",
        "keto",
        "low_carb",
        "vegan",
      ],
      default: [],
    },

    ingredients:[
    {
        name:{type:String,required:true},
        quantity:{type:String, required:true},
      },
    ],
    steps: [
  {
    order: { type: Number, required: true },
    description: { type: String, required: true },
  },
],

    

    isActive:{
      type: Boolean,
      default: true,
    },
    averageRating: {
  type: Number,
  default: 0,
  },
    ratingsCount: {
  type: Number,
  default: 0,

  },
  },
  { timestamps: true }
);
export const Recipe = model("Recipe",recipeSchema);