//clientes 
const socketClient = io()

const form = document.getElementById('formulario')
const InputNombre = document.getElementById('nombre')
const InputDesc = document.getElementById('descripcion')
const InputPrecio = document.getElementById('precio')
const InputStock = document.getElementById('stock')
const InputCategory = document.getElementById('category')
const containerProducts = document.getElementById('containerList')

form.onsubmit = (e)=>{
    e.preventDefault()
    const prod = {
        nombre: InputNombre.value,
        desc:InputDesc.value,
        precio:InputPrecio.value,
        stock: InputStock.value,
        category:InputCategory.value
    }
    
    socketClient.emit('newProduct',prod)
}

socketClient.on('products',(products)=>{
    let productsContainer = ''
    products.forEach((p)=>{
        productsContainer += `Se agregó el producto ${p.nombre}, perteneciente a la categoria ${p.category}. <br>`
    })
    containerProducts.innerHTML += productsContainer
})