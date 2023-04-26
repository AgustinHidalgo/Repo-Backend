import mongoose from "mongoose";

export const productsSchema = new mongoose.Schema({
    name:{
        type: 'string',
        required: true
    },
    price:{
        type:'number',
        required: true
    }

})