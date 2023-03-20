import { Router } from "express";

const sessionRouter = Router()


sessionRouter.post('/',(req,res)=>{
    const {usuario,contrasenia} = req.body
    req.session['usuario'] = usuario
    req.session['contrasenia'] = contrasenia
    res.send('creando session')
})


export default sessionRouter