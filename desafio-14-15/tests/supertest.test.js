import supertest from "supertest";
import { expect } from "chai";

const request = supertest("http://localhost:8080");

const cartId = "6463d7c5ea19cd10ef2a3750";

describe("Rutas de carritos", function () {
  it("Testear metodo POST /carts", async function () {
    const response = await request.post("/carts").send();
    expect(response._body.newCart).to.have.property("_id");
  });
  it("Testear metodo GET by id /carts", async function () {
    const response = await request.get("/carts/:cid").send(cartId);
    expect(response).to.be.ok;
  });
  it("Testear metodo DELETE /carts", async function () {
    const response = await request.delete("/carts/:cid").send(cartId);
    expect(response._body).to.have.property("deleteById");
  });
});

const productMock = {
  title: "Leche de almendras",
  description: "100% natural",
  code: "abcde123",
  price: 320,
  status: true,
  stock: 132,
  category: "Lacteos",
};

const productId = "644d5a22034f512691ba1c43";

describe("Rutas de productos ", function () {
  it("Testear metodo GET by id /products", async function () {
    const response = await request.get("/products").send(productId);
    expect(response.statusCode).to.be.equal(200);
  });
  it("Testear metodo GET All /products", async function () {
    const response = await request.get("/products");
    expect(response.statusCode).to.be.equal(200)
  });
});

const UserMock = {
  fullname: "Neymar Da Silva Santos Junior",
  firstName: "Neymar",
  lastName: "Da Silva Santos Junior",
  email: "neymar@gmail.com",
  age: 31,
  password: "neymar",
  role: "Admin",
  isAdmin: false,
};

const userId = "647745aa40b9878db5972234";

describe("Rutas de usuarios", function () {
  it("Testear metodo POST /users", async function () {
    const response = await request.post("/users/registro").send(UserMock);
    expect(response).to.be.ok;
    expect(response._body).to.have.property("newUser");
  });
  it("Testear metodo GET by id /users", async function () {
    const response = await request.get("/users/:uid").send(userId);
    expect(response).to.be.ok;
  });
  it("Testear metodo DELETE by id /users", async function () {
    const response = await request.delete("/users/:uid").send(userId);
    expect(response._body).to.have.property("deleteById");
  });
});