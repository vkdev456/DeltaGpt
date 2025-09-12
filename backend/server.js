import OpenAI from "openai";
import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  connectDB();
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














