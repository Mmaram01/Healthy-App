import { User } from "../DB/models/user.model.js";
import { verifyToken } from "../utils/index.js";

export const isAuthenticate = async(req, res, next)=>{
  const {authorization}= req.headers;
  if(!authorization){
    throw new Error("Authorization hearder missing");
  }
  const token = authorization.split(" ")[1];
  const decoded =verifyToken(token);
  const user =await User.findById(decoded.userId);
  if (!user){
    throw new Error("User not found");
  }
  if(user.isDeleted){
    return next(new Error("Account has been deleted", { cause: 403 }));
  }
  req.authUser = user;
  next();
};
