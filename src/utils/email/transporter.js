import nodemailer from "nodemailer";

// export const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port:587,
//   secure: false,
//   auth:{
//     user:process.env.EMAIL,
//     pass:process.env.PASS,
//   },
// });

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
  connectionTimeout: 5000,
  greetingTimeout: 5000,
  socketTimeout: 5000,
});
