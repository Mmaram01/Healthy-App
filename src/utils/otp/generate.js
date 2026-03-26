import crypto from "crypto";
export const generateOTP =()=>{
  return crypto.randomInt(10000, 99999).toString();
};
