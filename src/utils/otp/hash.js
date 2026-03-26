import crypto from "crypto";
export const hashOTP =(code)=>{
  return crypto.createHash("sha256").update(code).digest("hex");
};
