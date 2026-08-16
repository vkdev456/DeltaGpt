import axios from 'axios';
import type { SignupRequest } from '../models/SingupRequest';
import type { LoginRequest } from '../models/LoginRequest';


const signup=async(request:SignupRequest)=>{

    const response=await axios.post("http://localhost:8080/signup",request);

    return response;
}

const login=async(request:LoginRequest)=>{
    
    const response=await axios.post("http://localhost:8080/login",request);
    return response;
}

export {signup,login};
