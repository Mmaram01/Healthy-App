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

    await transporter.verify();
    console.log("SMTP connected");

    const info = await transporter.sendMail({
      from: `"Healthy App" <maramshalaby88@gmail.com>`,
      to,
      subject,
      html,
    });

    console.log("Email sent:", info.messageId);

    return true;
  } catch (err) {
    console.log("Email Error FULL:", err);
    return false;
  }
};