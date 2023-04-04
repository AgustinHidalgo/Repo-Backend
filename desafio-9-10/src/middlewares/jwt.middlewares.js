import jwt from "jsonwebtoken";

export function validateToken(req,res,next){
   /*  const authHeader = req.get('Authorization')
    const token = authHeader.split(' ')[1] */
    const token = req.cookies.token
    const verifiedUser = jwt.verify(token,'secretToken')
    if(verifiedUser){
        req.user = verifiedUser.user
        next()
    }else{
        res.json({message: 'Authentication Error'})
    }
} 