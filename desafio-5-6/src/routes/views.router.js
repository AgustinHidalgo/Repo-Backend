import { Router } from "express";

const viewsRouter = Router()

viewsRouter.get('/', async (req,res)=>{
    res.render('login')
});

viewsRouter.get('/session', (req,res)=>{
    res.render('session')
})

export default viewsRouter