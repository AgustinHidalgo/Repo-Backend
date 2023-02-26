import express from "express"
import {__dirname} from './utils.js'
import handlebars from 'express-handlebars'
import {Server} from 'socket.io'
import ProductManager from "./ProductManager.js"

const productManager = new ProductManager('/products.json')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

// estatics
app.use(express.static(__dirname+'/public'))

//motores de plantillas
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views',__dirname+'/views')

//ruta raiz
app.get('/',(req,res)=>{
    res.render('home')
})
app.get('/realtimeproducts', (req,res)=>{
    res.render('realTimeProducts')
})

const httpServer = app.listen(8080,()=>{
    console.log('escuchando el puerto 8080')
})

export const socketServer = new Server(httpServer)
    
socketServer.on("connection",(socket)=>{
    const products = productManager.getProducts()
    console.log('Usuario conectado', socket.id)
    socket.emit('products',products)
    
    socket.on('newProduct',(prod)=>{
        const {nombre,desc,precio,stock,category} = {...prod}
        productManager.createProduct(nombre,desc,precio,stock,category)
        socket.emit('productAdded',{prod})
    })
})