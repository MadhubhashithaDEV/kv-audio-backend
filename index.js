import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js";
import jwd from "jsonwebtoken"
import dotenv from "dotenv";
import reviewRouter from "./routes/reviewRouter.js";

dotenv.config();

let app = express();



app.use(bodyParser.json());
app.use((req,res,next)=>{

  let token = req.header
  ("Authorization")


// crate a token and authentication
  if(token!=null){
    token =token.replace("Bearer ","");

    jwd.verify(token,process.env.JWT_SECRET,(err,decoded)=>{

      if(!err){
        req.user = decoded;
      }

    });

  }
  next()

})

//mongo db connetion

let mongoUrl = process.env.MONGO_URI;

mongoose.connect(mongoUrl)
let connection = mongoose.connection

connection.once("open",()=>{
    console.log("MongoDB connection established successfully")
})



app.use("/api/users",userRouter);
app.use("api/products",productRouter);
app.use("/api/reviews",reviewRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");

});

