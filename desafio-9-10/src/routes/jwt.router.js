import { Router } from "express";
import { generateToken } from "../utils.js";
import UsersManager from "../dao/mongoManagers/usersManager.js";
import { validateToken } from "../middlewares/jwt.middleware.js";
import passport from "passport";

const jwtRouter = Router();
const usersManager = new UsersManager();

//sin cookies
/* jwtRouter.post('/login',async( req,res)=>{
    const user = await usersManager.loginUser(req.body);
    if(user){
        const token = generateToken(user)
        return res.json({token})
    }else{
        res.json({message:'Error'})
    }  
})
jwtRouter.get('/login',validateToken,(req,res)=>{
    console.log('token validado')
    res.send('funciona')
}) */

//con cookies
jwtRouter.post("/login", async (req, res) => {
  const user = await usersManager.loginUser(req.body);
  if (user) {
    const token = generateToken(user);
    return res.cookie('token',token, {httpOnly:true}).json({token}) 
  } else {
    res.json({ message: "Error" });
  }
});

jwtRouter.get('/login',validateToken,(req,res)=>{
    console.log('token validado')
    res.send('funciona')
}) 

//passport
jwtRouter.get('/loginpassport', passport.authenticate('jwt', {session:false}), (req,res)=>{
    res.send('passport jwt')
})

export default jwtRouter;
