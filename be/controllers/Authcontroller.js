import { CreateUser, JwtGenerator, Login } from "../models/authmodel.js";
import dotenv from "dotenv" 
dotenv.config(); 

export const RegisterUser = async (req , res) => { 
    try { 
        const {email , password , username } = req.body ; 
        const user = await CreateUser(username , email , password);
          if( !user ) { 
           throw new Error("Error while Registring User"); 
          } 
          req.session.user = user; 
          const token = JwtGenerator(user);
          res.cookie("token"  , token , { 
              httpOnly : true , 
              maxAge : 60 * 60 * 1000  ,// 1 hour 
              samesite : "none" , 
              secure : process.env.NODE_ENV === "production" , 
  
  
          })
          res.status(200).json({
            success : true ,
           message : "user registered successfully"  , 
           user : user
          });

        } catch(err){ 
            throw new Error(err); 
        }}

export const LoginUser  = async (req , res)=> {  
    try { 
        const {email , password } = req.body ;  
        if (!email || !password) {
             throw new Error("All fields are required"); 
        }
        const user = await Login(email  , password ) 
        if(!user) { 
            throw new Error("User does not exist"); 
        }
        req.session.user = user; 
        const token = JwtGenerator(user);
        res.cookie("token"  , token , { 
            httpOnly : true , 
            maxAge : 60 * 60 * 1000  ,// 1 hour 
            samesite : "none" , 
            secure : process.env.NODE_ENV === "production" , 


        })
    
        res.status(200).json({
            success : true ,
           message : "user logged in successfully"  , 
           user : user
          });
    } catch (error) { 
        throw new Error(error); 

    }
}

export const logout = async (req , res) => { 
    try {
        req.session.destroy(err => {
            if(err) {
                throw new Error(err); 
            }
        }); 
        
        res.clearCookie("token");
        res.clearCookie("sessionId");

        res.status(200).json({
            success : true ,
           message : "user logged out successfully"
          });
    } catch (error) {
        throw new Error(error);
    } 
    }

    