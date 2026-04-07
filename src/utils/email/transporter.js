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

// export const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false,
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.PASS,
//   },
//   connectionTimeout: 5000,
//   greetingTimeout: 5000,
//   socketTimeout: 5000,
// });



// export const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 465,            
//   secure: true,         
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.PASS, 
//   },

//   connectionTimeout: 10000,
//   greetingTimeout: 10000,
//   socketTimeout: 15000,

//   family: 4,
// });


export const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});