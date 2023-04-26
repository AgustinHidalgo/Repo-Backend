import {save,getAll}  from '../persistance/persistance.js'


export async function saveProductService(product){
    const producto = await save(product)
    return producto
}

export async function getAllService(){
    const productos = await getAll()
    return productos
}