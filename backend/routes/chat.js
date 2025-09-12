import express from "express";
import Thread from "../models/Thread.js";


const router=express.Router();

//test
router.post('/test',async(req,res)=>{
    try{
        const thread = new Thread({
            threadId:"xyz12345",
            title:"Testing new Thread"
        })
 
        const response =await thread.save();
        res.send(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Failed to save in DB"})
    }
})

//get all threads
router.get("/thread", async(req,res)=>{
    try{
        const threads= await Thread.find({}).sort({updatedAt: -1});
        res.json(threads);
    }catch(err){
        res.status(500).json({error: "Failed to fetch threads"});
    }
});

export default router;

