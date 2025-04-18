import express from "express"   
import { LoginUser, logout, RegisterUser } from "../controllers/Authcontroller.js"
import { preventAuthenticatedAccess, preventlogout } from "../middlewares/Authmiddleware.js";

const router = express()  


router.post("/api/auth/register" ,preventAuthenticatedAccess ,  RegisterUser);  
router.post("/api/auth/login" , preventAuthenticatedAccess , LoginUser); 
router.post("/api/auth/logout" , preventlogout , logout);

export const Authroutes = router  