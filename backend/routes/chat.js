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

//threadid
router.get("/thread/:threadId",async(req,res)=>{
    const {threadId}=req.params;
    try{
       const threadid=await Thread.findOne({threadId});

       if(!threadid){
         res.status(404).json({error: "Thread not found"});
       }
       res.json(threadid);

    }catch(err){
        res.status(500).json({error: "Failed to fetch threadsid"});
    }

})

//delete thread
router.delete("/thread/:threadId",async(req,res)=>{
    const {threadId}=req.params;
    try{
       const deletethread=await Thread.findOneAndDelete({threadId});

       if(!deletethread){
         res.status(404).json({error: "Thread not found"});
       }
       res.status(200).json({success:"Thread deleted successfully"});

    }catch(err){
        res.status(500).json({error: "Failed to delete thread"});
    }

})

export default router;

