//import { transporter } from "./transporter.js";

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
import { transporter } from "./transporter.js";

export const sendEmail = async ({ to, subject, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `"Healthy App" <${process.env.EMAIL}>`,
      to,
      subject,
      html,
    });

    if (info.rejected.length) {
      throw new Error("Email rejected");
    }

    return true;
  } catch (err) {
    console.log("SMTP Error:", err.message);
    return false;
  }
};