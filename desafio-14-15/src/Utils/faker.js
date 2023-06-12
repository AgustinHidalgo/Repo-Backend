import {faker}from '@faker-js/faker'

export const generateProducts = () =>{
    const products = {
        id:faker.database.mongodbObjectId() ,
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        code: faker.random.numeric(),
        price: faker.commerce.price(),
        status: true,
        stock: faker.random.numeric(),
        category: faker.commerce.department(),
    }
    return products
}