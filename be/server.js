import express from "express" 
import { Database } from "./config/db/db.js";

const app = express(); 
const port = 3000; 


app.use(express.json()) 
app.use(express.urlencoded({ extended: true })) 
app.use(express.static("public")) 


app.get("/" , (req , res)=>{ 
    res.send('hello the server is running ')
})


app.listen(port , ()=>{ 
    console.log("The server is running at port " , port)
}); 
