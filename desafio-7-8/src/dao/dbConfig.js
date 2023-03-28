import mongoose from "mongoose";

const MONGO_URI ='mongodb+srv://bachicha:bachicha@cluster0.ummjcbo.mongodb.net/ecommerce?retryWrites=true&w=majority'

mongoose.connect(MONGO_URI, (error)=>{
    if(!error){
        console.log('SUCCESFULL CONNECTION')
    }else{
        console.log('Error al conectar la base de datos')
    }
})