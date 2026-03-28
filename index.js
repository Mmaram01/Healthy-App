// import express from "express";
// import bootstrap from "./src/App.controller.js";
// import dotenv from "dotenv";
// // dotenv.config();
// dotenv.config({ path: process.env.NODE_ENV === 'production' ? false : '.env' });
// const app = express();
// bootstrap(app,express);
// const port = process.env.PORT||3000;
// app.listen(port, ()=>{
//     console.log("server is running in port", port);
// });
import express from "express";
import bootstrap from "./src/App.controller.js";
import dotenv from "dotenv";

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const app = express();
bootstrap(app, express);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("server is running in port", port);
});