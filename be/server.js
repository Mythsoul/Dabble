import express from "express" 
import { Database } from "./config/db/db.js";
import cors from "cors"; 
import connectPgSimple from "connect-pg-simple";
import session from "express-session";
import { Authroutes } from "./routes /authroutes.js";
import { PostRoutes } from "./routes /postRoutes.js";
import cookieParser from "cookie-parser";
import { setupPassport } from './config/passport/passport.js';
import passport from "passport";

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

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await Database.query("SELECT * FROM users WHERE id = $1", [id]);
        done(null, user.rows[0]);
    } catch (error) {
        done(error, null);
    }
});


setupPassport(app);

app.get("/" , (req , res)=>{
    res.send("Hello World")
})

app.get("/api/ping" , (req , res)=>{
    res.send("pong") 
})

app.use(Authroutes);
app.use(PostRoutes);

app.listen(port , ()=>{ 
    console.log("The server is running at port " , port)
});
