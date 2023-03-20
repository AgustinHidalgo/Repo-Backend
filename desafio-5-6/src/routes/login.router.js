import { Router } from "express";

const loginRouter = Router()


loginRouter.post('/',(req,res)=>{
    const {nombre,email} = req.body
    res.cookie(nombre,email,{maxAge:10000}).send('cookie nombre/email creada correctamente')
})


export default loginRouter