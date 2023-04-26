import express from 'express'
import config from './config.js'
import ProductsRouter from './routes/products.router.js'


const app = express()
app.use(express.json())

app.use('/api', ProductsRouter)




const PORT = config.PORT;
app.listen(PORT, ()=>{
    console.log(`Escuchando al puerto ${PORT}`)
})