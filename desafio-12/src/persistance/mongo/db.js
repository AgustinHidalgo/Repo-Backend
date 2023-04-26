import mongoose from "mongoose";
import config from '../../config.js'

try {
    mongoose.connect(config.MONGO_URL)
    console.log('Conectado a mongo correctamente')
} catch (error) {
    console.log('error al conectar con mongo', error)
}