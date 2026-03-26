import { UserProfile } from "../../DB/models/userProfile.model.js";
import { calculateDailyCalories } from "../../utils/health/calculateCalories.js";
import { calculateMacros } from "../../utils/health/calculateMacros.js";
import { calculateWeightChangeDuration } from "../../utils/health/calculateWeightDuration.js";
import { calculateWeightProgress } from "../../utils/health/calculateWeightProgress.js";
import { User } from "../../DB/models/user.model.js";


export const upsertProfile = async (req, res, next) =>{
  const userId =req.authUser._id;
  const user = await User.findById(userId);
  if(!user){return next(new Error("User not found",{cause: 404}));}
  const{dailyCalories, tdee}= calculateDailyCalories(req.body);
  const macros =calculateMacros(dailyCalories);

  let estimatedWeightChange = null;
  let weightProgress =null;
  if(req.body.goal=== "lose" &&req.body.targetLoseKg){
    estimatedWeightChange =calculateWeightChangeDuration({
      tdee,
      dailyCalories,
      targetKg:req.body.targetLoseKg,
      type:"lose"
  });
    weightProgress = calculateWeightProgress({
      currentWeight:req.body.weight,
      targetKg:req.body.targetLoseKg,
      weeks:estimatedWeightChange.weeks,
      type:"lose"
  });}

  if(req.body.goal ==="gain" && req.body.targetGainKg){
    estimatedWeightChange =calculateWeightChangeDuration({
      tdee,
      dailyCalories,
      targetKg:req.body.targetGainKg,
      type:"gain"
    });
    weightProgress = calculateWeightProgress({
      currentWeight:req.body.weight,
      targetKg:req.body.targetGainKg,
      weeks:estimatedWeightChange.weeks,
      type:"gain"
  });}

  const profile = await UserProfile.findOneAndUpdate(
    {userId},
    {...req.body, dailyCalories, macros},
    {new:true, upsert:true,runValidators:true});
  return res.status(200).json({
    success:true,
    data:profile,
    estimatedWeightChange,
    weightProgress
});
};

export const getMyProfile = async(req, res, next) =>{
  const userId = req.authUser._id;
  const user = await User.findById(userId);
  if(!user){return next(new Error("User not found",
    {cause:403}));}
  const profile = await UserProfile.findOne({userId});
  if(!profile){
    return next(new Error("profile not found",{cause:404}));}
    return res.status(200).json({success:true, data:profile});
};


export const deleteAccount = async (req, res, next)=>{
  const userId = req.authUser._id;
  await User.findByIdAndDelete(userId);
  await UserProfile.findOneAndDelete({userId});
  return res.status(200).json({
    success: true,
    message:"Account deleted successfully",
  });

};