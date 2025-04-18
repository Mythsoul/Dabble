import express from "express" 
import { Database } from "./config/db/db.js";
import cors from "cors"; 
import connectPgSimple from "connect-pg-simple";
import session from "express-session";
import { Authroutes } from "./routes /authroutes.js";
import cookieParser from "cookie-parser";
const app = express(); 
const port = 3000; 


app.use(express.json()) 
app.use(express.urlencoded({ extended: true })) 
app.use(express.static("public")) 
app.use(cookieParser())


// app.use(cors( 
//     { 
//         origin : ["http://localhost:5173"] , 
//         credentials : true , 
//         methods : ["GET" , "POST" , "PUT" , "DELETE"] , 
//         allowedHeaders : ["Content-Type" , "Authorization"], 
        
//     }
// ))

const pgSession = connectPgSimple(session); 

app.use(session({
      store : new pgSession({ 
        pool : Database , 
        tableName : "session",  
        createTableIfMissing : true 

      }) , 
      name : "sessionId" ,
      secret : process.env.SESSION_SECRET , 
      resave : false , 
      saveUninitialized : false , 
      cookie : {  
 
        maxAge : 1000 * 60 * 60 * 24 * 1, // 1 Day  
        secure : process.env.NODE_ENV === "production" , 
        httpOnly : true, 
        sameSite : "none"  
      }
     

} ))

app.get("/" , (req , res)=>{
    res.send("Hello World")
})

app.get("/api/ping" , (req , res)=>{
    res.send("pong") 
})

app.use(Authroutes);

app.listen(port , ()=>{ 
    console.log("The server is running at port " , port)
}); 
