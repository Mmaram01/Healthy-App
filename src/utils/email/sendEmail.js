// import { transporter } from "./transporter.js";
// import { Resend } from "resend";
// export const sendEmail = async ({to, subject, html}) =>{
//   const info = await transporter.sendMail({
//     from: `"Healthy App" <${process.env.EMAIL}>`,
//     to,
//     subject,
//     html,
//   });

//   if(info.rejected.length){
//     throw new Error("Email rejected");
//   }
//   return true;
// };
import dotenv from "dotenv";
dotenv.config();


export const sendEmail = async ({ to, subject, html }) => {
  try {
    console.log("Sending email to:", to);
    await transporter.sendMail({
      from: `"Healthy App" <${process.env.EMAIL}>`,
      to,
      subject,
      html,
    });

    return true;
  } catch (err) {
    console.log("Email Error:", err.message);
    return false;
  }
};