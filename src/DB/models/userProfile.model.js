import { Schema, model, Types } from "mongoose";

const profileSchema = new Schema({
  userId:{
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },
  gender:{
    type:String,
    enum:["male", "female"],
    required: true
  },
  age:{type:Number,required: true},

  height:{type:Number,required: true},

  weight:{type: Number,required:true},

  goal:{
    type: String,
    enum:["lose", "maintain", "gain"],
    required: true
  },

  activityLevel:{
    type: String,
    enum:["sedentary","light","moderate","very"],
    required: true
  },

  dailyCalories:{
    type:Number,
    required: true
  },
  // =>gram
  macros:{
    protein:{
      type: Number, 
      required:true
    },
    carbohydrates:{
      type: Number, 
      required: true
    },
    fats:{
      type: Number, 
      required:true
    },
  },
}, {timestamps:true});
export const UserProfile = model("UserProfile",profileSchema);