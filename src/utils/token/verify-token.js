// import jwt from "jsonwebtoken";
// export const verifyToken =({token, secretKey = process.env.SECRET_JWT}) =>{
//     try{
//     return jwt.verify(token, secretKey); // payload
//     } catch(error){
//       return{error};
//     }
//   };
import jwt from "jsonwebtoken";

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.SECRET_JWT);
};
