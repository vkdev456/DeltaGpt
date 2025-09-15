import OpenAI from "openai";
import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js" 

dotenv.config();

const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());

app.use("/api",chatRoutes);//routes this run the route file 

app.listen(port, async() => {
  await connectDB();
  console.log(`Server running on port ${port}`);

 
});

const connectDB = async()=>{
  try{
    await mongoose.connect(process.env.MONGODB_URL);    
    console.log("connected to DB");
  }
  catch(err){
    console.log("Connection Failed",err)
  }
}















