import axios from "axios";

const threads = async()=>{
      const response= await axios.get("http://localhost:8080/threads");

      return response.data;
}


export default threads;