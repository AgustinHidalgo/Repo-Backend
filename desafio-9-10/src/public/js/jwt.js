const formJwt = document.getElementById("formJwt");
const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");
const btn = document.getElementById("boton");

formJwt.onsubmit = (e) => {
  e.preventDefault();
  //hacemos un fetch
  fetch("http://localhost:8080/jwt/login", {
    method: "POST",
    body: JSON.stringify({
      email: inputEmail.value,
      password: inputPassword.value,
    }),
    headers: {
      "Content-type": "application/json", 
    },
  })
    .then((response) => response.json())
    .then(
      (response) => console.log("all good"),
      console.log(document.cookie)
      /* localStorage.setItem('token', response.token) */
    );
};

/* btn.onclick = () => {
  fetch('http://localhost:8080/jwt/login', {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'Authorization' : `Bearer ${localStorage.getItem('token')}`,
    },
  });
}; */

//recuperar info de cookies
btn.onclick = () => {
  fetch("http://localhost:8080/jwt/login", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
};