import axios from "axios";
import type { PromptRequest } from "../models/PromptRequest";

const reply=async(request:PromptRequest)=>{
      
    const response= await axios.post("http://localhost:8080/chat",request);
    
    return response.data;
}

export default reply;