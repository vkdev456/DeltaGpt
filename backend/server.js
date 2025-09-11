import OpenAI from "openai";
import dotenv from "dotenv";
import cors from "cors";
import express from "express";

dotenv.config();

const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.post("/test", async (req, res) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: req.body.message,
        },
      ],
    }),
  };

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", options);
    const data = await response.json(); 
    console.log(data);
    res.json(data); 
  } catch (err) {
    console.error(err);
  }
});
