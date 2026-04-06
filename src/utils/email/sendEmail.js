// import { transporter } from "./transporter.js";

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
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
export const sendEmail = async ({ to, subject, html }) => {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to,
      subject,
      html,
    });

    return true;
  } catch (err) {
    console.log("Resend Error:", err.message);
    return false;
  }
};