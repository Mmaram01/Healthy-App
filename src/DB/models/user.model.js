import { model, Schema, mongoose } from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new Schema(
    {
      userName:{
        type: String,
        required: true,
        trim: true,
        },
        email:{
            type: String, 
            required: true,
            unique: true, 
            toLowerCase: true,
            index: true,
        },
        password:{type:String,
            required: function(){
                return this.provider =="system";
            },
            select:false,
        },
        phone:{type: String},
        isEmailConfirmed:{
            type: Boolean,
            default: false,
        },
        provider:{
      type: String,
      enum:["system", "google", "apple"],
      default: "system",
    },
    isDeleted:{
  type: Boolean,
  default: false,
    },
deletedAt:{type: Date},      
  },
    {timestamps: true}
);

// hooks
userSchema.pre("save", async function (next){
  if(this.isModified("password") && this.password){
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

export const User=mongoose.models.User || mongoose.model("User",userSchema);