import axios from "axios";
import type { PromptRequest } from "../models/promptRequest";

const reply=async(request:PromptRequest)=>{
      
    const response= await axios.post("https://localhost:8080",request);
    
    return response.data;
}

export default reply;