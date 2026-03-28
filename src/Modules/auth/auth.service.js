import { User } from "../../DB/models/user.model.js";
import { OTP } from "../../DB/models/otp.model.js";
import { generateOTP, hashOTP } from "../../utils/otp/index.js";
import { sendOtpEmail } from "../../utils/email/sendOtpEmail.js";
import { generateToken } from "../../utils/index.js";
import bcrypt from "bcrypt";
import { verifyGoogleToken } from "../../utils/google/verifyGoogle.js";

export const signup = async(req, res, next)=>{
  const{userName, email, password, phone}= req.body;
  const exists = await User.findOne({email:req.body.email,isDeleted:false});
  if(exists){
    throw new Error("Email already exists");
  }
  const user = await User.create({
    userName,
    email,
    password,
    phone,
    provider:"system",
  });

  const otpCode = generateOTP();
  const hashedCode = hashOTP(otpCode);
  await OTP.create({
    userId:user._id,
    code: hashedCode,
    type:"confirmEmail",
    expiresAt: new Date(Date.now() + 10 * 60 * 1000),
  });
  await sendOtpEmail({
    to: user.email,
    otp: otpCode,
    type: "confirmEmail",
  });

  return res.status(201).json({
    success: true,
    message: "OTP SENT",
    userId: user._id,
    email: user.email,
  });
};

export const confirmEmail= async(req, res, next)=>{
  const{email, otp}= req.body;

  const user= await User.findOne({email});
  if(!user) throw new Error("User not found");
  if(user.isEmailConfirmed){
    throw new Error("Email already confirmed");
  }
  const otpRecord = await OTP.findOne({
    userId:user._id,
    type: "confirmEmail",
  }).sort({createdAt: -1});

  if(!otpRecord){
    throw new Error("OTP not found or Expired");
  }
  const hashedInput =hashOTP(otp);
  if(hashedInput !== otpRecord.code){
    throw new Error("Invalid OTP");
  }
  user.isEmailConfirmed =true;
  await user.save();

  return res.status(200).json({
    success:true,
    message:"Email confirmed successfully",
  });
};

export const login = async(req, res, next)=>{
  const{email, password} =req.body;
  const user = await User.findOne({email}).select("+password");
  if(!user)throw new Error("Invlaid credentials");
  if(user.provider !=="system"){
    throw new Error("Use socila login");
  }
  if(!user.isEmailConfirmed){
    throw new Error("Email not comfirmed");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if(!isMatch) throw new Error("Invlaid credentials");
  const token = generateToken({
    payload:{
      userId:user._id,
      email:user.email,
    },
    expiresIn:"1h",
  });

  return res.status(200).json({
    success: true,
    message: "Login successfull",
    token,
    user:{
      id: user._id,
      email:user.email,
      userName: user.userName,
    },
  });
};

export const forgetPassword = async(req, res, next)=>{
  const{email} = req.body;
  const user = await User.findOne({email});
  if(!user){
    throw new Error("Email not found");
  }
  const otpCode = generateOTP();
  const hashedCode = hashOTP(otpCode);
  await OTP.create({
    userId:user._id,
    code:hashedCode,
    type:"resetPassword",
    expiresAt: new Date(Date.now() + 10 * 60 * 1000),
  });

  await sendOtpEmail({
    to: user.email,
    otp:otpCode,
    type:"resetPassword",
  });

  return res.status(200).json({
    success: true,
    message:"Reset otp sent",
  });
};

export const verifyOtp = async (req, res, next) => {
  const { email, otp} = req.body;

  const user = await User.findOne({email});
  if (!user) throw new Error("User not found");

  const otpRecord = await OTP.findOne({
    userId: user._id,
    type: "resetPassword",
  }).sort({ createdAt: -1 });

  if (!otpRecord) {
    throw new Error("OTP not found or expired");
  }

  const hashedInput = hashOTP(otp);

  if (hashedInput !== otpRecord.code) {
    throw new Error("Invalid OTP");
  }

  return res.status(200).json({
    success: true,
    message: "OTP verified successfully",
  });
};

export const resetPassword = async(req, res, next)=>{
  const{email, newPassword}=req.body;
  const user = await User.findOne({email});
  if(!user) throw new Error("User not found");

//hashing=> pre-save hook
  user.password = newPassword;
  await user.save();

  return res.status(200).json({
    success: true,
    message: "Password reset successful",
  });
};


export const googleAuth = async(req, res, next)=>{
  const{idToken} = req.body;
  const googleUser =await verifyGoogleToken(idToken);
  if (!googleUser.email_verified){
    throw new Error("Google email not verified");
  }

  let user = await User.findOne({email:googleUser.email});
  if (!user){
    user = await User.create({
      userName:googleUser.name,
      email: googleUser.email,
      provider:"google",
      isEmailConfirmed:true,
    });
  }

  if (user.provider !== "google"){
    throw new Error("Email registered with password");
  }
  const token =generateToken({
    payload:{
      userId:user._id,
      email:user.email,
    },
    expiresIn:"1h",
  });

  return res.status(200).json({
    success: true,
    message: "Google login successfully",
    token,
    user:{
      id:user._id,
      email:user.email,
      userName:user.userName,
    },
  });
};